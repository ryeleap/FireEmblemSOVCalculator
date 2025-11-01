// ===================== COMBAT ARTS =====================
// Cost = HP cost to use the art
// Might = additional might over weapon base
// Hit, Crit modifiers are additive to weapon stats
// Range can override weapon range if provided
// Effect describes text behaviour until scripted

const combatArts = {
    "Curved Shot": { cost: 1, might: 1, hit: 30, crit: 0, rangeMod: +1, desc: "Increased range +1", weaponTypes: ["Bow"] },
    "Wrath Strike": { cost: 5, might: 5, hit: 10, crit: 0, rangeMod: 0, desc: "Strong single strike", weaponTypes: ["Sword", "Lance"] },
    "Hit and Run": { cost: 2, might: 2, hit: 10, crit: 0, avoid: +30, desc: "Retreats 1 tile after attack", weaponTypes: ["Lance"] },
    "Subdue": { cost: 0, might: 0, hit: 20, crit: 0, desc: "Leaves foe at 1 HP", weaponTypes: ["Sword", "Lance"] },
    "Crosswise Cut": { cost: 3, might: 3, hit: 30, crit: 0, weaponTypes: ["Sword"] },
    "Heavy Draw": { cost: 2, might: 8, hit: 10, crit: 0, weaponTypes: ["Bow"] },
    "Sunder": { cost: 2, might: 4, hit: 10, crit: 30, weaponTypes: ["Sword"] },
    "Lunge": { cost: 3, might: 2, hit: 20, crit: 10, desc: "Swaps positions with enemy", weaponTypes: ["Sword", "Lance"] },
    "Penetrate": { cost: 3, might: 2, hit: 20, crit: 0, avoid: +10, desc: "Moves 1 tile forward", weaponTypes: ["Sword", "Lance"] },
    "Windsweep": { cost: 4, might: 3, hit: 20, crit: 10, desc: "Prevents counterattack", weaponTypes: ["Sword", "Lance"] },
    // … add more from your table progressively …
};

// ===================== PASSIVE SKILLS =====================
const passiveSkills = {
    "Lifetaker": { effect: "Restores HP after KO", type: "postCombat" },
    "Recovery": { effect: "Restores 5 HP each turn", type: "regen" },
    "Apotrope": { effect: "Halves Black Magic damage", type: "reduction", dmgType: "Magic" },
    "Pavise": { effect: "Halves physical damage", type: "reduction", dmgType: "Physical" },
    "Earth’s Kiss": { effect: "Halves magical damage", type: "reduction", dmgType: "Magic" },
    "Wrath": { effect: "Increases crit when under half HP", type: "conditional", stat: "crit", value: +30 },
    // … extend as you go …
};
