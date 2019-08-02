const characters = ["DOCTOR DOOM", "MAGNETO", "LOKI", "THANOS", "VENON", "MYSTIQUE", "WOLVERINE", "IRON MAN", "HULK", "DEADPOOL", "ELEKTRA", "INVISIBLE WOMAN"];

let characterToGuess; //the word picked by computer randomly
let guessingCharacter; // the word with correct letters
let guessedLetters; // letters entered incorrectly by user
let remainingGuesses; // number of remaining guesses for the user
let wins; // number of wins of the user
let firstTime = true;

function repeatChar(count) {
    var txt = "";
    for (var i = 0; i < count; i++) {
        txt += '_';
    }
    return txt;
}

function pickCharacter() {
    var index = Math.floor(Math.random() * characters.length);
    console.log(index, characters[index]);
    guessingCharacter = repeatChar(characters[index].length);
    console.log(guessingCharacter);
    return characters[index];
}

function checkLetter(letter) {
    if (!((letter >= "A" || letter <= "Z") || letter === " ")) {
        console.log(letter);
        return;
    }
    if (checkDuplicateLetter(letter)) {
        return;
    }
    let found = false;
    for (let i = 0; i < characterToGuess.length; i++) {
        if (letter === characterToGuess[i]) {
            guessingCharacter = setCharAt(guessingCharacter, i, letter);
            found = true;
            console.log(guessingCharacter, i);
        }
    }
    
    if (found === true) {
        //todo: play sound or beep 
        checkVictory();
    }
    else {
        guessedLetters = guessedLetters + letter;
        //todo: play sound or beep
        remainingGuesses--;
        checkGameOver();
    }
    updateFields();
}


function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function checkDuplicateLetter(letter) {
    for (let i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i] === letter) {
            // todo: play sound or beep
            return true;
        }
    }
    return false;
}

function checkVictory() {
    if (characterToGuess === guessingCharacter) {
        wins++;
        updateFields();
        startGame();
    }
}

function checkGameOver() {
    if (remainingGuesses === 0) {
        alert("You lose!");
        startGame();
    }
}

function startGame() {
    characterToGuess = pickCharacter();
    //console.log(characterToGuess);
    remainingGuesses = 10;
    guessedLetters = "";
    updateFields();
}


function updateFields() {
    document.getElementById("currentWord").innerText = guessingCharacter;
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key.toUpperCase();
    if (firstTime === true) {
        firstTime = false;
        wins = 0;
        startGame();
        return;
    };
    if (userGuess.length > 1){
        // user pressed invalid key (backspace, enter, delete)
        // ignore the invalid key
        // todo: beep or sound alarm        
        return;
    };
        
    checkLetter(userGuess);
};
// todo: insert time between right word and next game
