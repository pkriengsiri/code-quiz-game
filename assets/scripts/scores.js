// DOM variables
var goBackButtonEl = document.getElementById("go-back");
var resetScoresButtonEl = document.getElementById("reset-scores");
var scoreListEl = document.getElementById("score-list");

// Variables
var scoresArray = []; // scores array with strings from localStorage
var scoresArrayInt = []; // scores array with scores converted to int for sorting

// Function definition

function returnToStart() {
  window.location.href = "./index.html";
}

function displayScores() {
  // Convert localStorage string to an array
  if (localStorage.getItem("saved-scores") === null) {
    emptyScoreDisplay();
  } else {
    scoresArray = JSON.parse(localStorage.getItem("saved-scores"));

    // Store existing object in scoresArrayInt w/ score stored as a number
    for (var i = 0; i < scoresArray.length; i++) {
      var scoreAndInitialsObj = { name: "", score: 0 };
      scoreAndInitialsObj.name = scoresArray[i].name;
      scoreAndInitialsObj.score = parseInt(scoresArray[i].score);
      scoresArrayInt.push(scoreAndInitialsObj);
    }

    // sort the scoresArrayInt array by score in descending order
    scoresArrayInt.sort(function (a, b) {
      return b.score - a.score;
    });

    // Write the scores to the screen
    for (var i = 0; i < scoresArrayInt.length; i++) {
      var liEl = document.createElement("li");
      var ranking = i + 1;
      liEl.textContent =
        ranking +
        ". " +
        scoresArrayInt[i].name +
        " - " +
        scoresArrayInt[i].score;
      liEl.classList.add("list-group-item");
      liEl.classList.add("list-group-item-action");
      liEl.classList.add("list-group-item-primary");
      scoreListEl.append(liEl);
    }
  }
}

function emptyScoreDisplay() {
  // Clear the scores
  scoreListEl.innerHTML = "";
  // Create a new line that says there are no scores to display
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
