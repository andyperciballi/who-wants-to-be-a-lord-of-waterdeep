/* ========================= 
   DATA SOURCE
========================= */
/*
  QUESTION_BANK is our master list of questions imported from data.js.
  This array is treated as read-only and should never be mutated directly.
*/
const QUESTION_BANK = questions;

/* =========================
   CACHED ELEMENTS
========================= */
const startScreenEl = document.getElementById("start-screen");
const gameScreenEl = document.getElementById("game-screen");
const endScreenEl = document.getElementById("end-screen");

const startBtnEl = document.getElementById("start-button");
const restartBtnEl = document.getElementById("restart-btn");
const playAgainBtnEl = document.getElementById("play-again-btn");

const questionNumberEl = document.getElementById("question-number");
const questionTotalEl = document.getElementById("question-total");
const correctCountEl = document.getElementById("correct-count");
const strikeCountEl = document.getElementById("strike-count");
const categoryLabelEl = document.getElementById("category-label");

const questionTextEl = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");

const endTitleEl = document.getElementById("end-title");
const endMessageEl = document.getElementById("end-message");

/* =========================
   STATE   These variables represent the live state of the game:
  what question we’re on, how many answers are correct,
  and how many strikes the player has.
========================= */
let deck = [];
let currentIdx = 0;
let correct = 0;
let strikes = 0;

const WIN_TARGET = 5;
const STRIKE_LIMIT = 3;

/* =========================
   EVENT LISTENERS
   
  Any of these buttons start a fresh game.
  Guard checks prevent errors if elements don’t exist.
========================= */
if (startBtnEl) startBtnEl.addEventListener("click", initGame);
if (restartBtnEl) restartBtnEl.addEventListener("click", initGame);
if (playAgainBtnEl) playAgainBtnEl.addEventListener("click", initGame);

/* event delegation: listen once on the answers container and detect which answer button was clicked.*/
if (answersEl) {
  answersEl.addEventListener("click", onAnswerClick);
}

/* =========================
   INIT / RESET
========================= */
function initGame() {
  correct = 0;
  strikes = 0;
  currentIdx = 0;

  feedbackEl.textContent = "";

  deck = shuffleArray([...QUESTION_BANK]);
  questionTotalEl.textContent = deck.length;

  renderHud();
  showScreen("game");
  renderQuestion();
}

/* =========================
   RENDER
========================= */

/* Checking if there are any questions available
Pulling the current question from a deck array
Displaying the question text and category
Creating answer buttons for each possible answer
Resetting feedback and updating the HUD (score/progress) */
function renderHud() {
  questionNumberEl.textContent = deck.length ? currentIdx + 1 : 0;
  correctCountEl.textContent = correct;
  strikeCountEl.textContent = strikes;
}

function renderQuestion() {
  if (!deck.length) {
    questionTextEl.textContent =
      "No questions found. Check that data.js loads BEFORE app.js.";
    answersEl.innerHTML = "";
    categoryLabelEl.textContent = "—";
    return;
  }

  const q = deck[currentIdx];

  questionTextEl.textContent = q.question;
  categoryLabelEl.textContent = q.topic || "—";
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";

  q.possibleAnswers.forEach((ansText) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.dataset.answer = ansText;
    btn.textContent = ansText;
    answersEl.appendChild(btn);
  });

  renderHud();
}

/* =========================
   ANSWERS
========================= */
// feedback to the user telling the result of the answer and contributing to the game logic totals

function onAnswerClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const selected = btn.dataset.answer;
  const currentQ = deck[currentIdx];

  if (selected === currentQ.correctAnswer) {
    correct++;
    feedbackEl.textContent = "Correct!";
  } else {
    strikes++;
    feedbackEl.textContent = "Incorrect!";
  }

  if (correct >= WIN_TARGET) {
    endGame(true);
    return;
  }

  if (strikes >= STRIKE_LIMIT) {
    endGame(false);
    return;
  }

  currentIdx++;

  if (currentIdx < deck.length) {
    renderQuestion();
  } else {
    endGame(false);
  }
}

/* =========================
   SCREENS
========================= */
// this function removes the hidden class as the game progresses

function showScreen(which) {
  startScreenEl.classList.add("hidden");
  gameScreenEl.classList.add("hidden");
  endScreenEl.classList.add("hidden");

  if (which === "start") startScreenEl.classList.remove("hidden");
  if (which === "game") gameScreenEl.classList.remove("hidden");
  if (which === "end") endScreenEl.classList.remove("hidden");
}

/* =========================
   UTIL shuffles pseudo array so main one isn't affected
========================= */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* =========================
   START STATE
========================= */
showScreen("start");
questionTotalEl.textContent = QUESTION_BANK.length;

/* =========================
   END GAME
========================= */
function endGame(didWin) {
  endScreenEl.classList.remove("win", "lose");

  if (didWin) {
    endTitleEl.textContent = "You Win!";
    endMessageEl.textContent =
      "You answered 5 questions correctly. You have been granted the title of 'Lord of Waterdeep'!";
    endScreenEl.classList.add("win");
  } else {
    endTitleEl.textContent = "You Lose!";
    endMessageEl.textContent =
      "Three strikes! Your petition to join the Lords has failed.";
    endScreenEl.classList.add("lose");
  }

  showScreen("end");
}
