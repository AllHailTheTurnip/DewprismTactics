const prefix = "Abt";

function GetTxtAttribute(attr) {

    const suffix = ':'
    const endl = '|';
    const flavor = "~~~";

    attr = attr + suffix;

    // Marks beginning of line.
    const ndxStart = accessedFile.indexOf(attr) + attr.length;

    // Marks end of line.
    ndxEnd = accessedFile.indexOf(endl, ndxStart);

    attr = accessedFile.substring(ndxStart, ndxEnd);



    return attr;
}

function onLoadMonster() {
    accessedFile = this.response;

    function SetHTMLByID(id) {
        document.getElementById(prefix + id).innerHTML = GetTxtAttribute(id);
    }

    // Biography.
    SetHTMLByID("Name");
    SetHTMLByID("Type")
    SetHTMLByID("Level");
    SetHTMLByID("Intelligence");
    SetHTMLByID("PrimaryClass");
    SetHTMLByID("Description");
    SetHTMLByID("Appearance");
    SetHTMLByID("Behavior");

    // Vitals
    SetHTMLByID("Health");
    SetHTMLByID("Stamina");
    SetHTMLByID("Mana");
    SetHTMLByID("Focus");

    // Scores
    SetHTMLByID("Element");
    SetHTMLByID("Initiative");
    SetHTMLByID("Carry");
    SetHTMLByID("MeleeDamage");
    SetHTMLByID("MagicDamage");
    SetHTMLByID("SkillDamage");

    // Stats
    SetHTMLByID("Melee");
    SetHTMLByID("Magic");
    SetHTMLByID("Skill");

    // Talents
    SetHTMLByID("Craft");
    SetHTMLByID("Harvest");
    SetHTMLByID("Scholar");
    SetHTMLByID("Navigate");
    SetHTMLByID("Acrobatic");
    SetHTMLByID("Arts");

    // Equipment
    SetHTMLByID("PrimaryWeapon");
    SetHTMLByID("SecondaryWeapon");
    SetHTMLByID("Tools");
    SetHTMLByID("Consumables");

    // Loot and Experience
    SetHTMLByID("Experience");
    SetHTMLByID("Gil");
    SetHTMLByID("Loot");
}

// Top-level fields of a class file. Each one starts a line as "Key: value" and runs
// until the next top-level field or section header, so multi-line descriptions and
// ability blocks (with their own "Use:", "Effect:" lines) are kept whole.
const classFields = [
    "Title", "Subtitle", "Description",
    "Health", "Stamina", "Mana", "Focus",
    "Initiative", "Carry", "Element",
    "Melee", "Magic", "Skill",
    "Doctrine",
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
    "MA1", "MA2", "MA3"
];
const classSectionHeaders = ["VITALS", "SCORES", "STATS", "ABILITIES"];

function ParseClassFile(text) {
    const fields = {};
    const lines = text.replace(/\r\n?/g, "\n").split("\n");
    const fieldPattern = new RegExp("^(" + classFields.join("|") + "):\\s?(.*)$");
    let current = null;

    for (const line of lines) {
        const match = line.match(fieldPattern);
        if (match) {
            current = match[1];
            fields[current] = [match[2]];
        } else if (classSectionHeaders.includes(line.trim())) {
            current = null;
        } else if (current !== null) {
            fields[current].push(line);
        }
    }

    for (const key in fields) {
        fields[key] = fields[key].join("\n").trim();
    }
    return fields;
}

function onLoadClass()
{

    if (this.status !== 200 && this.status !== 0) {
        for (const id of classFields) {
            const el = document.getElementById(id);
            if (el) el.innerText = "";
        }
        document.getElementById("Title").innerText = "Class not found";
        return;
    }

    const fields = ParseClassFile(this.responseText);

    // Title, subtitle and description may contain HTML (e.g. <p> tags).
    const htmlFields = ["Title", "Subtitle", "Description"];

    for (const id of classFields) {
        const el = document.getElementById(id);
        if (!el) continue;

        const value = fields[id] || "";
        if (htmlFields.includes(id)) {
            el.innerHTML = value;
        } else {
            el.innerText = value;
        }

        // Hide ability slots the class doesn't have (and the divider after them).
        if (el.tagName === "LI") {
            el.style.display = value ? "" : "none";
            const next = el.nextElementSibling;
            if (next && next.tagName === "HR") next.style.display = value ? "" : "none";
        }
    }

    // Classes no longer define Melee/Magic/Skill; only show Stats if one is present.
    const stats = document.getElementById("Stats");
    if (stats) {
        stats.style.display = (fields.Melee || fields.Magic || fields.Skill) ? "" : "none";
    }

}

function LoadMonster(name) {
    var req = new XMLHttpRequest();
     req.addEventListener("load", onLoadMonster);
     req.open("GET", name);
     req.send();
}

function LoadClass(name)
{
    var req = new XMLHttpRequest();
    req.addEventListener("load", onLoadClass);
    req.open("GET", name);
    req.send();
}

function OpenFileByName(name)
{
    window.open(name);
}
