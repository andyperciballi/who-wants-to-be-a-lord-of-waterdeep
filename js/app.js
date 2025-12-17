/* =========================
  Who Wants To Be a Lord of Waterdeep?
========================= */


/*
+ See simple instructions at the start so I know how the game works 
+ Have a start button and see instructions for the trivia game
+ See a theme, wording, and UI to feel like Dungeons & Dragons so playing feels immersive
+ Be presented with a clear question with multiple-choice answers
+ Have my progress (question number out of 8) shown so I know how far I’ve advanced in the challenge. this could be displayed with various UI features or elements
+ See immediate feedback when I choose an answer so I know whether I was correct or not
+ See my remaining failed attempts displayed
+ See a loss screen if I reach 3 wrong answers so I understand the game is over. 
+ See a win screen if I correctly answer 5/8 questions 
+ Have a restart button if I win or los /* 


/* ---------- Constants ---------- */
// Win / Loss thresholds
const winTarget = 5;
const maxStrikes = 3;
const totalQuestions = 10;

/* ---------- Cached Elements ---------- */
// Start screen
const startScreenEl = document.querySelector("#start-button");
const startBtnEl = document.querySelector("#start-button");

// Game screen
const gameScreenEl = document.querySelector("#game-screen");
const questionTextEl = document.querySelector("#question-text");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
 
const questionNumberEl = document.querySelector("#question-number");
const questionTotalEl = document.querySelector("#question-total");
const correctCountEl = document.querySelector("#correct-count");
const strikeCountEl = document.querySelector("#strike-count");
const categoryLabelEl = document.querySelector("#category-label");

const restartBtnEl = document.querySelector("#restart-btn");

// End screen
const endScreenEl = document.querySelector("#end-screen");
const endTitleEl = document.querySelector("#end-title");
const endMessageEl = document.querySelector("#end-message");
const playAgainBtnEl = document.querySelector("#play-again-btn");

let correctCount;
let strikeCount;
let questionsAsked;
let usedQuestionIndexes; // prevent repeats in a single run
let currentQuestion; // question object currently on screen

/* ---------- Functions ---------- */
init();

function init() {
  // 1) Reset state
  correctCount = 0;
  strikeCount = 0;
  questionsAsked = 0;
  usedQuestionIndexes = [];
  currentQuestion = null;

  // 2) Reset UI text
  feedbackEl.textContent = "";
  correctCountEl.textContent = "0";
  strikeCountEl.textContent = "0";
  questionNumberEl.textContent = "0";
  questionTotalEl.textContent = questions.length
  categoryLabelEl.textContent = "—";

  // 3) Show start screen, hide others
  showScreen("start");
}

function startGame() {
  // 1) Show game screen
  showScreen("game");

  // 2) Load first question
  // TODO: getRandomQuestion()
  // TODO: renderQuestion()
}

function showScreen(screenName) {
  // Hide everything first
  startScreenEl.classList.add("hidden");
  gameScreenEl.classList.add("hidden");
  endScreenEl.classList.add("hidden");

  // Then show what we want
  if (screenName === "start") startScreenEl.classList.remove("hidden");
  if (screenName === "game") gameScreenEl.classList.remove("hidden");
  if (screenName === "end") endScreenEl.classList.remove("hidden");
}


/* ---------- Event Listeners ---------- */
startBtnEl.addEventListener("click", startGame);
restartBtnEl.addEventListener("click", init);
playAgainBtnEl.addEventListener("click", init);


// TODO: function getRandomQuestion() {}
// TODO: function renderQuestion() {}
// TODO: function handleAnswerClick(evt) {}
// TODO: function checkWinLoss() {}
// TODO: function endGame(isWin) {}



// below this is a test
// pull a random question and display ---to the user and start tracking 

function handleQuestion () {
  //questions.array.forEach(question => {
questionTextEl.textContent = questions[1]["question"]

  //});
}

handleQuestion()  