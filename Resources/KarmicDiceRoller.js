// Karmic Dice
// Creates an array of integers 1-X, which are shuffled.
// Increasing weight increases chance of getting same number more than once in a row.
// You can set showResult to false if you just want to generate a random number.
// You can call roll remotely, even if you don't want to inject the button into your page.
const faces = 20;
const multiples = 2;
const showResult = true;
let results = [];
let index = 0;
let presentResult;

// Populate the array.
let totalResults = faces * multiples;
let absoluteSum = 0;
for (let i = 0; i < totalResults; i++) {
    let value = (i % faces) + 1;
    results.push(value);

    absoluteSum += value;
}

// Adds the dice roller to the element 'KarmicDiceRoller'.
function InjectKarmicDiceRollerIntoElement() {
    const divider = document.getElementById('KarmicDiceRoller');
    divider.innerHTML =
        `
        Dice Roller.
        <br>
        <button onclick="RollKarmicDice()">Roll</button>
        <button onclick="RollKarmicDiceWithExcellence()" title="Roll twice and keep the higher">Roll with Excellence</button>
        <p id="KarmicDiceResult"></p>
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

// Assigns the result variable to the page.
function SetResults(result) {
    document.getElementById("KarmicDiceResult").innerHTML = result;
}

// Proves that the method works by adding all the possible results together
// and comparing.
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

// Draws the next result from the bag, reshuffling once every result has been used.
function DrawKarmicDie() {
    let singleRoll = results[index];
    index++;

    // Reset when all results have been used.
    if (index === results.length) {
        index = 0;
        ShuffleResults();
    }

    return singleRoll;
}

function RollKarmicDice() {
    let singleRoll = DrawKarmicDie();
    presentResult = singleRoll;

    // Update the page with the result.
    if (showResult)
        SetResults(singleRoll);

    return singleRoll;
}

// Excellence (replaces advantage on checks): roll the check twice and take the higher.
// Both rolls come from the same karmic bag, as they do in the game.
function RollKarmicDiceWithExcellence() {
    let first = DrawKarmicDie();
    let second = DrawKarmicDie();
    let kept = Math.max(first, second);
    presentResult = kept;

    if (showResult)
        SetResults(kept + " <small>(rolled " + first + " and " + second + ")</small>");

    return kept;
}

// Automatically shuffles the results at the beginning.
ShuffleResults();




