const terrainProperties = [
    { group: "Obstacle", terrains: ["Wall", "Door", "Enemy", "Rock", "Pillar (big)", "Stones", "Torch", "Tower", "Inferno"], avoid: 0, hpRec: 0 },
    { group: "Aerial", terrains: ["Peak", "Sea", "Rampart", "Cavern", "Railing", "Sky", "Partition", "Rubble", "Ship"], avoid: 0, hpRec: 0 },
    { group: "Floor", terrains: ["Plain", "Ground", "Bridge", "Stairs", "Earth", "Town", "Floor", "Snow", "Deck"], avoid: 0, hpRec: 0 },
    { group: "Floor", terrains: ["Tile", "Bridge (broken)"], avoid: 20, hpRec: 0 },
    { group: "Floor", terrains: ["Supplies", "Fort", "O. Tree"], avoid: 40, hpRec: 5 },
    { group: "Floor", terrains: ["Grave"], avoid: 60, hpRec: 0 },
    { group: "Floor", terrains: ["Sigil"], avoid: 30, hpRec: 0 },
    { group: "Floor", terrains: ["Ruin"], avoid: -20, hpRec: 0 },
    { group: "Tree", terrains: ["Forest", "Woods"], avoid: 40, hpRec: 0 },
    { group: "Tree", terrains: ["Thicket", "Pillar", "Coral"], avoid: 30, hpRec: 0 },
    { group: "Tree", terrains: ["Flames"], avoid: 0, hpRec: 0 },
    { group: "Sand", terrains: ["Desert"], avoid: 0, hpRec: 0 },
    { group: "Bulwark", terrains: ["Bulwark"], avoid: 30, hpRec: 0 },
    { group: "Mountain", terrains: ["Mountain", "Bluff"], avoid: 30, hpRec: 0 },
    { group: "Water", terrains: ["River", "Falls", "Shoal"], avoid: 0, hpRec: 0 },
    { group: "Hazard", terrains: ["Lava", "Swamp"], avoid: 0, hpRec: -5 },
    { group: "Hills", terrains: ["Hills"], avoid: 0, hpRec: 0 }
];
