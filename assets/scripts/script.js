// DOM Variables
var startButtonEl = document.getElementById("start-button");
var startContentEl = document.getElementById("start-content");
var quizContentEl = document.getElementById("quiz-content");

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
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above",
  };

  var quizQuestion4 = {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  };

  var quizQuestion5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/ bash", "for loops", "console log"],
    correctAnswer: "console log",
  };

var questionsArray = [quizQuestion1,quizQuestion2,quizQuestion3,quizQuestion4,quizQuestion5]; // array of quiz Questions
var questionIndex = 0; //tracks the current question

// Function Definitions

function startQuiz() {
  // Clear the box and remove padding
  startContentEl.innerHTML = "";
  startContentEl.classList.remove("p-3");
  // Change center-aligned text to right-aligned
  showQuizQuestion(0);
}

function showQuizQuestion(index) {
  //clear the box
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

    //Create button
    var buttonEl = document.createElement("button");
    var questionNumber = i+1;
    buttonEl.textContent = questionNumber+". "+questionsArray[index].answers[i];
    liEl.append(buttonEl);
  }
}

function checkAnswer(answer) {
    if(answer === questionsArray[questionIndex].correctAnswer) {
        console.log("correct answer for question index "+questionIndex);
    } else {
        console.log("incorrect answer for question index "+questionIndex);
    }
}

function processQuizAnswer(event) {
    if (event.target.matches("button")) {
        console.log("Clicked on a quiz answer");
        //Remove number from answer selection
        var answer = event.target.textContent.substring(3);

        // Condition to check if this is the last question
        if(questionIndex === questionsArray.length -1) {
            checkAnswer(answer);
            // go to the final score tally
            alert("end of quiz");
        } else {
            //process the answer
            checkAnswer(answer);
            //display the next question
            questionIndex++;
            showQuizQuestion(questionIndex);
        }
    }
}

// Function Calls

// Event listeners

startButtonEl.addEventListener("click", startQuiz);
quizContentEl.addEventListener("click",processQuizAnswer);
