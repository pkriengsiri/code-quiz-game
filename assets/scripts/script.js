// DOM Variables
var startButtonEl = document.getElementById("start-button");
var startContentEl = document.getElementById("start-content");
var quizContentEl = document.getElementById("quiz-content");
var timerEl = document.getElementById("timer");
var answerResultSectionEl = document.getElementById("answer-result-content");
var answerResultEl = document.getElementById("result-text");
var submitScoreEl = document.getElementById("submit-score");
var finalScoreEl = document.getElementById("final-score");


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
var secondsLeft = 150; //the time left in the quiz, starts at 150
var endOfQuiz = false; // tracks if all quiz questions have been answered
var resultTimer = 1; // number of seconds to display the answer result

// Function Definitions

function startQuiz() {
  // Clear the box and remove padding
  startContentEl.hidden = "true";
  //startContentEl.classList.remove("p-3");
  // Change center-aligned text to right-aligned
  startClock();
  showQuizQuestion(0);
}

function startClock() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft;
  
      if(endOfQuiz) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
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
    buttonEl.classList.add("btn");
    buttonEl.classList.add("btn-primary");
    buttonEl.textContent = questionNumber+". "+questionsArray[index].answers[i];
    liEl.append(buttonEl);
  }
}

function checkAnswer(answer) {
    if(answer === questionsArray[questionIndex].correctAnswer) {
        var result = true;
        displayResult(result);
    } else {
        //display incorrect
        var result = false;
        displayResult(result);
        //subtract 10 points
        secondsLeft = secondsLeft - 10;
    }
}

function displayResult(result) {
    //unhide the section
    answerResultSectionEl.hidden = false;

    if(result) {
      answerResultEl.textContent ="The previous answer was correct!"
  } else {
      answerResultEl.textContent ="The previous answer was incorrect!  Subtracted 10 seconds from your score!!"
  }
    var timerInterval = setInterval(function() {

        if(resultTimer === 0) {
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
        if(questionIndex === questionsArray.length -1) {
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
    quizContentEl.hidden = "true";
    submitScoreEl.removeAttribute("hidden");
    finalScoreEl.textContent = secondsLeft;
}

// Function Calls

// Event listeners

startButtonEl.addEventListener("click", startQuiz);
quizContentEl.addEventListener("click",processQuizAnswer);

// Todo
// Add event listener for submit button
// Store initials and score in local storage
//  * remember values in local storage are string
//  * concatenate with delimiter
// Prevent default form behavior on submit
// Create high scores page
