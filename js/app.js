/* =========================
   DATA SOURCE
========================= */
// QUESTION_BANK is our master list of questions imported from data.js.
// This array is treated as read-only;
const QUESTION_BANK = questions;

/* =========================
   CACHED ELEMENTS
========================= */
// These variables cache references to DOM elements so we don’t have to
// keep calling document.getElementById repeatedly (faster + cleaner).
const startScreenEl = document.getElementById("start-screen");
const gameScreenEl = document.getElementById("game-screen");
const endScreenEl = document.getElementById("end-screen");

// Button elements from each screen.
const startBtnEl = document.getElementById("start-button");
const restartBtnEl = document.getElementById("restart-btn");
const playAgainBtnEl = document.getElementById("play-again-btn");

// HUD elements: these are the little pieces of text that change as the game runs.
const questionNumberEl = document.getElementById("question-number");
const questionTotalEl = document.getElementById("question-total");
const correctCountEl = document.getElementById("correct-count");
const strikeCountEl = document.getElementById("strike-count");
const categoryLabelEl = document.getElementById("category-label");

// Main content elements: where the question, answers, and feedback show up.
const questionTextEl = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");

// End screen elements: these are updated depending on win vs lose.
const endTitleEl = document.getElementById("end-title");
const endMessageEl = document.getElementById("end-message");

/* =========================
   STATE
========================= */
// These variables represent the "live state" of the game.
// State is basically: “what is currently true about the game right now?”
let deck = [];        // deck is the shuffled copy of questions for the current run.
let currentIdx = 0;   // tracks which question number we are on in the deck.
let correct = 0;      // how many correct answers the player has so far.
let strikes = 0;      // how many wrong answers the player has so far.

// Win/Lose rules (game conditions).
const WIN_TARGET = 5;      // you win once you hit 5 correct.
const STRIKE_LIMIT = 3;    // you lose once you hit 3 strikes.

// This sets the question total text in the HUD to the current deck length.
// Note: at this moment deck = [], so this will display 0 until initGame runs and fills deck.
questionTotalEl.textContent = deck.length;

/* =========================
   EVENT LISTENERS
   (All route into initGame)
========================= */
// These listeners mean any of these buttons will start a fresh game.
// The `if (...)` checks prevent errors if a button is missing from the DOM.
if (startBtnEl) startBtnEl.addEventListener("click", initGame);
if (restartBtnEl) restartBtnEl.addEventListener("click", initGame);
if (playAgainBtnEl) playAgainBtnEl.addEventListener("click", initGame);

// This listener is attached to the parent container (#answers), not to each button individually.
// we listen once on the container and detect what button was clicked.
answersEl.addEventListener("click", onAnswerClick);

/* =========================
   INIT / RESET
========================= */
/*
  initGame() starts a brand new run of the trivia game.
  It resets all counters, shuffles the questions, updates the HUD, switches screens,
  and renders the first question so the player can begin immediately.
*/
function initGame() {
  // Reset all counters to their starting values for a new game run.
  correct = 0;
  strikes = 0;
  currentIdx = 0;

  // Clear any feedback message ("Correct!" / "Wrong!") from the previous round.
  feedbackEl.textContent = "";

  // Create a brand new "deck" for this run.
  // `[...QUESTION_BANK]` makes a copy so we don’t shuffle the original array permanently.
  deck = shuffleArray([...QUESTION_BANK]);

  // Update the HUD to show how many questions exist in this run.
  questionTotalEl.textContent = deck.length;

  // Update the rest of the HUD counters (question number, correct, strikes).
  renderHud();

  // Hide start/end screens and show the game screen.
  showScreen("game");

  // Display the first question and its answers to the player.
  renderQuestion();
}

/* =========================
   RENDER
========================= */
/*
  renderHud() updates the scoreboard text on the page.
  It does NOT change game logic; it only reflects the current state visually.
*/
function renderHud() {
  // If deck has questions, show currentIdx+1 (human-friendly question numbers start at 1).
  // If deck is empty, show 0 so the UI doesn’t show "1" incorrectly.
  questionNumberEl.textContent = deck.length ? currentIdx + 1 : 0;

  // Show the current counters for correct answers and strikes.
  correctCountEl.textContent = correct;
  strikeCountEl.textContent = strikes;
}

/*
  renderQuestion() pulls the current question object from the deck using currentIdx,
  then updates the page with the question text, topic, and clickable answer buttons.
*/
function renderQuestion() {
  // Guard clause: if deck is empty, show a helpful message and stop.
  // This prevents errors like trying to access deck[currentIdx] when deck has no items.
  if (!deck.length) {
    questionTextEl.textContent =
      "No questions found. Check that data.js loads BEFORE app.js.";
    answersEl.innerHTML = "";          // clear any old buttons
    categoryLabelEl.textContent = "—"; // show a placeholder category
    return;                            // stop running this function here
  }

  // Get the current question object the player should be answering right now.
  const q = deck[currentIdx];

  // Put the question text into the question heading element.
  questionTextEl.textContent = q.question;

  // Show the topic/category for this question, or "—" if no topic is provided.
  categoryLabelEl.textContent = q.topic || "—";

  // Clear old feedback when a new question appears.
  feedbackEl.textContent = "";

  // Clear out any previous answer buttons before adding new ones.
  answersEl.innerHTML = "";

  // For each possible answer, create a <button> and insert it into the answers container.
  // The button stores the answer text in dataset so we can read it later when clicked.
  q.possibleAnswers.forEach((ansText) => {
    const btn = document.createElement("button"); // create a new button element
    btn.type = "button";                          // prevents accidental form submission behavior
    btn.className = "answer-btn";                 // gives us a hook for styling + click detection
    btn.dataset.answer = ansText;                 // store the exact answer text on the element
    btn.textContent = ansText;                    // visible text the user sees on the button
    answersEl.appendChild(btn);                   // add button into the DOM
  });

  // Update the HUD (especially question number) to match the current question.
  renderHud();
}

/* =========================
   ANSWER CLICK
========================= */
/*
  onAnswerClick(evt) runs whenever anything inside the answers container is clicked.
  It checks whether an answer button was clicked, compares it to the correct answer,
  updates counters, checks win/lose conditions, and moves to the next question if needed.
*/
function onAnswerClick(evt) {
  // Find the closest <button> to what was clicked (handles clicks on inner text too).
  const btn = evt.target.closest("button");

  // If there was no button clicked (e.g., clicked empty space), do nothing.
  if (!btn) return;

  // If the clicked button isn’t one of our answer buttons, ignore it.
  if (!btn.classList.contains("answer-btn")) return;

  // Read the answer text we stored in the button’s dataset.
  const chosenAnswer = btn.dataset.answer;

  // Get the question object we’re answering right now.
  const q = deck[currentIdx];

  // Determine whether the selected answer is exactly the correctAnswer string in your data.
  const isCorrect = chosenAnswer === q.correctAnswer;

  // Update state based on correctness and show feedback to the player.
  if (isCorrect) {
    correct++; // increment correct counter
    feedbackEl.textContent = "Correct!";
  } else {
    strikes++; // increment strike counter
    feedbackEl.textContent = "Wrong!";
  }

  // Update the HUD so the player immediately sees their updated score/strikes.
  renderHud();

  // If the player has reached the win target, end the game as a win.
  // return stops the function immediately so we don’t run “next question” logic afterward.
  if (correct >= WIN_TARGET) return endGame(true);

  // If the player hit the strike limit, end the game as a loss.
  if (strikes >= STRIKE_LIMIT) return endGame(false);

  // If the game isn’t over, move on to the next question.
  // setTimeout creates a short pause so the player can actually read "Correct!" or "Wrong!".
  setTimeout(() => {
    // Advance to the next question index.
    currentIdx++;

    // If we advanced past the last question, we end the game.
    // This handles the case where the deck ends before win/lose conditions are reached.
    if (currentIdx >= deck.length) {
      endGame(false, "Out of questions!");
      return;
    }

    // Render the next question in the UI.
    renderQuestion();
  }, 450);
}

/* =========================
   END GAME
========================= */
/*
  endGame(didWin, customMessage) updates the end screen to show a win or loss message,
  then switches the app view over to the end screen.
*/
function endGame(didWin, customMessage) {
  // If didWin is true, show win title + message.
  // The `customMessage || defaultMessage` pattern uses the custom message if provided,
  // otherwise it falls back to a default message.
  if (didWin) {
    endTitleEl.textContent = "You Win!";
    endMessageEl.textContent =
      customMessage || "You reached 5 correct answers. Glory to Waterdeep!";
  } else {
    // If didWin is false, show lose title + message.
    endTitleEl.textContent = "You Lose!";
    endMessageEl.textContent =
      customMessage || "Three strikes. The Lords are not amused.";
  }

  // Switch the UI to the end screen so the player sees the result.
  showScreen("end");
}

/* =========================
   SCREENS
========================= */
/*
  showScreen(which) controls which section is visible by toggling the "hidden" class.
  Only one screen should be visible at a time: "start", "game", or "end".
*/
function showScreen(which) {
  // First hide every screen to guarantee we only show one.
  startScreenEl.classList.add("hidden");
  gameScreenEl.classList.add("hidden");
  endScreenEl.classList.add("hidden");

  // Then reveal the one screen we want.
  if (which === "start") startScreenEl.classList.remove("hidden");
  if (which === "game") gameScreenEl.classList.remove("hidden");
  if (which === "end") endScreenEl.classList.remove("hidden");
}

/* =========================
   UTIL
========================= */
/*
  shuffleArray(arr) randomizes the order of an array using the Fisher-Yates shuffle.
  This ensures each playthrough gets questions in a different order.
*/
function shuffleArray(arr) {
  // Walk backwards through the array, swapping each item with a random earlier item.
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0..i
    [arr[i], arr[j]] = [arr[j], arr[i]];          // swap elements using destructuring
  }
  return arr; // return the shuffled array so we can assign it to deck
}

/* =========================
   START ON START SCREEN
========================= */
// When the page first loads, we want the start screen showing (not the game or end screen).
showScreen("start");

// Display the total number of questions available in the data bank.
// Note: this is the raw bank size, not necessarily the size of the shuffled deck in a run.
questionTotalEl.textContent = QUESTION_BANK.length;

/*
  NOTE: You currently have TWO endGame functions in this file (this one below + the one above).
  In JavaScript, the second one will overwrite the first one, because they have the same name.
  I’m not changing your code (as requested), but be aware this is why your messages/styles might act oddly.
*/
function endGame(didWin) {
  // Remove any old win/lose styling so we can apply the correct one fresh.
  endScreenEl.classList.remove("win", "lose");

  // If the player won, set win text and add the .win class for CSS styling.
  if (didWin) {
    endTitleEl.textContent = "You Win!";
    endMessageEl.textContent =
      "You answered 5 questions correctly. You have been granted the title of 'Lord of Waterdeep'!";

    endScreenEl.classList.add("win");
  } else {
    // If the player lost, set lose text and add the .lose class for CSS styling.
    endTitleEl.textContent = "You Lose!";
    endMessageEl.textContent =
      "Three strikes! Your petition to join the Lords has failed.";

    endScreenEl.classList.add("lose");
  }

  // Finally switch to the end screen so the player sees the outcome.
  showScreen("end");
}
