async function GetVehiclesList() {
    return fetch("../Resources/Vehicles.json").then(res => res.json());
}



async function InsertVehiclesList(listId) {
    let list = await GetVehiclesList();

    list.sort((a, b) => (a["Name"] > b["Name"]) ? 1 : -1);

    let index = 0;
    let listLength = list.length;

    let domList = document.getElementById("VehiclesDisp");

    for(let i = 0; i < listLength; i++)
    {
        domList.innerHTML +=
            `
        <tr>
            <td>` + list[i]["Name"] + `</td> 
            <td>` + list[i]["Desc"] + `</td> 
            <td>` + list[i]["Speed"] + `</td>
            <td>` + list[i]["Rate"] + `</td>
            <td>` + list[i]["Cost"] + `</td>
        </tr>
        `;
    }
}
