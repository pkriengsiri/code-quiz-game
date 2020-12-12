// DOM Variables
var startButtonEl = document.getElementById("start-button");
var quizContentEl = document.getElementById("quiz-content");

// JS Variables
var quizQuestion1 = {
  question: "Commonly used data types DO NOT include",
  answers: ["strings", "booleans", "alerts", "numbers"],
  correctAnswer: "alerts",
};

var questionsArray = [quizQuestion1]; // array of quiz Questions

// Function Definitions

function startQuiz() {
  // Clear the box
  quizContentEl.innerHTML = "";
  // Change center-aligned text to right-aligned
  quizContentEl.classList.remove("text-center");
  quizContentEl.classList.add("text-right");
  quizContentEl.classList.add("p-5");
  showQuizQuestion(0);
}

function showQuizQuestion(index) {
  //clear the box
  quizContentEl.innerHTML = "";
  
  //Create h1 for the question
  var h1El = document.createElement("h1");
  h1El.innerHTML = questionsArray[index].question;
  quizContentEl.append(h1El);
  
  //Create ol
  var olEl = document.createElement("ol");
  quizContentEl.append(olEl);
  
  //Create li for each question answer
  for (var i = 0; i < questionsArray[index].answers.length; i++) {
    //create li
    var liEl = document.createElement("li");
    olEl.append(liEl);

    //Create button
    var buttonEl = document.createElement("button");
    buttonEl.textContent = questionsArray[index].answers[i];
    liEl.append(buttonEl);
  }
}

function processQuizAnswer() {}

// Function Calls

// Event listeners

startButtonEl.addEventListener("click", startQuiz);
