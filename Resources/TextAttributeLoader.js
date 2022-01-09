const prefix = "Abt";

function GetTxtAttribute(attr) {

    const suffix = ':'
    const endl = '|';

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

function onLoadClass()
{
    accessedFile = this.response;

    var Title = "Title";
    var Subtitle = "Subtitle";
    var Description = "Description"
    var Health = "Health";
    var Stamina = "Stamina";
    var Mana = "Mana";
    var Focus = "Focus";
    var Movement = "Movement";
    var Carry = "Carry";
    var Element = "Element";
    var Melee = "Melee";
    var Magic = "Magic";
    var Skill = "Skill";


    document.getElementById(Title).innerHTML = GetTxtAttribute(Title);
    document.getElementById(Subtitle).innerHTML = GetTxtAttribute(Subtitle);
    document.getElementById(Stamina).innerText = GetTxtAttribute(Stamina);
    document.getElementById(Health).innerText = GetTxtAttribute(Health);
    document.getElementById(Mana).innerText = GetTxtAttribute(Mana);
    document.getElementById(Focus).innerText = GetTxtAttribute(Focus);
    document.getElementById(Movement).innerText = GetTxtAttribute(Movement);
    document.getElementById(Carry).innerText = GetTxtAttribute(Carry);
    document.getElementById(Element).innerText = GetTxtAttribute(Element);
    document.getElementById(Melee).innerText = GetTxtAttribute(Melee);
    document.getElementById(Magic).innerText = GetTxtAttribute(Magic);
    document.getElementById(Skill).innerText = GetTxtAttribute(Skill);
    document.getElementById(Description).innerHTML = GetTxtAttribute(Description);
    document.getElementById("Innate").innerText = GetTxtAttribute("Innate");
    document.getElementById("A1").innerText = GetTxtAttribute("A1");
    document.getElementById("A2").innerText = GetTxtAttribute("A2");
    document.getElementById("A3").innerText = GetTxtAttribute("A3");
    document.getElementById("A4").innerText = GetTxtAttribute("A4");
    document.getElementById("A5").innerText = GetTxtAttribute("A5");
    document.getElementById("A6").innerText = GetTxtAttribute("A6");
    document.getElementById("A7").innerText = GetTxtAttribute("A7");
    document.getElementById("A8").innerText = GetTxtAttribute("A8");
    document.getElementById("A9").innerText = GetTxtAttribute("A9");
    document.getElementById("A10").innerText = GetTxtAttribute("A10");
    document.getElementById("MA1").innerText = GetTxtAttribute("MA1");
    document.getElementById("MA2").innerText = GetTxtAttribute("MA2");
    document.getElementById("MA3").innerText = GetTxtAttribute("MA3");
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