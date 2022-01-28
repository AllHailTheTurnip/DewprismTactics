// Look for all of h2's and then all of the h3's, forming an index.

function PopulateIndex() {
    // Create empty variable "list" for replacing the index.
    let newIndex = ``;

    // Fill list with h2's and h3's.
    /// Iterate through all h2's and h3's.
    let allH2 = document.getElementsByTagName("h2");
    for (let i = 0; i < allH2.length; i++) {

        // Check if h2 has id - if not, don't add to index.
        let h2 = allH2[i];
        if (h2.id !== "") {
            let h2ID = "#" + h2.id;
            let h2Text = h2.innerText;
            newIndex += `
                <li>
                    <a href="` + h2ID + `">` + h2Text + `</a>
                </li>
                `;
        }
    }

    // Populate the index.
    document.getElementById("Index").innerHTML = newIndex;
}