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

    const attackerStatsDiv = document.querySelector(".attacker .stats");
    const defenderStatsDiv = document.querySelector(".defender .stats");

    const attackerTerrainSelect = document.getElementById("attacker-terrain-select");
    const defenderTerrainSelect = document.getElementById("defender-terrain-select");


    // === CLASS + ITEM FILTERS ===
    function getAvailableClasses(startingClass, gender) {
        const available = new Set();
        const toCheck = [startingClass];

        while (toCheck.length) {
            const current = toCheck.pop();
            if (!current || available.has(current)) continue;
            available.add(current);

            for (const [className, data] of Object.entries(classes)) {
                if (data.promotesFrom === current) {
                    if (!data.gender || data.gender === "Both" || data.gender === gender) {
                        toCheck.push(className);
                    }
                }
            }
        }
        return Array.from(available);
    }

    function updateClassOptions(character, selectEl) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Class", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        const options = getAvailableClasses(character.startingClass, character.gender);
        options.forEach(cls => selectEl.add(new Option(cls, cls)));
        selectEl.value = character.startingClass;
    }

    function getClassLineage(className) {
        const lineage = [];
        let current = className;
        while (current) {
            lineage.push(current);
            current = classes[current]?.promotesFrom;
        }
        return lineage;
    }

    function getEquippableItems(className) {
        const classData = classes[className];
        if (!classData) return [];

        const allowedWeapons = classData.weapon.split(",").map(w => w.trim());
        const usableWeapons = weapons.filter(w => allowedWeapons.includes(w.type));

        return [...usableWeapons, ...shields, ...rings];
    }

    function updateItemOptions(className, selectEl) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Item", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        const equippable = getEquippableItems(className);
        equippable.forEach(item => selectEl.add(new Option(item.name, item.name)));

        if (equippable.some(i => i.name === "Leather Shield")) {
            selectEl.value = "Leather Shield";
        }
    }


    // === STATS TRACKING ===
    function getStats(container) {
        const inputs = container.querySelectorAll(".inputStat");
        const labels = container.querySelectorAll(".stat-row label");
        const stats = {};

        inputs.forEach((input, i) => {
            const statName = labels[i].textContent.trim();
            stats[statName] = parseInt(input.value, 10);
        });
        return stats;
    }

    attackerStatsDiv.addEventListener("input", () => {
        console.log("Attacker stats changed:", getStats(attackerStatsDiv));
    });

    defenderStatsDiv.addEventListener("input", () => {
        console.log("Defender stats changed:", getStats(defenderStatsDiv));
    });


    // === ATTACK (SPELL) SYSTEM ===
    function updateAttackOptions(character, className, selectEl) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Attack", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        let spells = [];
        const lineage = getClassLineage(className);

        for (const cls of lineage.reverse()) {
            if (character.spells?.[cls]) {
                spells.push(...character.spells[cls]);
            }
        }

        if (spells.length === 0) {
            console.warn(`${character.name} has no spells for ${className} or its ancestors`);
        } else {
            spells.forEach(spell => selectEl.add(new Option(spell, spell)));
            selectEl.value = spells[0];
        }
    }




    // === UI TOGGLES ===
    const toggleButton = (button, color) => {
        const activeClass = color === "red" ? "active-red" : "active-blue";
        button.classList.toggle(activeClass);
    };

    document.getElementById("attacker-crit-button").addEventListener("click", e => toggleButton(e.target, "blue"));
    document.getElementById("attacker-crit2-button").addEventListener("click", e => toggleButton(e.target, "blue"));
    document.getElementById("attacker-warded-button").addEventListener("click", e => toggleButton(e.target, "blue"));
    document.getElementById("defender-crit-button").addEventListener("click", e => toggleButton(e.target, "red"));
    document.getElementById("defender-crit2-button").addEventListener("click", e => toggleButton(e.target, "red"));
    document.getElementById("defender-warded-button").addEventListener("click", e => toggleButton(e.target, "red"));


    // === CHARACTER SELECTION ===
    attackerCharSelect.addEventListener("change", () => {
        const chosen = characters.find(c => c.name === attackerCharSelect.value);
        if (!chosen) return;

        attackerImg.src = chosen.img;
        updateClassOptions(chosen, attackerClassSelect);
        updateItemOptions(chosen.startingClass, attackerItemSelect);
        updateAttackOptions(chosen, chosen.startingClass, attackerAttackSelect);
    });

    defenderCharSelect.addEventListener("change", () => {
        const chosen = characters.find(c => c.name === defenderCharSelect.value);
        if (!chosen) return;

        defenderImg.src = chosen.img;
        updateClassOptions(chosen, defenderClassSelect);
        updateItemOptions(chosen.startingClass, defenderItemSelect);
        updateAttackOptions(chosen, chosen.startingClass, defenderAttackSelect);
    });


    // === CLASS SELECTION ===
    attackerClassSelect.addEventListener("change", () => {
        const char = characters.find(c => c.name === attackerCharSelect.value);
        const chosenClass = attackerClassSelect.value;
        if (!char) return;

        updateItemOptions(chosenClass, attackerItemSelect);
        updateAttackOptions(char, chosenClass, attackerAttackSelect);
    });

    defenderClassSelect.addEventListener("change", () => {
        const char = characters.find(c => c.name === defenderCharSelect.value);
        const chosenClass = defenderClassSelect.value;
        if (!char) return;

        updateItemOptions(chosenClass, defenderItemSelect);
        updateAttackOptions(char, chosenClass, defenderAttackSelect);
    });


    // === DATA POPULATION ===
    const allChars = [...characters];
    const allItems = [...weapons, ...shields, ...rings];
    const allTerrains = terrainProperties.flatMap(t => t.terrains);
    const allClasses = Object.keys(classes);

    function resetSelect(select, placeholderText) {
        select.innerHTML = "";
        const option = new Option(placeholderText, "", true, true);
        option.disabled = true;
        select.add(option);
    }

    resetSelect(attackerCharSelect, "Select Unit");
    resetSelect(defenderCharSelect, "Select Unit");
    resetSelect(attackerClassSelect, "Select Class");
    resetSelect(defenderClassSelect, "Select Class");
    resetSelect(attackerItemSelect, "Select Item");
    resetSelect(defenderItemSelect, "Select Item");
    resetSelect(attackerTerrainSelect, "Select Terrain");
    resetSelect(defenderTerrainSelect, "Select Terrain");

    [attackerCharSelect, defenderCharSelect, attackerItemSelect, defenderItemSelect]
        .forEach(sel => sel.options[0].disabled = true);

    allChars.forEach(char => {
        attackerCharSelect.add(new Option(char.name, char.name));
        defenderCharSelect.add(new Option(char.name, char.name));
    });

    allClasses.forEach(cls => {
        attackerClassSelect.add(new Option(cls, cls));
        defenderClassSelect.add(new Option(cls, cls));
    });

    allItems.forEach(item => {
        attackerItemSelect.add(new Option(item.name, item.name));
        defenderItemSelect.add(new Option(item.name, item.name));
    });

    allTerrains.forEach(name => {
        attackerTerrainSelect.add(new Option(name, name));
        defenderTerrainSelect.add(new Option(name, name));
    });


    // === DEFAULT VALUES ===
    const defaultAttacker = "Mae";
    const defaultDefender = "Boey";
    const attackerChar = characters.find(c => c.name === defaultAttacker);
    const defenderChar = characters.find(c => c.name === defaultDefender);

    const defaultAttackerClass = attackerChar?.startingClass || null;
    const defaultDefenderClass = defenderChar?.startingClass || null;

    updateClassOptions(attackerChar, attackerClassSelect);
    updateClassOptions(defenderChar, defenderClassSelect);
    updateItemOptions(defaultAttackerClass, attackerItemSelect);
    updateItemOptions(defaultDefenderClass, defenderItemSelect);
    updateAttackOptions(attackerChar, defaultAttackerClass, attackerAttackSelect);
    updateAttackOptions(defenderChar, defaultDefenderClass, defenderAttackSelect);

    const defaultAttackerItem = "Leather Shield";
    const defaultDefenderItem = "Leather Shield";
    const defaultTerrain = "Hills";

    attackerCharSelect.value = defaultAttacker;
    defenderCharSelect.value = defaultDefender;
    attackerClassSelect.value = defaultAttackerClass;
    defenderClassSelect.value = defaultDefenderClass;
    attackerItemSelect.value = defaultAttackerItem;
    defenderItemSelect.value = defaultDefenderItem;
    attackerTerrainSelect.value = defaultTerrain;
    defenderTerrainSelect.value = defaultTerrain;

    if (attackerChar) attackerImg.src = `media/portraits/${attackerChar.name}.png`;
    if (defenderChar) defenderImg.src = `media/portraits/${defenderChar.name}.png`;

    console.log("Characters:", allChars.length, "| Items:", allItems.length);
});
