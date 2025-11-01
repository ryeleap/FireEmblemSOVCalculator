// ===================== SPELL DATA =====================
// Based on Fire Emblem Echoes base stats
const spells = {
    "Fire": { mt: 3, hit: 90, range: "1-2", hpCost: 1, type: "Black Magic" },
    "Thunder": { mt: 4, hit: 85, range: "1-3", hpCost: 2, type: "Black Magic" },
    "Excalibur": { mt: 5, hit: 95, range: "1-2", hpCost: 3, type: "Black Magic", crit: 20 },
    "Ragnarok": { mt: 20, hit: 95, range: "1-2", hpCost: 10, type: "Black Magic" },
    "Sagittae": { mt: 16, hit: 70, range: "1-3", hpCost: 8, type: "Black Magic" },
    "Aura": { mt: 12, hit: 80, range: "1-2", hpCost: 6, type: "White Magic" },
    "Seraphim": { mt: 7, hit: 90, range: "1-2", hpCost: 4, type: "White Magic", effect: "Effective vs Terrors" },
    "Nosferatu": { mt: 0, hit: 60, range: "1-2", hpCost: 0, type: "White Magic", effect: "Absorbs HP equal to damage" },
    "Expel": { mt: 0, hit: 100, range: "1-2", hpCost: 0, type: "White Magic", effect: "Banishes Terrors" }
};
