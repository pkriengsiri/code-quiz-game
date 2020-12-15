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
var quizQuestion1 = {
  question: "Commonly used data types DO NOT include",
  answers: ["strings", "booleans", "alerts", "numbers"],
  correctAnswer: "alerts",
};

var quizQuestion2 = {
  question: "The condition in an if/ else statement is enclosed within ______.",
  answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  correctAnswer: "parenthesis",
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

var quizQuestion6 = {
  question:
    "The web API localStorage object stores keys and values in what variable type:",
  answers: ["numbers", "arrays", "objects", "strings"],
  correctAnswer: "strings",
};

var quizQuestion7 = {
  question:
    "The concept of assigning an event handler in dynamic content to multiple elements as opposed to a single element, then delegating to a single element upon event is known as:",
  answers: ["batching", "event delegation", "multi-tasking", "isolation"],
  correctAnswer: "event delegation",
};

var quizQuestion8 = {
  question:
    "The acronymic for the object representation of a webpage, DOM, stands for:",
  answers: [
    "doorway opening mechanism",
    "digital orientation method",
    "document object model",
    "device operation manual",
  ],
  correctAnswer: "document object model",
};

var quizQuestion9 = {
  question: "Bootstrap is an example of a CSS ______ :",
  answers: ["language", "framework", "interpreter", "console"],
  correctAnswer: "framework",
};

var quizQuestion10 = {
  question: "The starting index value for an array in JavaScript is ______ :",
  answers: ["null", "void", "0", "1"],
  correctAnswer: "0",
};

var questionsArray = [
  quizQuestion1,
  quizQuestion2,
  quizQuestion3,
  quizQuestion4,
  quizQuestion5,
  quizQuestion6,
  quizQuestion7,
  quizQuestion8,
  quizQuestion9,
  quizQuestion10,
]; // array of quiz Questions

var questionIndex = 0; //tracks the current question
var secondsLeft = 200; //the time left in the quiz, starts at 150
var endOfQuiz = false; // tracks if all quiz questions have been answered
var resultTimer = 1; // number of seconds to display the answer result
var userScore = ""; // stores the final user score
var userInitials = ""; //stores the user initials
var scoresArray = []; // stores the user initial/ score pairs so they can be used by localStorage
var scoresArrayObj = []; // stores the user initial/ score pairs so they can be used by localStorage

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
    buttonEl.classList.add("btn-info");
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
  var finalScore = finalScoreEl.textContent;
  var scoreAndInitialsObj = { name: "", score: 0 };

  scoreAndInitialsObj.name = userInitials;
  scoreAndInitialsObj.score = finalScore;

  if (localStorage.getItem("saved-scores") === null) {
    // See if there are previous scores, if not store the score
    scoresArrayObj.push(scoreAndInitialsObj);
    localStorage.setItem("saved-scores", JSON.stringify(scoresArrayObj));
  } else {
    // Get previous scores and store them in scoresArray, add the new score, then save in localStorage
    scoresArrayObj = JSON.parse(localStorage.getItem("saved-scores"));
    scoresArrayObj.push(scoreAndInitialsObj);
    localStorage.setItem("saved-scores", JSON.stringify(scoresArrayObj));
  }

  window.location.href = "./highscores.html";
}

// Function Calls

// Event listeners

startButtonEl.addEventListener("click", startQuiz);
quizContentEl.addEventListener("click", processQuizAnswer);
submitScoreButtonEl.addEventListener("submit", saveScore);
