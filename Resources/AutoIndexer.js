// Looks for a table-row and then a table-header.
// It adds the contents of the table-header to the index as a link.


let finalIndex = ``;

function AddLinkToIndex(text, tag) {
    finalIndex +=
        `
        <li>
            <a href="` + tag + `">` + text + `</a>
        </li>
        `;
}

function GetTableRowIDAtIndex(index) {
    return document.getElementsByTagName("tr")[index].id;
}

function GetTHInnerTextFromTableRowAtIndex(index)
{
    const TR0 = document.getElementsByTagName("tr")[index];
    return TR0.getElementsByTagName("th")[0].innerText;
}
function CheckIfTHIsValid(index)
{
    let TR = document.getElementsByTagName("tr")[index];
    let hasTH = TR.getElementsByTagName("th")[0] !== undefined;
    return TR.id !== "" && hasTH;
}

function PopulateIndex() {

    let totalTableHeaders = document.getElementsByTagName("tr").length;
    for(let i =0; i < totalTableHeaders; i++)
    {
        // Skip if undefined.
        if(CheckIfTHIsValid(i) === true)
        {
            let trIDx = '#' + GetTableRowIDAtIndex(i);
            let trInnerTextx = GetTHInnerTextFromTableRowAtIndex(i);

            AddLinkToIndex(trInnerTextx, trIDx);
        }
    }


    document.getElementById('Index').innerHTML = finalIndex;

    //document.getElementById('Index').innerHTML = totalTableHeaders;
}


