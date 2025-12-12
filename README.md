# Who Wants To Be a Lord of Waterdeep?

#### A D&amp;D Trivia Game where players can progress through a series of multiple choice questions and test their D&D knowledge! 



<img src="./assets/logo.png" alt="Jovial Bard logo with a lute and finger in the air" width="300">

## Getting Started
### Play the game: (link to deployed version)
### Instructions:



### Planning materials:

Wireframes, pseudocode, data files



### User Stories

**As a Player I want to: **
+ See simple instructions at the start so I know how the game works 
+ Have a start button and see instructions for the trivia game
+ See a theme, wording, and UI to feel like Dungeons & Dragons so playing feels immersive
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

(Assets, icons, fonts, sound effects, etc.)


- Bard character illustration generated using OpenAI’s image generation tool (DALL·E), based on a custom prompt.


## Technologies Used

HTML

CSS

JavaScript

(Any libraries or audio sources)


## Next Steps

- a feature to make the game scale difficulty as the user moves through the questions towards the end
- a way to expand the pool of questions beyond the initial setup(this would be good to add pools that are randomized after the difficulty feature so questions of different difficulties would be pulled as the game progresses)
- you could scale this game different ways, enable 2 players to take turns in head to head or simply increase the question pool

## Presentation Notes

##### Disclaimer
This project is a fan-made, non-commercial educational project