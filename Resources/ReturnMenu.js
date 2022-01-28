function ImplementReturnMenu() {
    let body = document.getElementsByTagName("body")[0];

    body.innerHTML += `
<div class="Menu">
    <a href="../index.html">Return to Menu</a><br>
    <a href="#TopOfDocument">Return to Top</a>
</div>
`;
}
