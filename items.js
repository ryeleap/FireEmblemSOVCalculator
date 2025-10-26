





// ===================== WEAPONS =====================
const weapons = [
    // --- SWORDS ---
    { name: "Iron Sword", type: "Sword", wt: 0, mt: 2, hit: 90, range: "1", worth: 10, effects: "-", skills: ["Wrath Strike", "Windsweep"] },
    { name: "Steel Sword", type: "Sword", wt: 1, mt: 4, hit: 80, range: "1", worth: 15, effects: "-", skills: ["Sunder", "Crosswise Cut"] },
    { name: "Silver Sword", type: "Sword", wt: 2, mt: 8, hit: 90, range: "1", worth: 20, effects: "-", skills: ["Duelist Sword", "Roundhouse"] },
    { name: "Zweihänder", type: "Sword", wt: 3, mt: 8, hit: 70, range: "1", worth: 50, effects: "Crit +10", skills: ["Sunder", "Penetrate", "Tigerstance"] },
    { name: "Brave Sword", type: "Sword", wt: 0, mt: 5, hit: 90, range: "1", worth: 25, effects: "Crit +30", skills: ["Penetrate", "Grounder"] },
    { name: "Shadow Sword", type: "Sword", wt: 5, mt: 13, hit: 65, range: "1", worth: 25, effects: "Lck -10", skills: ["Hex", "Lifetaker"] },
    { name: "Rapier", type: "Sword", wt: 1, mt: 3, hit: 90, range: "1", worth: 50, effects: "Crit +5, Anti-Cavalry, Anti-Armor", skills: ["Subdue", "Shadow Gambit", "Destreza"] },
    { name: "Ilwoon", type: "Sword", wt: 4, mt: 10, hit: 70, range: "1", worth: 50, effects: "Crit +15", skills: ["Wrath Strike", "Lunge", "Death Blow"] },
    { name: "Ladyblade", type: "Sword", wt: 1, mt: 6, hit: 85, range: "1", worth: 25, effects: "Crit +5, Doubles Might for female users", skills: ["Hexblade", "Flamberge"] },
    { name: "Lightning Sword", type: "Sword", wt: 3, mt: 15, hit: 80, range: "1-2", worth: 25, effects: "Crit -10, Ignores user’s Atk", skills: ["Transmute", "Foudroyant", "Thunderclap"] },
    { name: "Venin Edge", type: "Sword", wt: 1, mt: 1, hit: 80, range: "1", worth: 10, effects: "Inflicts poison", skills: [] },
    { name: "Warrior's Sword", type: "Sword", wt: 2, mt: 6, hit: 80, range: "1", worth: 10, effects: "Crit +20", skills: ["Armor Disruptor"] },
    { name: "Blessed Sword", type: "Sword", wt: 0, mt: 3, hit: 100, range: "1", worth: 25, effects: "Crit +10, Anti-Terrors, Recovery", skills: [] },
    { name: "Mercurius", type: "Sword", wt: 2, mt: 11, hit: 80, range: "1", worth: 1, effects: "-", skills: ["Recovery"] },
    { name: "Golden Dagger", type: "Sword", wt: 0, mt: 1, hit: 90, range: "1", worth: 0, effects: "-", skills: ["Plenitude", "Earth's Boon"] },
    { name: "Beloved Zofia", type: "Sword", wt: 1, mt: 6, hit: 85, range: "1", worth: 0, effects: "Crit +10, Celica only", skills: ["Recovery", "Subdue", "Swap", "Ragnarok Ω"] },

    // --- LANCES ---
    { name: "Iron Lance", type: "Lance", wt: 0, mt: 2, hit: 80, range: "1", worth: 10, effects: "-", skills: ["Hit and Run", "Longearche"] },
    { name: "Steel Lance", type: "Lance", wt: 1, mt: 4, hit: 80, range: "1", worth: 15, effects: "-", skills: ["Armorcrush", "Tempest Lance"] },
    { name: "Silver Lance", type: "Lance", wt: 2, mt: 8, hit: 90, range: "1", worth: 20, effects: "-", skills: ["Mistdancer", "Overrun"] },
    { name: "Javelin", type: "Lance", wt: 2, mt: 3, hit: 70, range: "1-2", worth: 20, effects: "-", skills: [] },
    { name: "Ridersbane", type: "Lance", wt: 2, mt: 4, hit: 80, range: "1", worth: 20, effects: "Anti-Cavalry", skills: [] },
    { name: "Blessed Lance", type: "Lance", wt: 0, mt: 3, hit: 90, range: "1", worth: 25, effects: "Crit +10, Recovery, Anti-Terrors", skills: [] },
    { name: "Clive's Lance", type: "Lance", wt: 2, mt: 5, hit: 80, range: "1", worth: 15, effects: "-", skills: ["Wrath Strike", "Armorcrush", "Lunge"] },
    { name: "Fernand's Lance", type: "Lance", wt: 1, mt: 3, hit: 90, range: "1", worth: 10, effects: "-", skills: ["Longearche", "Penetrate", "Windsweep"] },
    { name: "Clair's Lance", type: "Lance", wt: 0, mt: 2, hit: 80, range: "1", worth: 25, effects: "Res +5, Anti-Terrors", skills: ["Mistdancer"] },
    { name: "Gradivus", type: "Lance", wt: 5, mt: 12, hit: 100, range: "1-2", worth: 1, effects: "-", skills: ["Recovery"] },
    { name: "Sol", type: "Lance", wt: 2, mt: 20, hit: 80, range: "1", worth: 1, effects: "-", skills: ["Solar Thrust"] },
    { name: "Duma's Lance", type: "Lance", wt: 3, mt: 6, hit: 80, range: "1", worth: 25, effects: "-", skills: ["Vendetta"] },
    { name: "Rhomphaia", type: "Lance", wt: 3, mt: 5, hit: 80, range: "1", worth: 50, effects: "Crit +10", skills: ["Armorcrush", "Knightkneeler", "Dragonhaze"] },
    { name: "Venin Lance", type: "Lance", wt: 1, mt: 1, hit: 80, range: "1", worth: 10, effects: "Inflicts poison", skills: [] },

    // --- BOWS ---
    { name: "Iron Bow", type: "Bow", wt: 2, mt: 2, hit: 75, range: "1-3", worth: 10, effects: "Anti-Fliers", skills: ["Curved Shot"] },
    { name: "Steel Bow", type: "Bow", wt: 3, mt: 3, hit: 65, range: "1-3", worth: 15, effects: "Anti-Fliers", skills: ["Heavy Draw"] },
    { name: "Silver Bow", type: "Bow", wt: 4, mt: 5, hit: 70, range: "1-3", worth: 20, effects: "Anti-Fliers", skills: ["Ward Arrow"] },
    { name: "Blessed Bow", type: "Bow", wt: 2, mt: 3, hit: 80, range: "1-3", worth: 25, effects: "Crit +10, Recovery, Anti-Terrors", skills: [] },
    { name: "Luna", type: "Bow", wt: 5, mt: 10, hit: 85, range: "1-3", worth: 1, effects: "Anti-Fliers", skills: ["Lunar Flash"] },
    { name: "Parthia", type: "Bow", wt: 6, mt: 8, hit: 75, range: "1-3", worth: 1, effects: "Anti-Fliers, Recovery", skills: ["Trance Shot"] },
    { name: "Killer Bow", type: "Bow", wt: 4, mt: 4, hit: 80, range: "1-3", worth: 50, effects: "Crit +20, Anti-Fliers", skills: ["Hunter Volley"] },
    { name: "Radiant Bow", type: "Bow", wt: 3, mt: 1, hit: 75, range: "1-2", worth: 50, effects: "Anti-Fliers", skills: ["Transmute", "Celestial Bow"] },
    { name: "Longbow", type: "Bow", wt: 4, mt: 2, hit: 70, range: "2-4", worth: 50, effects: "Anti-Fliers", skills: ["Encloser"] },
    { name: "Python's Bow", type: "Bow", wt: 3, mt: 2, hit: 80, range: "2-3", worth: 10, effects: "Anti-Fliers", skills: ["Curved Shot", "Heavy Draw", "Encloser"] },

    // --- BLACK MAGIC ---
    { name: "Fire", type: "Black Magic", wt: 3, mt: 3, hit: 80, range: "1-2", worth: 0, effects: "HP Cost 1", skills: [] },
    { name: "Thunder", type: "Black Magic", wt: 5, mt: 4, hit: 70, range: "1-3", worth: 0, effects: "HP Cost 2", skills: [] },
    { name: "Excalibur", type: "Black Magic", wt: 1, mt: 5, hit: 95, range: "1-2", worth: 0, effects: "Crit +20, HP Cost 3", skills: [] },
    { name: "Seraphim", type: "Black Magic", wt: 4, mt: 7, hit: 90, range: "1-2", worth: 0, effects: "Anti-Terrors, HP Cost 4", skills: [] },
    { name: "Aura", type: "Black Magic", wt: 8, mt: 12, hit: 80, range: "1-2", worth: 0, effects: "HP Cost 6", skills: [] },
    { name: "Sagittae", type: "Black Magic", wt: 11, mt: 16, hit: 70, range: "1-3", worth: 0, effects: "HP Cost 8", skills: [] },
    { name: "Ragnarok", type: "Black Magic", wt: 14, mt: 20, hit: 95, range: "1-2", worth: 0, effects: "HP Cost 10", skills: [] },
    { name: "Nosferatu", type: "White Magic", wt: 2, mt: 0, hit: 60, range: "1-2", worth: 0, effects: "Absorbs HP equal to damage", skills: [] },
];


// ===================== Shields =====================
const shields = [
    {
        name: "Leather Shield",
        def: 3,
        res: 0,
        wt: 0,
        worth: 10,
        effects: "None",
        skills: ["Swap"]
    },
    {
        name: "Iron Shield",
        def: 4,
        res: 0,
        wt: 1,
        worth: 10,
        effects: "None",
        skills: ["Shove"]
    },
    {
        name: "Steel Shield",
        def: 5,
        res: 0,
        wt: 2,
        worth: 15,
        effects: "None",
        skills: ["Defensive"]
    },
    {
        name: "Rion Shield",
        def: 2,
        res: 2,
        wt: 3,
        worth: 20,
        effects: "Atk +2",
        skills: ["Shove", "Defensive"]
    },
    {
        name: "Fugue Shield",
        def: 2,
        res: 2,
        wt: 1,
        worth: 20,
        effects: "None",
        skills: ["Swap", "Coral Cover"]
    },
    {
        name: "Silver Shield",
        def: 7,
        res: 0,
        wt: 3,
        worth: 20,
        effects: "None",
        skills: []
    },
    {
        name: "Blessed Shield",
        def: 0,
        res: 0,
        wt: 0,
        worth: 25,
        effects: "Sanctuary, Recovery",
        skills: []
    },
    {
        name: "Dracoshield",
        def: 13,
        res: 13,
        wt: 10,
        worth: 50,
        effects: "Recovery",
        skills: []
    },
    {
        name: "Hexlock Shield",
        def: 0,
        res: 7,
        wt: 3,
        worth: 50,
        effects: "Halves damage from black magic",
        skills: ["Earth's Kiss"]
    },
    {
        name: "Emperor Shield",
        def: 4,
        res: 0,
        wt: 4,
        worth: 25,
        effects: "None",
        skills: ["Swap", "Shove", "Defensive"]
    },
    {
        name: "Duma's Shield",
        def: 2,
        res: 0,
        wt: 5,
        worth: 25,
        effects: "Atk +4",
        skills: ["Pavise"]
    },
    {
        name: "Royal Shield",
        def: 3,
        res: 3,
        wt: 2,
        worth: 25,
        effects: "None",
        skills: ["Earth's Kiss"]
    },
    {
        name: "Rusted Shield",
        def: 0,
        res: 0,
        wt: 3,
        worth: 0,
        effects: "None",
        skills: []
    },
    {
        name: "Sage's Shield",
        def: 5,
        res: 5,
        wt: 2,
        worth: 3,
        effects: "Recovery",
        skills: ["Pavise", "Earth's Kiss"]
    },
    {
        name: "Eleven Shield",
        def: 4,
        res: 3,
        wt: 1,
        worth: 100,
        effects: "Boosts stats between the 7th and 11th turns",
        skills: []
    },
    {
        name: "Lukas's Shield",
        def: 5,
        res: 0,
        wt: 3,
        worth: 10,
        effects: "None",
        skills: ["Swap", "Shove", "Defensive"]
    }
];

// ===================== Rings =====================
const rings = [
    {
        name: "Blessed Ring",
        wt: 0,
        worth: 5,
        effects: "Recovery",
        skills: []
    },
    {
        name: "Angel Ring",
        wt: 0,
        worth: 10,
        effects: "Luck +20, Recovery",
        skills: []
    },
    {
        name: "Speed Ring",
        wt: 0,
        worth: 10,
        effects: "Speed +10, Move +1, Recovery",
        skills: []
    },
    {
        name: "Mage Ring",
        wt: 0,
        worth: 10,
        effects: "Sophisticate, Recovery",
        skills: []
    },
    {
        name: "Prayer Ring",
        wt: 0,
        worth: 10,
        effects: "Miracle, Recovery",
        skills: []
    },
    {
        name: "Grimoire Ring",
        wt: 0,
        worth: 10,
        effects: "Magic +5",
        skills: []
    },
    {
        name: "Coral Ring",
        wt: 0,
        worth: 10,
        effects: "Res +4, Recovery",
        skills: ["Coral Cover"]
    },
    {
        name: "Mila's Ring",
        wt: 0,
        worth: 10,
        effects: "Evade Critical, Recovery",
        skills: []
    },
    {
        name: "Animus Ring",
        wt: 0,
        worth: 0,
        effects: "Vengeful Cry, Recovery",
        skills: []
    },
    {
        name: "Demon Ring",
        wt: 0,
        worth: 10,
        effects: "Atk/Skl +5, Def/Res -5, Reconstruct",
        skills: []
    },
    {
        name: "Keepsake Ring",
        wt: 0,
        worth: 3,
        effects: "Skl/Lck/Res +5, Recovery",
        skills: []
    },
    {
        name: "Rusted Ring",
        wt: 2,
        worth: 0,
        effects: "None",
        skills: []
    }
];
