document.addEventListener("DOMContentLoaded", () => {
    const attackerImg = document.querySelector(".attacker-img");
    const defenderImg = document.querySelector(".defender-img");
    const attackerCharSelect = document.getElementById("attacker-select");
    const defenderCharSelect = document.getElementById("defender-select");
    const attackerItemSelect = document.getElementById("attacker-item-select");
    const defenderItemSelect = document.getElementById("defender-item-select");

    attackerCharSelect.addEventListener("change", () => {
        const chosen = characters.find(c => c.name === attackerCharSelect.value);
        if (chosen) {
            attackerImg.src = chosen.img;
        }
    });

    defenderCharSelect.addEventListener("change", () => {
        const chosen = characters.find(c => c.name === defenderCharSelect.value);
        if (chosen) {
            defenderImg.src = chosen.img;
        }
    });

    const allChars = [...characters];
    const allItems = [...weapons, ...shields, ...rings];

    attackerCharSelect.innerHTML = "";
    defenderCharSelect.innerHTML = "";
    attackerItemSelect.innerHTML = "";
    defenderItemSelect.innerHTML = "";

    const placeholder = (text) => new Option(text, "", true, true);
    attackerCharSelect.add(placeholder("Select Unit"));
    defenderCharSelect.add(placeholder("Select Unit"));
    attackerItemSelect.add(placeholder("Select Item"));
    defenderItemSelect.add(placeholder("Select Item"));

    [attackerCharSelect, defenderCharSelect, attackerItemSelect, defenderItemSelect]
        .forEach(sel => sel.options[0].disabled = true);

    allChars.forEach(char => {
        attackerCharSelect.add(new Option(char.name, char.name));
        defenderCharSelect.add(new Option(char.name, char.name));
    });

    allItems.forEach(item => {
        attackerItemSelect.add(new Option(item.name, item.name));
        defenderItemSelect.add(new Option(item.name, item.name));
    });

    const defaultAttacker = "Mae";
    const defaultDefender = "Boey";
    const defaultAttackerItem = "Leather Shield";
    const defaultDefenderItem = "Leather Shield";

    attackerItemSelect.value = defaultAttackerItem;
    defenderItemSelect.value = defaultDefenderItem;
    attackerCharSelect.value = defaultAttacker;
    defenderCharSelect.value = defaultDefender;

    const attackerChar = characters.find(c => c.name === defaultAttacker);
    const defenderChar = characters.find(c => c.name === defaultDefender);

    if (attackerChar && attackerChar.img) attackerImg.src = attackerChar.img;
    if (defenderChar && defenderChar.img) defenderImg.src = defenderChar.img;


    console.log("Characters:", allChars.length, "| Items:", allItems.length);
});
