const classes = {
    "Fighter": {
        weapon: "Sword",
        promotesFrom: null,
        gender: "Male",
        skills: []
    },
    "Hero": {
        weapon: "Sword",
        promotesFrom: "Fighter",
        gender: "Male",
        skills: []
    },

    "Priestess": {
        weapon: "Sword, Black Magic, White Magic",
        promotesFrom: "Mage",
        gender: "Female",
        skills: []
    },
    "Princess": {
        weapon: "Sword, Black Magic, White Magic",
        promotesFrom: "Priestess",
        gender: "Female",
        skills: []
    },

    // === Villager base ===
    "Villager": {
        weapon: "Sword",
        promotesFrom: null,
        gender: "Both",
        skills: []
    },

    // === Male lines ===
    "Mercenary": {
        weapon: "Sword",
        promotesFrom: "Villager",
        gender: "Male",
        skills: []
    },
    "Myrmidon": {
        weapon: "Sword",
        promotesFrom: "Mercenary",
        gender: "Male",
        skills: []
    },
    "Dread Fighter": {
        weapon: "Sword",
        promotesFrom: "Myrmidon",
        gender: "Male",
        skills: ["Yasha", "Resistance +5", "Apotrope"]
    },

    "Soldier": {
        weapon: "Lance",
        promotesFrom: "Villager",
        gender: "Male",
        skills: []
    },
    "Knight": {
        weapon: "Lance",
        promotesFrom: "Soldier",
        gender: "Male",
        skills: []
    },
    "Baron": {
        weapon: "Lance",
        promotesFrom: "Knight",
        gender: "Male",
        skills: ["Armored"]
    },

    "Archer": {
        weapon: "Bow",
        promotesFrom: "Villager",
        gender: "Male",
        skills: []
    },
    "Sniper": {
        weapon: "Bow",
        promotesFrom: "Archer",
        gender: "Male",
        skills: ["Bowrange +1"]
    },
    "Bow Knight": {
        weapon: "Bow",
        promotesFrom: "Sniper",
        gender: "Male",
        skills: ["Bowrange +2", "Horseback"]
    },

    "Mage": {
        weapon: "Black Magic",
        promotesFrom: "Villager",
        gender: "Both",
        skills: []
    },
    "Sage": {
        weapon: "Black Magic, White Magic",
        promotesFrom: "Mage",
        gender: "Male",
        skills: ["Discipline"]
    },

    "Cavalier": {
        weapon: "Lance",
        promotesFrom: "Villager",
        gender: "Male",
        skills: ["Horseback"]
    },
    "Paladin": {
        weapon: "Lance",
        promotesFrom: "Cavalier",
        gender: "Male",
        skills: ["Horseback"]
    },
    "Gold Knight": {
        weapon: "Lance",
        promotesFrom: "Paladin",
        gender: "Male",
        skills: ["Horseback"]
    },

    // === Female lines ===
    "Pegasus Knight": {
        weapon: "Lance",
        promotesFrom: "Villager",
        gender: "Female",
        skills: ["Flying"]
    },
    "Falcon Knight": {
        weapon: "Lance",
        promotesFrom: "Pegasus Knight",
        gender: "Female",
        skills: ["Flying"]
    },
    "Cleric": {
        weapon: "Black Magic, White Magic",
        promotesFrom: "Villager",
        gender: "Female",
        skills: []
    },
    "Saint": {
        weapon: "Black Magic, White Magic",
        promotesFrom: "Cleric",
        gender: "Female",
        skills: []
    }
};
