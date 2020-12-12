// DOM variables
var goBackButtonEl = document.getElementById("go-back");
var resetScoresButtonEl = document.getElementById("reset-scores");
var scoreListEl = document.getElementById("score-list");

// Variables
var scoresArray;

// Function definition

function returnToStart() {
    window.location.href = "./index.html";
}

function displayScores() {
    scoresArray = JSON.parse(localStorage.getItem("saved-scores"));
    scoresArray.sort();
    
    
}

// Function calls
displayScores();

// Event handlers

