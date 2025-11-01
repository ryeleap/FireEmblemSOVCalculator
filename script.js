document.addEventListener("DOMContentLoaded", () => {

    // === DOM ELEMENTS ===
    const attackerImg = document.querySelector(".attacker-img");
    const defenderImg = document.querySelector(".defender-img");
    const attackerCharSelect = document.getElementById("attacker-select");
    const defenderCharSelect = document.getElementById("defender-select");
    const attackerClassSelect = document.getElementById("attacker-class-select");
    const defenderClassSelect = document.getElementById("defender-class-select");
    const attackerAttackSelect = document.getElementById("attacker-attack-select");
    const defenderAttackSelect = document.getElementById("defender-attack-select");
    const attackerItemSelect = document.getElementById("attacker-item-select");
    const defenderItemSelect = document.getElementById("defender-item-select");
    const attackerTerrainSelect = document.getElementById("attacker-terrain-select");
    const defenderTerrainSelect = document.getElementById("defender-terrain-select");

    // ============================================================
    // === CLASS & ITEM LOGIC =====================================
    // ============================================================

    function getAvailableClasses(startingClass, gender) {
        const available = new Set();
        const queue = [startingClass];
        while (queue.length) {
            const current = queue.pop();
            if (!current || available.has(current)) continue;
            available.add(current);
            for (const [cls, data] of Object.entries(classes)) {
                if (data.promotesFrom === current &&
                    (!data.gender || data.gender === "Both" || data.gender === gender)) {
                    queue.push(cls);
                }
            }
        }
        return [...available];
    }

    function getClassLineage(className, baseClassLimit = null) {
        const lineage = [];
        let current = className;

        while (current) {
            lineage.push(current);
            const next = classes[current]?.promotesFrom;

            // stop once we hit the character's starting class (base)
            if (next === baseClassLimit || !next) break;

            current = next;
        }

        return lineage;
    }


    function getEquippableItems(className) {
        const classData = classes[className];
        if (!classData) return [];
        const allowedTypes = classData.weapon.split(",").map(w => w.trim());
        const usableWeapons = weapons.filter(w => allowedTypes.includes(w.type));
        return [...none, ...usableWeapons, ...shields, ...rings];
    }

    // ============================================================
    // === SKILLS & ATTACKS =======================================
    // ============================================================

    function getAllSkills(className, equippedItemName = null) {
        const lineage = getClassLineage(className).reverse();
        const allSkills = [];

        // Class-based skills
        for (const cls of lineage) {
            const data = classes[cls];
            if (data?.skills?.length) allSkills.push(...data.skills);
        }

        // Equipped item skills
        const equipped = [...weapons, ...shields, ...rings, ...none].find(i => i.name === equippedItemName);
        if (equipped?.skills?.length) allSkills.push(...equipped.skills);

        return [...new Set(allSkills)];
    }

    function formatSkillList(skills) {
        if (!skills?.length) return "None";

        // Render with tooltip showing passive effect text
        return skills.map(skill => {
            const passive = passiveSkills[skill];
            const desc = passive ? passive.effect : "";
            return `<span title="${desc}">${skill}</span>`;
        }).join(", ");
    }

    function updateSkillsDisplay(className, containerEl, equippedItemName = null) {
        const skills = getAllSkills(className, equippedItemName);
        containerEl.innerHTML = formatSkillList(skills);
    }

    function updateAttackOptions(character, className, selectEl, equippedItemName = null) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Attack", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        let attackList = [];

        // Class spells
        const lineage = getClassLineage(className);
        for (const cls of lineage.reverse()) {
            if (character.spells?.[cls]) attackList.push(...character.spells[cls]);
        }

        // Combat arts from weapon/item
        const equipped = [...weapons, ...shields, ...rings, ...none].find(i => i.name === equippedItemName);
        if (equipped?.skills?.length) {
            attackList.push(...equipped.skills);
        }

        // Basic Attack for physical weapon users
        const classData = classes[className];
        if (classData) {
            const weaponTypes = classData.weapon.split(",").map(w => w.trim());
            const usesPhysical = weaponTypes.some(t => ["Sword", "Lance", "Bow"].includes(t));
            if (usesPhysical) attackList.push("Basic Attack");
        }

        // Remove duplicates
        attackList = [...new Set(attackList)];

        // ✅ Move "Basic Attack" to the front if it exists
        if (attackList.includes("Basic Attack")) {
            attackList = ["Basic Attack", ...attackList.filter(a => a !== "Basic Attack")];
        }

        // Populate dropdown
        attackList.forEach(a => selectEl.add(new Option(a, a)));

        // ✅ Auto-select "Basic Attack" if it exists, else first option
        if (attackList.includes("Basic Attack")) {
            selectEl.value = "Basic Attack";
        } else if (attackList.length) {
            selectEl.value = attackList[0];
        }
    }


    // ============================================================
    // === UI HELPERS =============================================
    // ============================================================

    function updateClassOptions(character, selectEl) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Class", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        const options = getAvailableClasses(character.startingClass, character.gender);
        options.forEach(cls => selectEl.add(new Option(cls, cls)));
        selectEl.value = character.startingClass;
    }

    function updateClassLineageDisplay(className, containerEl) {
        if (!className) {
            containerEl.textContent = "None";
            return;
        }

        const lineage = getClassLineage(className);
        if (!lineage.length) {
            containerEl.textContent = "None";
            return;
        }

        // Reverse it so the base class shows first, like Villager → ... → Dread Fighter
        const lineageDisplay = lineage.reverse().join(" → ");
        containerEl.textContent = lineageDisplay;
    }


    function updateItemOptions(className, selectEl) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Item", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        const equippable = getEquippableItems(className);
        equippable.forEach(item => selectEl.add(new Option(item.name, item.name)));
        if (equippable.some(i => i.name === "Leather Shield")) selectEl.value = "Leather Shield";
    }

    // ============================================================
    // === STAT HANDLING ==========================================
    // ============================================================

    function getStats(container) {
        const stats = {};
        container.querySelectorAll(".stat-row").forEach(row => {
            const label = row.querySelector("label").textContent.trim();
            const value = parseInt(row.querySelector("input").value, 10);
            stats[label] = value;
        });
        return stats;
    }

    // ============================================================
    // === BUTTON TOGGLES =========================================
    // ============================================================

    const toggleButton = (btn, color) => {
        const active = color === "red" ? "active-red" : "active-blue";
        btn.classList.toggle(active);
    };

    document.getElementById("attacker-crit-button").addEventListener("click", e => toggleButton(e.target, "blue"));
    document.getElementById("attacker-crit2-button").addEventListener("click", e => toggleButton(e.target, "blue"));
    document.getElementById("attacker-warded-button").addEventListener("click", e => toggleButton(e.target, "blue"));
    document.getElementById("defender-crit-button").addEventListener("click", e => toggleButton(e.target, "red"));
    document.getElementById("defender-crit2-button").addEventListener("click", e => toggleButton(e.target, "red"));
    document.getElementById("defender-warded-button").addEventListener("click", e => toggleButton(e.target, "red"));

    // ============================================================
    // === CHARACTER + CLASS EVENTS ===============================
    // ============================================================

    function handleCharacterSelect(isAttacker) {
        const charSelect = isAttacker ? attackerCharSelect : defenderCharSelect;
        const classSelect = isAttacker ? attackerClassSelect : defenderClassSelect;
        const itemSelect = isAttacker ? attackerItemSelect : defenderItemSelect;
        const attackSelect = isAttacker ? attackerAttackSelect : defenderAttackSelect;
        const img = isAttacker ? attackerImg : defenderImg;
        const skillBox = document.getElementById(isAttacker ? "attacker-skills" : "defender-skills");

        const chosen = characters.find(c => c.name === charSelect.value);
        if (!chosen) return;

        img.src = chosen.img;
        updateClassOptions(chosen, classSelect);
        updateItemOptions(chosen.startingClass, itemSelect);
        updateAttackOptions(chosen, chosen.startingClass, attackSelect);
        updateSkillsDisplay(chosen.startingClass, skillBox, itemSelect.value);
    }

    function handleClassChange(isAttacker) {
        const charSelect = isAttacker ? attackerCharSelect : defenderCharSelect;
        const classSelect = isAttacker ? attackerClassSelect : defenderClassSelect;
        const itemSelect = isAttacker ? attackerItemSelect : defenderItemSelect;
        const attackSelect = isAttacker ? attackerAttackSelect : defenderAttackSelect;
        const skillBox = document.getElementById(isAttacker ? "attacker-skills" : "defender-skills");
        const lineageBox = document.getElementById(isAttacker ? "attacker-class-lineage" : "defender-class-lineage");

        const char = characters.find(c => c.name === charSelect.value);
        if (!char) return;

        const currentClass = classSelect.value;

        updateItemOptions(currentClass, itemSelect);
        updateAttackOptions(char, currentClass, attackSelect, itemSelect.value);
        updateSkillsDisplay(currentClass, skillBox, itemSelect.value);

        // ✅ Update the "Previous Classes" box
        updateClassLineageDisplay(currentClass, lineageBox);
    }


    attackerCharSelect.addEventListener("change", () => handleCharacterSelect(true));
    defenderCharSelect.addEventListener("change", () => handleCharacterSelect(false));
    attackerClassSelect.addEventListener("change", () => handleClassChange(true));
    defenderClassSelect.addEventListener("change", () => handleClassChange(false));

    attackerClassSelect.addEventListener("change", () => handleClassChange(true));
    defenderClassSelect.addEventListener("change", () => handleClassChange(false));


    // === ITEM CHANGE HANDLERS ===
    attackerItemSelect.addEventListener("change", () => {
        const char = characters.find(c => c.name === attackerCharSelect.value);
        const cls = attackerClassSelect.value;
        const itemName = attackerItemSelect.value;
        if (!char || !cls) return;

        // Clear and rebuild attacks based on the newly equipped item
        updateAttackOptions(char, cls, attackerAttackSelect, itemName);

        // Force reset dropdown to the first attack (if any)
        if (attackerAttackSelect.options.length > 1) {
            attackerAttackSelect.selectedIndex = 1;
        }

        // Refresh merged skills (class + item)
        updateSkillsDisplay(cls, document.getElementById("attacker-skills"), itemName);
    });

    defenderItemSelect.addEventListener("change", () => {
        const char = characters.find(c => c.name === defenderCharSelect.value);
        const cls = defenderClassSelect.value;
        const itemName = defenderItemSelect.value;
        if (!char || !cls) return;

        updateAttackOptions(char, cls, defenderAttackSelect, itemName);

        if (defenderAttackSelect.options.length > 1) {
            defenderAttackSelect.selectedIndex = 1;
        }

        updateSkillsDisplay(cls, document.getElementById("defender-skills"), itemName);
    });



    // ============================================================
    // === POPULATE INITIAL DATA ==================================
    // ============================================================

    const allChars = [...characters];
    const allItems = [...none, ...weapons, ...shields, ...rings];
    const allTerrains = terrainProperties.flatMap(t => t.terrains);
    const allClasses = Object.keys(classes);

    function resetSelect(select, placeholder) {
        select.innerHTML = "";
        const opt = new Option(placeholder, "", true, true);
        opt.disabled = true;
        select.add(opt);
    }

    [
        [attackerCharSelect, "Select Unit"],
        [defenderCharSelect, "Select Unit"],
        [attackerClassSelect, "Select Class"],
        [defenderClassSelect, "Select Class"],
        [attackerItemSelect, "Select Item"],
        [defenderItemSelect, "Select Item"],
        [attackerTerrainSelect, "Select Terrain"],
        [defenderTerrainSelect, "Select Terrain"]
    ].forEach(([el, text]) => resetSelect(el, text));

    allChars.forEach(c => {
        attackerCharSelect.add(new Option(c.name, c.name));
        defenderCharSelect.add(new Option(c.name, c.name));
    });
    allClasses.forEach(c => {
        attackerClassSelect.add(new Option(c, c));
        defenderClassSelect.add(new Option(c, c));
    });
    allItems.forEach(i => {
        attackerItemSelect.add(new Option(i.name, i.name));
        defenderItemSelect.add(new Option(i.name, i.name));
    });
    allTerrains.forEach(t => {
        attackerTerrainSelect.add(new Option(t, t));
        defenderTerrainSelect.add(new Option(t, t));
    });

    // ============================================================
    // === DEFAULTS ===============================================
    // ============================================================

    const defaultAttacker = "Mae";
    const defaultDefender = "Boey";
    const attackerChar = characters.find(c => c.name === defaultAttacker);
    const defenderChar = characters.find(c => c.name === defaultDefender);
    const atkClass = attackerChar?.startingClass || "";
    const defClass = defenderChar?.startingClass || "";
    const defaultItem = "Leather Shield";
    const defaultTerrain = "Hills";

    updateClassOptions(attackerChar, attackerClassSelect);
    updateClassOptions(defenderChar, defenderClassSelect);
    updateItemOptions(atkClass, attackerItemSelect);
    updateItemOptions(defClass, defenderItemSelect);
    updateAttackOptions(attackerChar, atkClass, attackerAttackSelect);
    updateAttackOptions(defenderChar, defClass, defenderAttackSelect);
    updateSkillsDisplay(atkClass, document.getElementById("attacker-skills"), defaultItem);
    updateSkillsDisplay(defClass, document.getElementById("defender-skills"), defaultItem);

    attackerCharSelect.value = defaultAttacker;
    defenderCharSelect.value = defaultDefender;
    attackerClassSelect.value = atkClass;
    defenderClassSelect.value = defClass;
    attackerItemSelect.value = defaultItem;
    defenderItemSelect.value = defaultItem;
    attackerTerrainSelect.value = defaultTerrain;
    defenderTerrainSelect.value = defaultTerrain;

    attackerImg.src = attackerChar.img;
    defenderImg.src = defenderChar.img;

    console.log(`Loaded: ${allChars.length} characters, ${allItems.length} items.`);
});
