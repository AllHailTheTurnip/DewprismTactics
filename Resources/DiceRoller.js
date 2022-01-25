// Karmic Dice
// Creates an array of integers 1-20, which are shuffled.
// Increasing weight increases chance of getting same number more than once in a row.
const faces = 20;
const multiples = 2;
let results = [];
let index = 0;

// Populate the array.
let totalResults = faces * multiples;
let absoluteSum = 0;
for (let i = 0; i < totalResults; i++) {
    let value = (i % faces) + 1;
    results.push(value);

    absoluteSum += value;
}

function InjectIntoElement() {
    const divider = document.getElementById('DiceRoller');
    divider.innerHTML =
        `
        Dice Roller.
        <br>
        <button onclick="Roll()">Roll</button>
        <p id="result"></p>
        `;
}

function ShuffleResults() {
    let randResult = [];
    for (let i = 0; i < totalResults; i++) {

        // Pull a random number from the array.
        let randIndex = Math.floor(Math.random() * results.length);
        let grab = results[randIndex];

        // Add it to the new array.
        randResult.push(grab);

        // Remove it from the old array.
        results.splice(randIndex, 1);
    }

    // Make results into randResult.
    results = randResult;
}

function SetResults(result) {
    document.getElementById("result").innerHTML = result;
}

function ShuffleTest() {
    ShuffleResults();

    // Print out results.
    let output = "";
    for (let i = 0; i < totalResults; i++) {
        output += results[i] + "<br>";
    }

    // Check for duplicates.
    let comparisonSum = 0;
    for (let i = 0; i < totalResults; i++) {
        comparisonSum += results[i];
    }

    output += "Total: " + absoluteSum + "/" + comparisonSum;


    SetResults(output);
}

function Roll() {
    let singleRoll = results[index];
    index++;

    if (index === results.length) {
        index = 0;
        ShuffleResults();
    }

    SetResults(singleRoll);
}

ShuffleResults();




