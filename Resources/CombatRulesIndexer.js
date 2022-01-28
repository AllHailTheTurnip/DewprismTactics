function PopulateIndex() {
    let newDirectory = ``;

    // Look through each <div>
    let content = document.getElementById("Content");
    /// Find first h2 and make an unordered list.
    let allH2 = content.getElementsByTagName("h2");

    for (let i = 0; i < allH2.length; i++) {
        // Get h2 ID and innerText.
        let h2 = allH2[i];
        let h2ID = "#" + h2.id;
        let h2InnerText = h2.innerText;

        newDirectory +=
            `<li>
                <a href="` + h2ID + `">` + h2InnerText + `</a>`;

        // Check for h3's beneath h2 until end is reached.
        //let h3FindStart =


        newDirectory += `</li>`;
    }


    /// Populate UL with h3's.
    /// Add ID and innerText to newDirectory.

    // Form new index.

    document.getElementById("Directory").innerHTML = newDirectory;
}