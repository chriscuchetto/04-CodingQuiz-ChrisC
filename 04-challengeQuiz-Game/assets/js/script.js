let quizBody = document.getElementById("quiz");
let resultsEl = document.getElementById("result");
let finalScoreEl = document.getElementById("finalScore");
let gameoverDiv = document.getElementById("gameover");
let questionsEl = document.getElementById("questions");
let quizTimer = document.getElementById("timer");
let startQuizButton = document.getElementById("startbtn");
let startQuizDiv = document.getElementById("startpage");
let highscoreContainer = document.getElementById("highscoreContainer");
let highscoreDiv = document.getElementById("high-scorePage");
let highscoreInputName = document.getElementById("initials");
let highscoreDisplayName = document.getElementById("highscore-initials");
let endGameBtns = document.getElementById("endGameBtns");
let submitScoreBtn = document.getElementById("submitScore");
let highscoreDisplayScore = document.getElementById("highscore-score");
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

// Quiz question object
let quizQuestions = [{
    
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Dried Onion Meat",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
    {
        question: "What is mainly used to style to a web site?",
        choiceA: "HTML",
        choiceB: "CSS",
        choiceC: "JQuery",
    choiceD: "JavaScript",
    correctAnswer: "b"},
    
    {
        question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"},  
    
    
    
    
];
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 15;
let timerInterval;
let score = 0;
let correct;


// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
        
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
        
    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Function clears the local storage of the high scores
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Function resets all variables
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 15;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);