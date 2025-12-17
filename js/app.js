/* =========================
   DATA SOURCE 
========================= */
const QUESTION_BANK =
  (typeof questions !== "undefined" ? questions : []) || [];

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
   STATE
========================= */
let deck = [];
let currentIdx = 0;
let correct = 0;
let strikes = 0;

const WIN_TARGET = 5;
const STRIKE_LIMIT = 3;
questionTotalEl.textContent = deck.length;


/* =========================
   EVENT LISTENERS
   (All route into initGame)
========================= */
if (startBtnEl) startBtnEl.addEventListener("click", initGame);
if (restartBtnEl) restartBtnEl.addEventListener("click", initGame);
if (playAgainBtnEl) playAgainBtnEl.addEventListener("click", initGame);

// dynamic answers -> event delegation
answersEl.addEventListener("click", onAnswerClick);

/* =========================
   INIT / RESET
========================= */
function initGame() {
  // Reset state
  correct = 0;
  strikes = 0;
  currentIdx = 0;
  feedbackEl.textContent = "";

  // Fresh shuffled deck
  deck = shuffleArray([...QUESTION_BANK]);

  // Update HUD totals
  questionTotalEl.textContent = deck.length;
  renderHud();

  // Show game screen
  showScreen("game");

  // Render first question
  renderQuestion();
}

/* =========================
   RENDER
========================= */
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

  // build answers
  answersEl.innerHTML = "";

  q.possibleAnswers.forEach((ansText) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.dataset.answer = ansText; // store the exact answer text
    btn.textContent = ansText;
    answersEl.appendChild(btn);
  });

  renderHud();
}

/* =========================
   ANSWER CLICK
========================= */
function onAnswerClick(evt) {
  const btn = evt.target.closest("button");
  if (!btn) return;
  if (!btn.classList.contains("answer-btn")) return;

  const chosenAnswer = btn.dataset.answer;
  const q = deck[currentIdx];

  const isCorrect = chosenAnswer === q.correctAnswer;

  if (isCorrect) {
    correct++;
    feedbackEl.textContent = "Correct!";
  } else {
    strikes++;
    feedbackEl.textContent = "Wrong!";
  }

  renderHud();

  // Win / Lose
  if (correct >= WIN_TARGET) return endGame(true);
  if (strikes >= STRIKE_LIMIT) return endGame(false);

  // Next question (delay so feedback shows)
  setTimeout(() => {
    currentIdx++;

    if (currentIdx >= deck.length) {
      // ran out of questions before win/lose
      endGame(false, "Out of questions!");
      return;
    }

    renderQuestion();
  }, 450);
}

/* =========================
   END GAME
========================= */
function endGame(didWin, customMessage) {
  if (didWin) {
    endTitleEl.textContent = "You Win!";
    endMessageEl.textContent =
      customMessage || "You reached 5 correct answers. Glory to Waterdeep!";
  } else {
    endTitleEl.textContent = "You Lose!";
    endMessageEl.textContent =
      customMessage || "Three strikes. The Lords are not amused.";
  }

  showScreen("end");
}

/* =========================
   SCREENS
========================= */
function showScreen(which) {
  startScreenEl.classList.add("hidden");
  gameScreenEl.classList.add("hidden");
  endScreenEl.classList.add("hidden");

  if (which === "start") startScreenEl.classList.remove("hidden");
  if (which === "game") gameScreenEl.classList.remove("hidden");
  if (which === "end") endScreenEl.classList.remove("hidden");
}

/* =========================
   UTIL
========================= */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* =========================
   START ON START SCREEN
========================= */
showScreen("start");
questionTotalEl.textContent = QUESTION_BANK.length;

function endGame(didWin) {
  endScreenEl.classList.remove("win", "lose");

  if (didWin) {
    endTitleEl.textContent = "You Win!";
    endMessageEl.textContent =
      "You answered 5 questions correctly. The Lords of Waterdeep approve.";

    endScreenEl.classList.add("win");
  } else {
    endTitleEl.textContent = "You Lose!";
    endMessageEl.textContent =
      "Three strikes! Your petition to the Lords has failed.";

    endScreenEl.classList.add("lose");
  }

  showScreen("end");
}
