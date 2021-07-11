function onLoad() {
    clsTmp = this.response;
document.getElementById()
    /* function getSection(id) {

        var iA = clsTmp.indexOf(id);
        if (iA == -1) {
            return "NA";
        }


        var iB = clsTmp.indexOf("@", iA);
        var iC = clsTmp.indexOf("|", iB);
        var subA = clsTmp.substring(iB, iC);
        subA = subA.replaceAll("|", "");
        subA = subA.replaceAll("@", "");

        return subA;
    }

        var Title = "!Title";
        var Subtitle = "!Subtitle";
        var Description = "!Description"
        var Health = "!Health";
        var Stamina = "!Stamina";
        var Mana = "!Mana";
        var Focus = "!Focus";
        var Movement = "!Movement";
        var Carry = "!Carry";
        var Element = "!Element";
        var Melee = "!Melee";
        var Mic = "!Magic";
        var Skill = "!Skill";


        document.getElementById(Title).innerHTML = getSection(Title);
        document.getElementById(Subtitle).innerHTML = getSection(Subtitle);
        document.getElementById(Stamina).innerText = getSection(Stamina);
        document.getElementById(Health).innerText = getSection(Health);
        document.getElementById(Mana).innerText = getSection(Mana);
        document.getElementById(Focus).innerText = getSection(Focus);
        document.getElementById(Movement).innerText = getSection(Movement);
        document.getElementById(Carry).innerText = getSection(Carry);
        document.getElementById(Element).innerText = getSection(Element);
        document.getElementById(Melee).innerText = getSection(Melee);
        document.getElementById(Magic).innerText = getSection(Magic);
        document.getElementById(Skill).innerText = getSection(Skill);
        document.getElementById(Description).innerHTML = getSection(Description);
        document.getElementById("Innate").innerText = getSection("Innate");
        document.getElementById("A1").innerText = getSection("A1");
        document.getElementById("A2").innerText = getSection("A2");
        document.getElementById("A3").innerText = getSection("A3");
        document.getElementById("A4").innerText = getSection("A4");
        document.getElementById("A5").innerText = getSection("A5");
        document.getElementById("A6").innerText = getSection("A6");
        document.getElementById("A7").innerText = getSection("A7");
        document.getElementById("A8").innerText = getSection("A8");
        document.getElementById("A9").innerText = getSection("A9");
        document.getElementById("A10").innerText = getSection("A10");
        document.getElementById("MA1").innerText = getSection("MA1");
        document.getElementById("MA2").innerText = getSection("MA2");
        document.getElementById("MA3").innerText = getSection("MA3");
    */

}

function GetClass(classLink) {
    document.getElementById("Template").style.display = "inline";

    var req = new XMLHttpRequest();
    req.addEventListener("load", onLoad);
    req.open("GET", classLink);
    req.send();
}

