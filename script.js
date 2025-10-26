document.addEventListener("DOMContentLoaded", () => {

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

    function getEquippableItems(className) {
        const classData = classes[className];
        if (!classData) return [];

        const allowedWeapons = classData.weapon
            .split(",")
            .map(w => w.trim());

        const usableWeapons = weapons.filter(w => allowedWeapons.includes(w.type));

        return [...usableWeapons, ...shields, ...rings];
    }


    function updateItemOptions(className, selectEl) {
        selectEl.innerHTML = "";
        const placeholder = new Option("Select Item", "", true, true);
        placeholder.disabled = true;
        selectEl.add(placeholder);

        const equippable = getEquippableItems(className);
        equippable.forEach(item => {
            selectEl.add(new Option(item.name, item.name));
        });

        if (equippable.some(i => i.name === "Leather Shield")) {
            selectEl.value = "Leather Shield";
        }
    }

    const attackerImg = document.querySelector(".attacker-img");
    const defenderImg = document.querySelector(".defender-img");
    const attackerCharSelect = document.getElementById("attacker-select");
    const defenderCharSelect = document.getElementById("defender-select");
    const attackerClassSelect = document.getElementById("attacker-class-select");
    const defenderClassSelect = document.getElementById("defender-class-select");
    const attackerItemSelect = document.getElementById("attacker-item-select");
    const defenderItemSelect = document.getElementById("defender-item-select");

    const attackerTerrainSelect = document.getElementById("attacker-terrain-select");
    const defenderTerrainSelect = document.getElementById("defender-terrain-select");

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

    attackerCharSelect.addEventListener("change", () => {
        const chosen = characters.find(c => c.name === attackerCharSelect.value);
        if (!chosen) return;

        attackerImg.src = chosen.img;
        updateClassOptions(chosen, attackerClassSelect);
        updateItemOptions(chosen.startingClass, attackerItemSelect);
    });

    defenderCharSelect.addEventListener("change", () => {
        const chosen = characters.find(c => c.name === defenderCharSelect.value);
        if (!chosen) return;

        defenderImg.src = chosen.img;
        updateClassOptions(chosen, defenderClassSelect);
        updateItemOptions(chosen.startingClass, defenderItemSelect);
    });

    attackerClassSelect.addEventListener("change", () => {
        const chosenClass = attackerClassSelect.value;
        if (chosenClass) updateItemOptions(chosenClass, attackerItemSelect);
    });

    defenderClassSelect.addEventListener("change", () => {
        const chosenClass = defenderClassSelect.value;
        if (chosenClass) updateItemOptions(chosenClass, defenderItemSelect);
    });

    const allChars = [...characters];
    const allItems = [...weapons, ...shields, ...rings];
    const allTerrains = terrainProperties.flatMap(t => t.terrains);
    const allClasses = Object.keys(classes);

    attackerCharSelect.innerHTML = "";
    defenderCharSelect.innerHTML = "";
    attackerClassSelect.innerHTML = "";
    defenderClassSelect.innerHTML = "";
    attackerItemSelect.innerHTML = "";
    defenderItemSelect.innerHTML = "";

    attackerTerrainSelect.innerHTML = "";
    defenderTerrainSelect.innerHTML = "";

    const placeholder = (text) => new Option(text, "", true, true);
    attackerCharSelect.add(placeholder("Select Unit"));
    defenderCharSelect.add(placeholder("Select Unit"));
    attackerClassSelect.add(placeholder("Select Class"));
    defenderClassSelect.add(placeholder("Select Class"));
    attackerItemSelect.add(placeholder("Select Item"));
    defenderItemSelect.add(placeholder("Select Item"));
    attackerTerrainSelect.add(placeholder("Select Terrain"));
    defenderTerrainSelect.add(placeholder("Select Terrain"));

    [attackerCharSelect, defenderCharSelect, attackerItemSelect, defenderItemSelect]
        .forEach(sel => sel.options[0].disabled = true);

    allChars.forEach(char => {
        attackerCharSelect.add(new Option(char.name, char.name));
        defenderCharSelect.add(new Option(char.name, char.name));
    });

    allClasses.forEach(className => {
        attackerClassSelect.add(new Option(className, className));
        defenderClassSelect.add(new Option(className, className));
    });


    allItems.forEach(item => {
        attackerItemSelect.add(new Option(item.name, item.name));
        defenderItemSelect.add(new Option(item.name, item.name));
    });

    allTerrains.forEach(name => {
        attackerTerrainSelect.add(new Option(name, name));
        defenderTerrainSelect.add(new Option(name, name));
    });

    const defaultAttacker = "Mae";
    const defaultDefender = "Boey";

    const attackerChar = characters.find(c => c.name === defaultAttacker);
    const defenderChar = characters.find(c => c.name === defaultDefender);
    const defaultAttackerClass = attackerChar ? attackerChar.startingClass : null;
    const defaultDefenderClass = defenderChar ? defenderChar.startingClass : null;

    updateClassOptions(attackerChar, attackerClassSelect);
    updateClassOptions(defenderChar, defenderClassSelect);
    updateItemOptions(defaultAttackerClass, attackerItemSelect);
    updateItemOptions(defaultDefenderClass, defenderItemSelect);

    const defaultAttackerItem = "Leather Shield";
    const defaultDefenderItem = "Leather Shield";
    const defaultAttackerTerrain = "Hills";
    const defaultDefenderTerrain = "Hills";

    attackerCharSelect.value = defaultAttacker;
    defenderCharSelect.value = defaultDefender;
    attackerClassSelect.value = defaultAttackerClass;
    defenderClassSelect.value = defaultDefenderClass;
    attackerItemSelect.value = defaultAttackerItem;
    defenderItemSelect.value = defaultDefenderItem;

    attackerTerrainSelect.value = defaultAttackerTerrain;
    defenderTerrainSelect.value = defaultDefenderTerrain;



    if (attackerChar && attackerChar.img) attackerImg.src = attackerChar.img;
    if (defenderChar && defenderChar.img) defenderImg.src = defenderChar.img;


    console.log("Characters:", allChars.length, "| Items:", allItems.length);
});
