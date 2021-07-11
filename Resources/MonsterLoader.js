const prefix = "Abt";

function onLoad() {
    monster = this.response;

    function GetTxtAttribute(attr) {

        const suffix = ':'
        const endl = '|';

        attr = attr + suffix;

        // Marks beginning of line.
        const ndxStart = monster.indexOf(attr) + attr.length;

        // Marks end of line.
        ndxEnd = monster.indexOf(endl, ndxStart);

        attr = monster.substring(ndxStart, ndxEnd);

        return attr;
    }

    function SetHTMLByID(id) {
        document.getElementById(prefix + id).innerHTML = GetTxtAttribute(id);
    }

    // Biography.
    SetHTMLByID("Name");
    SetHTMLByID("Level");
    SetHTMLByID("Code");
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
    SetHTMLByID("Movement");
    SetHTMLByID("Carry");
    SetHTMLByID("PrimaryDamage");
    SetHTMLByID("SecondaryDamage");

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
    SetHTMLByID("Entertain");

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

function LoadByFileName(name) {
    var req = new XMLHttpRequest();
     req.addEventListener("load", onLoad);
     req.open("GET", name);
     req.send();
}

function OpenFileByName(name)
{
    window.open(name);
}