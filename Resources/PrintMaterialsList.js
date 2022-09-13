async function GetMaterialsList() {
    return fetch("../Resources/Materials.json").then(res => res.json());
}


async function InsertMaterialsList(listId) {
    const list = await GetMaterialsList();
    let index = 0;
    let listLength = list.length;

    let domList = document.getElementById("CraftablesMaterialsBody");

    for(let i = 0; i < listLength; i++)
    {
        domList.innerHTML +=
            `
        <tr>
            <td>` + list[i]["Name"] + `</td> 
            <td>` + list[i]["RawApplication"] + `</td> 
            <td>` + list[i]["Value"] + `</td>
        </tr>
        `;
    }
}
