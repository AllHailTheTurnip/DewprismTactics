async function GetWeaponsList() {
    return fetch("../Resources/AbilityMods.json").then(res => res.json());
}


async function InsertAbilityModsList(listId) {
    const list = await GetWeaponsList();
    let index = 0;
    let listLength = list.length;

    list.sort((a, b) => (a["Name"] > b["Name"]) ? 1 : -1);

    let domList = document.getElementById("AbilityModsBody");

    for (let i = 0; i < listLength; i++) {
        domList.innerHTML +=
            `
        <tr>
            <td>` + list[i]["Name"] + `</td> 
            <td>` + list[i]["Application"] + `</td> 
            <td>` + list[i]["Ingredients"] + `</td>
            <td>` + list[i]["Check"] + `</td>
        </tr>
        `;
    }
}

