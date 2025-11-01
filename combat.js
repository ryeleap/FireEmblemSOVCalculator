// ===================== COMBAT ENGINE =====================
console.log("combat.js loaded");

function calculateCombat(attacker, defender, context = {}) {
    const { terrainA = "Plain", terrainD = "Plain", isCritA = false, isCritD = false } = context;

    const atkItem = attacker.item || { mt: 0, hit: 0, type: "Sword" };
    const defItem = defender.item || { mt: 0, hit: 0, type: "Sword" };

    // 1️⃣  Calculate Derived Stats
    const atkAS = attacker.stats.Speed - atkItem.wt;
    const defAS = defender.stats.Speed - defItem.wt;

    const atkAvoid = atkAS + getTerrainAvoid(terrainA);
    const defAvoid = defAS + getTerrainAvoid(terrainD);

    const atkHit = attacker.stats.Skill + atkItem.hit;
    const defHit = defender.stats.Skill + defItem.hit;

    const atkCrit = Math.floor((attacker.stats.Skill + attacker.stats.Luck) / 2) + getWeaponCrit(atkItem);
    const defCrit = Math.floor((defender.stats.Skill + defender.stats.Luck) / 2) + getWeaponCrit(defItem);

    // 2️⃣  Hit Probability
    const hitChanceA = Math.max(0, Math.min(100, atkHit - defAvoid));
    const hitChanceD = Math.max(0, Math.min(100, defHit - atkAvoid));

    // 3️⃣  Raw Damage
    const rawDamageA = calcDamage(attacker, defender, atkItem, isCritA);
    const rawDamageD = calcDamage(defender, attacker, defItem, isCritD);

    // 4️⃣  Double Attack Check (Speed ≥ enemy +5)
    const atkDoubles = atkAS >= defAS + 5;
    const defDoubles = defAS >= atkAS + 5;

    if (spells[attacker.selectedAttack]) {
        const s = spells[attacker.selectedAttack];
        resultA.hit = Math.min(100, Math.max(0, attacker.stats.Skill + s.hit - (defender.stats.Speed + getTerrainAvoid(terrainD))));
    }

    // 5️⃣  Result
    return {
        attacker: {
            damage: rawDamageA,
            hit: hitChanceA,
            crit: atkCrit,
            doubles: atkDoubles,
        },
        defender: {
            damage: rawDamageD,
            hit: hitChanceD,
            crit: defCrit,
            doubles: defDoubles,
        }
    };
}

// ===================== HELPERS =====================

function getTerrainAvoid(terrainName) {
    for (const t of terrainProperties) {
        if (t.terrains.includes(terrainName)) return t.avoid || 0;
    }
    return 0;
}

function getWeaponCrit(item) {
    // Extract "Crit +10" etc from effects if present
    const match = item.effects?.match(/Crit\s*\+(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}
function calcDamage(attacker, defender, weapon, isCrit = false) {
    const attackName = attacker.selectedAttack || "Basic Attack";
    const spell = spells[attackName]; // look up spell data if it exists
    const isSpell = Boolean(spell);
    const isMagic = isSpell || weapon.type?.includes("Magic");

    const atkStat = isMagic ? attacker.stats.Res : attacker.stats.Attack;
    const defStat = isMagic ? defender.stats.Res : defender.stats.Defense;

    let mtBonus = 0;
    let hitBonus = 0;
    let critBonus = 0;

    if (isSpell) {
        // from spells.js
        mtBonus = spell.mt || 0;
        hitBonus = spell.hit || 0;
        critBonus = spell.crit || 0;
    } else {
        // from physical weapon
        mtBonus = weapon.mt || 0;
        hitBonus = weapon.hit || 0;
        critBonus = getWeaponCrit(weapon);
    }

    let dmg = atkStat + mtBonus - defStat;
    dmg = Math.max(0, dmg);
    if (isCrit) dmg *= 3;

    // optionally display HP cost later
    attacker.hpCost = spell?.hpCost || 0;

    return dmg;
}

function simulateCombat(attacker, defender, context = {}) {
    const {
        terrainA = "Plain",
        terrainD = "Plain",
        isCritA = false,
        isCritD = false
    } = context;

    const log = [];
    let atkHP = attacker.stats.HP;
    let defHP = defender.stats.HP;

    // Grab equipped items or "None"
    const atkWeapon = attacker.item || { mt: 0, hit: 100, type: "Sword" };
    const defWeapon = defender.item || { mt: 0, hit: 100, type: "Sword" };

    const result = calculateCombat(attacker, defender, context);

    const phases = [];

    // === Determine turn order ===
    // Attacker always strikes first
    phases.push({ actor: "attacker", doubles: result.attacker.doubles });
    if (defender) phases.push({ actor: "defender", doubles: result.defender.doubles });

    // === Simulate hits ===
    for (const phase of phases) {
        const source = phase.actor === "attacker" ? attacker : defender;
        const target = phase.actor === "attacker" ? defender : attacker;
        const srcRes = phase.actor === "attacker" ? result.attacker : result.defender;
        const isCrit = phase.actor === "attacker" ? isCritA : isCritD;
        const terrainSrc = phase.actor === "attacker" ? terrainA : terrainD;
        const terrainTgt = phase.actor === "attacker" ? terrainD : terrainA;

        const spell = spells[source.selectedAttack];
        const hitChance = srcRes.hit;
        const hitRoll = Math.random() * 100;

        let damage = calcDamage(source, target, source.item, isCrit);

        // Apply HP cost if spell
        const hpCost = spell?.hpCost || 0;
        if (hpCost > 0) {
            if (phase.actor === "attacker") atkHP -= hpCost;
            else defHP -= hpCost;
            log.push(`${source.name} lost ${hpCost} HP casting ${source.selectedAttack}.`);
        }

        if (hitRoll <= hitChance) {
            const critRoll = Math.random() * 100;
            const critChance = srcRes.crit;

            if (critRoll <= critChance) {
                damage *= 3;
                log.push(`${source.name} landed a CRITICAL HIT with ${source.selectedAttack}!`);
            } else {
                log.push(`${source.name} hit ${target.name} with ${source.selectedAttack}.`);
            }

            // Apply damage
            if (phase.actor === "attacker") defHP = Math.max(0, defHP - damage);
            else atkHP = Math.max(0, atkHP - damage);

            log.push(`${target.name} took ${damage} damage.`);
        } else {
            log.push(`${source.name}'s attack missed!`);
        }

        // Handle doubles (second strike)
        if (phase.doubles && (atkHP > 0 && defHP > 0)) {
            const hitRoll2 = Math.random() * 100;
            if (hitRoll2 <= hitChance) {
                const critRoll2 = Math.random() * 100;
                let dmg2 = calcDamage(source, target, source.item, isCrit);
                if (critRoll2 <= srcRes.crit) {
                    dmg2 *= 3;
                    log.push(`${source.name} followed up with a CRITICAL double attack!`);
                } else {
                    log.push(`${source.name} followed up and hit again!`);
                }
                if (phase.actor === "attacker") defHP = Math.max(0, defHP - dmg2);
                else atkHP = Math.max(0, atkHP - dmg2);
                log.push(`${target.name} took ${dmg2} damage.`);
            } else {
                log.push(`${source.name}'s double attack missed.`);
            }
        }

        // End early if target is dead
        if (atkHP <= 0 || defHP <= 0) break;
    }

    log.push(`\nFinal HP:  ${attacker.name} ${atkHP} HP  |  ${defender.name} ${defHP} HP`);
    return { atkHP, defHP, log };
}

// Example tester (temporary)
window.testCombat = function () {
    const attacker = {
        stats: { Attack: 10, Defense: 5, Speed: 8, Skill: 7, Luck: 5, Res: 3 },
        item: weapons.find(w => w.name === "Steel Sword")
    };
    const defender = {
        stats: { Attack: 9, Defense: 6, Speed: 5, Skill: 6, Luck: 4, Res: 2 },
        item: shields.find(s => s.name === "Iron Shield")
    };

    const result = calculateCombat(attacker, defender, { terrainA: "Forest", terrainD: "Hills" });
    console.log(result);
};

// ===================== UI HOOK =====================
document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById("calculate-button");
    const resultDiv = document.getElementById("combat-result");

    calcBtn.addEventListener("click", () => {
        // Gather attacker + defender selections
        const atkChar = document.getElementById("attacker-select").value;
        const defChar = document.getElementById("defender-select").value;
        const atkClass = document.getElementById("attacker-class-select").value;
        const defClass = document.getElementById("defender-class-select").value;
        const atkItemName = document.getElementById("attacker-item-select").value;
        const defItemName = document.getElementById("defender-item-select").value;
        const atkTerrain = document.getElementById("attacker-terrain-select").value;
        const defTerrain = document.getElementById("defender-terrain-select").value;

        const atkObj = characters.find(c => c.name === atkChar);
        const defObj = characters.find(c => c.name === defChar);
        if (!atkObj || !defObj) return alert("Please select both units!");

        // Collect stat inputs
        const getStats = sel =>
            [...document.querySelectorAll(`${sel} .stat-row`)].reduce((acc, row) => {
                const label = row.querySelector("label").textContent.trim();
                const val = parseInt(row.querySelector("input").value, 10);
                acc[label] = val;
                return acc;
            }, {});

        const attacker = {
            name: atkChar,
            className: atkClass,
            stats: getStats(".attacker"),
            item: [...weapons, ...shields, ...rings, ...none].find(i => i.name === atkItemName)
        };

        const defender = {
            name: defChar,
            className: defClass,
            stats: getStats(".defender"),
            item: [...weapons, ...shields, ...rings, ...none].find(i => i.name === defItemName)
        };

        // Check crit toggles
        const isCritA = document.getElementById("attacker-crit-button").classList.contains("active-blue");
        const isCritD = document.getElementById("defender-crit-button").classList.contains("active-red");

        const context = {
            terrainA: atkTerrain,
            terrainD: defTerrain,
            isCritA,
            isCritD
        };

        const { atkHP, defHP, log } = simulateCombat(attacker, defender, context);

        // Render results
        resultDiv.innerHTML = `
        <h3>Combat Log</h3>
        <pre style="text-align:left; color:#ddd; background:#222; padding:10px; border-radius:6px; white-space:pre-wrap;">${log.join("\n")}</pre>`;

    });
});
