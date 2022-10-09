const ranks = 8;

function UpdateField(type) {
    for (let i = 1; i <= ranks; i++) {
        let power = parseInt(document.getElementById(type + "Input").value);
        if (isNaN(power))
            power = 0;

        let rank = (power * i);
        let field = document.getElementById(type + i.toString());
        field.innerText = rank;
    }
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
