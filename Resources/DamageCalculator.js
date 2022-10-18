const ranks = 8;

function LoadCookies()
{

}

function UpdateField(type) {
    let power = parseInt(document.getElementById(type + "Input").value);
    for (let i = 1; i <= ranks; i++) {

        if (isNaN(power))
            power = 0;

        let rank = (power * i);
        let field = document.getElementById(type + i.toString());
        field.innerText = rank;
    }

    document.cookie = `${type}Pwr=${power}`;
}

function CreateCalculationField(type) {
    let table = document.getElementById("DmgTable");
    let output = ``;

    output += `
<tr>
    <td>` + type + `</td>
    <td>
        <input type="text" style="width: 75%" id="` + type + "Input" + `" onchange='UpdateField("` + type.toString() + `")'>
    </td>
`;

    for (let i = 1; i <= ranks; i++) {
        output += `<td id="` + type + i.toString() + `"></td>`
    }

    output += `</tr>`;

    table.innerHTML += output;
}
