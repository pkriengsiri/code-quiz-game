// DOM Variables
var startButtonEl = document.getElementById("start-button");
var startContentEl = document.getElementById("start-content");
var quizContentEl = document.getElementById("quiz-content");
var timerEl = document.getElementById("timer");
var answerResultSectionEl = document.getElementById("answer-result-content");
var answerResultEl = document.getElementById("result-text");
var submitScoreEl = document.getElementById("submit-score");
var finalScoreEl = document.getElementById("final-score");
var initialsInputEl = document.getElementById("initials-input");
var submitScoreButtonEl = document.getElementById("submit-score");


// JS Variables
//quiz questions
var quizQuestion1 = {
  question: "Commonly used data types DO NOT include",
  answers: ["strings", "booleans", "alerts", "numbers"],
  correctAnswer: "alerts",
};

var quizQuestion2 = {
  question: "The condition in an if/ else statement is enclosed within ______.",
  answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  correctAnswer: "quotes",
};

var quizQuestion3 = {
  question: "Arrays in JavaScript can be used to store ______.",
  answers: [
    "numbers and strings",
    "other arrays",
    "booleans",
    "all of the above",
  ],
  correctAnswer: "all of the above",
};

var quizQuestion4 = {
  question:
    "String values must be enclosed within ______ when being assigned to variables.",
  answers: ["commas", "curly brackets", "quotes", "parenthesis"],
  correctAnswer: "quotes",
};

var quizQuestion5 = {
  question:
    "A very useful tool used during development and debugging for printing content to the debugger is:",
  answers: ["JavaScript", "terminal/ bash", "for loops", "console log"],
  correctAnswer: "console log",
};

var questionsArray = [
  quizQuestion1,
  quizQuestion2,
  quizQuestion3,
  quizQuestion4,
  quizQuestion5,
]; // array of quiz Questions
var questionIndex = 0; //tracks the current question
var secondsLeft = 150; //the time left in the quiz, starts at 150
var endOfQuiz = false; // tracks if all quiz questions have been answered
var resultTimer = 1; // number of seconds to display the answer result
var userScore = "";
var userInitials = "";
var scoresArray = [];

// Function Definitions

function startQuiz() {
  // Clear the starting content, start the clock, then show the first quiz question
  startContentEl.hidden = "true";
  startClock();
  showQuizQuestion(0);
}

function startClock() {
  var timerInterval = setInterval(function () {
    // Set the time and subtract each loop
    timerEl.textContent = secondsLeft;
    secondsLeft--;

    // Stop the clock if the quiz is over
    if (endOfQuiz) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function showQuizQuestion(index) {
  // Clear the box
  quizContentEl.innerHTML = "";

  //Create h1 for the question
  var h1El = document.createElement("h1");
  h1El.innerHTML = questionsArray[index].question;
  quizContentEl.append(h1El);

  //Create ul
  var ulEl = document.createElement("ul");
  ulEl.style = "list-style-type:none";
  quizContentEl.append(ulEl);

  //Create li for each question answer
  for (var i = 0; i < questionsArray[index].answers.length; i++) {
    //create li
    var liEl = document.createElement("li");
    liEl.classList.add("p-1");
    ulEl.append(liEl);

    //Create button for each li
    var buttonEl = document.createElement("button");
    var questionNumber = i + 1;
    buttonEl.classList.add("btn");
    buttonEl.classList.add("btn-primary");
    buttonEl.textContent =
      questionNumber + ". " + questionsArray[index].answers[i];
    liEl.append(buttonEl);
  }
}

function checkAnswer(answer) {
  // Check the submitted answer against the question objects correctAnswer value
  if (answer === questionsArray[questionIndex].correctAnswer) {
    // Run display function to alert user of answer result
    var result = true;
    displayResult(result);
  } else {
    // Run display function to alert user of answer result
    var result = false;
    displayResult(result);
    //subtract 10 seconds from time
    secondsLeft = secondsLeft - 10;
  }
}

function displayResult(result) {
  // Unhide the section
  answerResultSectionEl.hidden = false;

  if (result) {
    // Display text of previous answer result
    answerResultEl.textContent = "The previous answer was correct!";
  } else {
    // Display text of previous answer result
    answerResultEl.textContent =
      "The previous answer was incorrect!  Subtracted 10 seconds from your score!!";
  }

  //Clear the result after 1 second
  var timerInterval = setInterval(function () {
    if (resultTimer === 0) {
      clearInterval(timerInterval);
      answerResultSectionEl.hidden = true;
      answerResultEl.textContent = "";
    }

    resultTimer--;
  }, 1000);

  resultTimer = 1;
}

function processQuizAnswer(event) {
  if (event.target.matches("button")) {
    //Remove number from answer selection
    var answer = event.target.textContent.substring(3);

    // Condition to check if this is the last question
    if (questionIndex === questionsArray.length - 1) {
      checkAnswer(answer);
      endOfQuiz = true;
      // go to the final score tally
      endQuiz();
    } else {
      //process the answer
      checkAnswer(answer);
      //display the next question
      questionIndex++;
      showQuizQuestion(questionIndex);
    }
  }
}

function endQuiz() {
  // hide the last displayed quiz question
  quizContentEl.hidden = "true";
  // Show the quiz results content and user initials submission
  submitScoreEl.removeAttribute("hidden");
  finalScoreEl.textContent = secondsLeft;
}

function saveScore(event) {
    event.preventDefault();
    var userInitials = initialsInputEl.value;
    console.log("Initials is "+userInitials);
    var finalScore = finalScoreEl.textContent;
    console.log("Final Score is "+finalScore);
    var scoreAndInitials = finalScore + " " + userInitials;

    if(localStorage.getItem("saved-scores") === null) {
        // See if there are previous scores, if not store the score
        scoresArray.push(scoreAndInitials);
        localStorage.setItem("saved-scores",JSON.stringify(scoresArray));
    } else {
        // Get previous scores and store them in scoresArray, add the new score, then save in localStorage
        scoresArray = JSON.parse(localStorage.getItem("saved-scores"));
        scoresArray.push(scoreAndInitials);
        localStorage.setItem("saved-scores",JSON.stringify(scoresArray));
        console.log(scoresArray);
    }

    window.location.href = "./highscores.html";

}

// Function Calls

// Event listeners

startButtonEl.addEventListener("click", startQuiz);
quizContentEl.addEventListener("click", processQuizAnswer);
submitScoreButtonEl.addEventListener("submit", saveScore);

// Todo
// Add event listener for submit button
// Store initials and score in local storage
//  * remember values in local storage are string
//  * concatenate with delimiter
// Prevent default form behavior on submit
// Create high scores page
// Sort High Scores??
