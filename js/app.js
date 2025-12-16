/* =========================
  Who Wants To Be a Lord of Waterdeep?
========================= */

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
  questionTotalEl.textContent = String(TOTAL_QUESTIONS);
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
