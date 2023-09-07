function BuildIndex()
{
    // Get all header elements on the page
    const headers = document.querySelectorAll("h1, h2");

// Create an empty index object
    const index = {};

// Iterate over the headers and add them to the index
    for (const header of headers) {
        // Get the header's id property
        const id = header.id;

        // Create a link to the header
        const link = document.createElement("a");
        link.href = "#" + id;
        link.textContent = header.textContent;

        // Add the link to the index
        index[id] = link;
    }

// Get the div element where the index will be printed
    const indexDiv = document.querySelector("#index");

// Iterate over the index and print the links to the div element
   /* for (const [id, link] of Object.entries(index)) {

    }*/
    for (let i = 0; i < headers.length; i++)
    {
        const header = headers[i];
        const [id, link] = index[i];

        console.log(id);

        if(header.localName == "h1") {
            const listItem = document.createElement("li");
            listItem.appendChild(link)
            indexDiv.appendChild(listItem);
            //indexDiv.appendChild();
        }
    }
}
