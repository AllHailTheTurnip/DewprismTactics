// Damage Calculator
// Follows the rules the GodRend engine uses (Dewprism.Rules: Damage.Calculate, ElementChart, Checks.Accuracy):
//   Damage  = Rank × Power × multipliers ÷ the target's Resistance, rounded down.
//   Hitting = 1d20 × Accuracy must meet or beat 10 × the target's Evasion (a natural 20 doesn't always hit).
// Power, Accuracy, Resistance and Evasion are core scores relative to 1.00.
// Body abilities use the Body core (Melee), Mind the Mind core (Skill), Will the Will core (Magic).

const DamageTiers = [
    { name: "VL", rank: 4 },
    { name: "L", rank: 6 },
    { name: "M", rank: 8 },
    { name: "H", rank: 12 },
    { name: "VH", rank: 16 },
    { name: "SH", rank: 24 },
];

const DamageCores = [
    { id: "Body", label: "Body (Melee)" },
    { id: "Mind", label: "Mind (Skill)" },
    { id: "Will", label: "Will (Magic)" },
];

const DamageElements = ["Neutral", "Fire", "Water", "Wind", "Electric", "Metal", "Darkness", "Light", "Noble"];

const RankAdvantage = 1.5;
const RankDisadvantage = 0.5;
const HighGroundBonusPerLevel = 0.20;
const DamageStorageKey = "DewprismDamageCalculator";

// --- Rules -------------------------------------------------------------------------------------------

function IsElementAdvantaged(attack, defender) {
    const pairs = [["Fire", "Wind"], ["Water", "Fire"], ["Wind", "Water"], ["Darkness", "Light"],
        ["Light", "Darkness"], ["Metal", "Electric"], ["Electric", "Metal"]];
    return pairs.some(p => p[0] === attack && p[1] === defender);
}

function IsElementDisadvantaged(attack, defender) {
    const pairs = [["Fire", "Water"], ["Water", "Wind"], ["Wind", "Fire"], ["Darkness", "Darkness"],
        ["Light", "Light"], ["Metal", "Metal"], ["Electric", "Electric"]];
    return pairs.some(p => p[0] === attack && p[1] === defender);
}

// ×1.5 per advantage and ×0.5 per disadvantage, compounded. A Noble attack is advantaged against anything,
// and any attack against a Noble combatant is advantaged; the two stack.
function ElementMultiplier(attack, defenderElements) {
    const defenders = [...new Set(defenderElements.filter(e => e && e !== "None"))];
    let multiplier = 1;

    if (attack === "Noble") multiplier *= RankAdvantage;
    if (defenders.includes("Noble")) multiplier *= RankAdvantage;

    if (attack !== "Noble") {
        for (const defender of defenders) {
            if (defender === "Noble") continue;
            if (IsElementAdvantaged(attack, defender)) multiplier *= RankAdvantage;
            else if (IsElementDisadvantaged(attack, defender)) multiplier *= RankDisadvantage;
        }
    }
    return multiplier;
}

function CalculateDamage(rank, power, multiplier, resistance) {
    if (!(resistance > 0)) return NaN;
    const raw = Math.max(0, rank) * Math.max(0, power) * Math.max(0, multiplier) / resistance;
    return Math.floor(raw + 1e-9);
}

// +20% Accuracy per full level of height over the target, compounding.
function HighGroundMultiplier(levels) {
    return Math.pow(1 + HighGroundBonusPerLevel, Math.max(0, Math.floor(levels + 1e-9)));
}

// The lowest d20 face that hits, or null if no face can reach the target's Evasion.
function RollNeededToHit(accuracy, targetEvasion, highGroundLevels) {
    const total = accuracy * HighGroundMultiplier(highGroundLevels);
    const target = 10 * targetEvasion;
    for (let face = 1; face <= 20; face++) {
        if (face * total + 1e-9 >= target) return face;
    }
    return null;
}

// --- Page --------------------------------------------------------------------------------------------

function DamageNumber(id, fallback) {
    const value = parseFloat(document.getElementById(id).value);
    return isNaN(value) ? fallback : value;
}

function ElementOptions(id, includeNone) {
    const options = (includeNone ? ["None"] : []).concat(DamageElements);
    return `<select id="${id}" onchange="UpdateDamageCalculator()">` +
        options.map(e => `<option value="${e}">${e}</option>`).join("") + `</select>`;
}

function NumberInput(id, value, step) {
    return `<input type="number" id="${id}" value="${value}" step="${step}" min="0" style="width: 5em" onchange="UpdateDamageCalculator()" oninput="UpdateDamageCalculator()">`;
}

// Adds the damage calculator to the element 'DamageCalculator'.
function InjectDamageCalculatorIntoElement() {
    const divider = document.getElementById("DamageCalculator");

    let rows = "";
    for (const core of DamageCores) {
        rows += `<tr>
            <td>${core.label}</td>
            <td>${NumberInput(core.id + "Power", "1.00", "0.01")}</td>
            <td>${NumberInput(core.id + "Accuracy", "1.00", "0.01")}</td>`;
        for (const tier of DamageTiers) rows += `<td id="${core.id}${tier.name}"></td>`;
        rows += `<td id="${core.id}ToHit"></td></tr>`;
    }

    divider.innerHTML = `
        Damage Calculator<br>
        <b>Attack:</b> element ${ElementOptions("AttackElement", false)}
        <label><input type="checkbox" id="AttackCritical" onchange="UpdateDamageCalculator()"> Critical (×1.5)</label>
        &nbsp;Other multipliers ${NumberInput("AttackMultiplier", "1", "0.05")}
        &nbsp;High ground (levels) ${NumberInput("HighGround", "0", "1")}
        <br>
        <b>Target:</b> element ${ElementOptions("TargetElement1", false)} ${ElementOptions("TargetElement2", true)}
        &nbsp;Resistance ${NumberInput("TargetResistance", "1.00", "0.01")}
        &nbsp;Evasion ${NumberInput("TargetEvasion", "1.00", "0.01")}
        <br>
        <span id="DamageMultiplierSummary"></span>
        <table style="width: inherit;" id="DmgTable">
            <tr>
                <th>Core</th><th>Power</th><th>Accuracy</th>
                ${DamageTiers.map(t => `<th>${t.name} (${t.rank})</th>`).join("")}
                <th>Hits on d20</th>
            </tr>
            ${rows}
        </table>`;

    LoadDamageCalculator();
    UpdateDamageCalculator();
}

function UpdateDamageCalculator() {
    const attack = document.getElementById("AttackElement").value;
    const defenders = [document.getElementById("TargetElement1").value, document.getElementById("TargetElement2").value];
    const element = ElementMultiplier(attack, defenders);
    const critical = document.getElementById("AttackCritical").checked ? RankAdvantage : 1;
    const other = DamageNumber("AttackMultiplier", 1);
    const multiplier = element * critical * other;
    const resistance = DamageNumber("TargetResistance", 1);
    const evasion = DamageNumber("TargetEvasion", 1);
    const highGround = DamageNumber("HighGround", 0);

    document.getElementById("DamageMultiplierSummary").innerText =
        `Multiplier: ×${+element.toFixed(4)} element × ${critical} critical × ${other} other = ×${+multiplier.toFixed(4)}`;

    for (const core of DamageCores) {
        const power = DamageNumber(core.id + "Power", 1);
        const accuracy = DamageNumber(core.id + "Accuracy", 1);

        for (const tier of DamageTiers) {
            const damage = CalculateDamage(tier.rank, power, multiplier, resistance);
            document.getElementById(core.id + tier.name).innerText = isNaN(damage) ? "–" : damage;
        }

        const needed = RollNeededToHit(accuracy, evasion, highGround);
        document.getElementById(core.id + "ToHit").innerText = needed === null ? "Can't hit" : needed + "+";
    }

    SaveDamageCalculator();
}

function DamageCalculatorInputs() {
    return Array.from(document.querySelectorAll("#DamageCalculator input, #DamageCalculator select"));
}

function SaveDamageCalculator() {
    try {
        const values = {};
        for (const input of DamageCalculatorInputs())
            values[input.id] = input.type === "checkbox" ? input.checked : input.value;
        localStorage.setItem(DamageStorageKey, JSON.stringify(values));
    } catch (e) {
        // Storage isn't available everywhere; the calculator still works without it.
    }
}

function LoadDamageCalculator() {
    try {
        const values = JSON.parse(localStorage.getItem(DamageStorageKey) || "{}");
        for (const input of DamageCalculatorInputs()) {
            if (!(input.id in values)) continue;
            if (input.type === "checkbox") input.checked = values[input.id] === true;
            else input.value = values[input.id];
        }
    } catch (e) {
        // Ignore anything unreadable and keep the defaults.
    }
}

if (typeof module !== "undefined") {
    module.exports = { ElementMultiplier, CalculateDamage, HighGroundMultiplier, RollNeededToHit, DamageTiers };
}
