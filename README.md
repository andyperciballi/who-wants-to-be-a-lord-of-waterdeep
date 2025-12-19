# Who Wants To Be a Lord of Waterdeep?

#### A D&amp;D Trivia Game where players can progress through a series of multiple choice questions and test their D&D knowledge! 



<img src="./assets/logo.png" alt="Jovial Bard logo with a lute and finger in the air" width="300">

## Getting Started
### Play the game: https://andyperciballi.github.io/who-wants-to-be-a-lord-of-waterdeep/
### Instructions:

- Click Start to begin a new trivia game and load a shuffled set of questions.
- Read each question carefully and select an answer by clicking one of the provided buttons.
- The game tracks correct answers and strikes; reach 5 correct answers to win or 3 strikes to lose.
- Feedback is shown after each answer, then the game automatically advances to the next question.
- When the game ends, click Restart or Play Again to reset the game and try another run.

### User Stories

**As a Player I want to: **
+ See simple instructions at the start so I know how the game works 
+ Have a start button and see instructions for the trivia game
+ Be presented with a clear question with multiple-choice answers
+ Have my progress (question number out of 8) shown so I know how far I’ve advanced in the challenge. this could be displayed with various UI features or elements
+ See immediate feedback when I choose an answer so I know whether I was correct or not
+ See my remaining failed attempts displayed
+ See a loss screen if I reach 3 wrong answers so I understand the game is over. 
+ See a win screen if I correctly answer 5/8 questions 
+ Have a restart button if I win or lose



### Game Logic & Features

- we will need 2 Counters; CorrectAnswerCount and StrikeCount
- Strikes should start at 0 and when at three trigger a loss, CorrectAnswerCount should trigger a win
- Questions will need attributes matching the displaying questions' answerpool

### Win/Loss conditions

- the game is over when the player answers 5 questions correctly or 3 questions incorrectly; whichever is first.

## Attributions

- rules from Dungeons and Dragons Player handbook (2024)
- General Assembly Course Lectures and materials
- Bard character illustration generated using OpenAI’s image generation tool (DALL·E), based on a custom prompt.
- MDN, stack overflow, leetcode documentation and notes
- treehouse on youtube - coding examples

## Technologies Used

HTML, CSS, JavaScript 

## Next Steps

- a feature to make the game scale difficulty as the user moves through the questions towards the end
- a way to expand the pool of questions beyond the initial setup(this would be good to add pools that are randomized after the difficulty feature so questions of different difficulties would be pulled as the game progresses)
- you could scale this game different ways, enable 2 players to take turns in head to head or simply increase the question pool 
- enabling lifeline feature (maybe as a question skip)
- display difficulty level of the question
- allow for no "hard questions" setting or to scale quiz difficulty and only use one difficulty deck at a time.

## Presentation Notes

onAnswerClick handles a single answer selection:
- Figures out which answer was clicked
- Checks if it’s correct or incorrect
- Updates the game state (correct answers or strikes)
- Checks win / loss conditions
- Either moves to the next question or ends the game

```Javascript 

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

```

I'm proud of this piece that shuffles the questions so I can add more to my question bank and scale the tool. If I tied this to an index number I couldn't easily add more questions!
shuffleArray(arr) randomizes the order of an array using the Fisher-Yates shuffle. This ensures each playthrough gets questions in a different order. 
Walk backwards through the array, swapping each item with a random earlier item.
```javascript
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0..i
    [arr[i], arr[j]] = [arr[j], arr[i]];          // swap elements using destructuring
  }
  return arr; // return the shuffled array so we can assign it to deck
}
```

##### Disclaimer
This project is a fan-made, non-commercial educational project