async function GetToolsList() {
    return fetch("../Resources/CraftableToolsList.json").then(res => res.json());
}


async function InsertToolsList(listId) {
    const list = await GetToolsList();
    let index = 0;
    let listLength = list.length;

    list.sort((a, b) => (a["Name"] > b["Name"]) ? 1 : -1);

    let domList = document.getElementById("CraftablesToolsListBody");

    for(let i = 0; i < listLength; i++)
    {
        domList.innerHTML +=
            `
        <tr>
            <td>` + list[i]["Name"] + `</td> 
            <td>` + list[i]["Application"] + `</td> 
            <td>` + list[i]["Ingredients"] + `</td> 
            <td>` + list[i]["CraftCheck"] + `</td>
            <td>` + list[i]["Value"] + `</td>
        </tr>
        `;
    }
}

