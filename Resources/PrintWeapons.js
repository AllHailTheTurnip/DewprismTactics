async function GetWeaponsList() {
    return fetch("../Resources/WeaponsList.json").then(res => res.json());
}


async function InsertWeaponsList(listId) {
    const list = await GetWeaponsList();
    let index = 0;
    let listLength = list.length;

    let domList = document.getElementById("CraftablesWeaponsListBody");

    for (let i = 0; i < listLength; i++) {
        domList.innerHTML +=
            `
        <tr>
            <td>` + list[i]["Name"] + `</td> 
            <td>` + list[i]["Application"] + `</td> 
            <td>` + list[i]["Ingredients"] + `</td>
            <td>` + list[i]["Check"] + `</td>  
            <td>` + list[i]["Value"] + `</td>
        </tr>
        `;
    }
}

