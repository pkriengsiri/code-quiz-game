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
    
    for(var i = 0; i < scoresArray.length; i++) {
        var liEl = document.createElement("li");
        var pair = scoresArray[i].split(" ");
        console.log(scoresArray[i]);
        console.log(pair);
        liEl.textContent = pair[1]+" - "+pair[0];
        liEl.classList.add("list-group-item");
        liEl.classList.add("list-group-item-action");
        liEl.classList.add("list-group-item-primary");
        console.log(liEl);
        scoreListEl.append(liEl);
    }
}

function resetScores () {
    // Clear localStorage
    storage.clear();

}

// Function calls
displayScores();

// Event handlers
goBackButtonEl.addEventListener("click",returnToStart);
