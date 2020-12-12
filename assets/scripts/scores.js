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
  if (localStorage.getItem("saved-scores") === null) {
    emptyScoreDisplay();
  } else {
    scoresArray = JSON.parse(localStorage.getItem("saved-scores"));
    scoresArray.sort();
    scoresArray.reverse();

    for (var i = 0; i < scoresArray.length; i++) {
      var liEl = document.createElement("li");
      var pair = scoresArray[i].split(" ");
      console.log(scoresArray[i]);
      console.log(pair);
      var questionNum = i + 1;
      liEl.textContent = questionNum + ". " + pair[1] + " - " + pair[0];
      liEl.classList.add("list-group-item");
      liEl.classList.add("list-group-item-action");
      liEl.classList.add("list-group-item-primary");
      console.log(liEl);
      scoreListEl.append(liEl);
    }
  }
}

function emptyScoreDisplay() {
    scoreListEl.innerHTML = "";
    var liEl = document.createElement("li");
    liEl.classList.add("list-group-item");
    liEl.classList.add("list-group-item-action");
    liEl.classList.add("list-group-item-primary");
    liEl.textContent = "No scores to display";
    scoreListEl.append(liEl);
}

function resetScores() {
  // Clear localStorage
  localStorage.clear();
  emptyScoreDisplay();
}

// Function calls
displayScores();

// Event handlers
goBackButtonEl.addEventListener("click", returnToStart);
resetScoresButtonEl.addEventListener("click", resetScores);
