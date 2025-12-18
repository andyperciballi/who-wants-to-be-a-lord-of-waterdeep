const questions = [
  {
    topic: "combat mechanics",
    question:
      "On your turn in combat, which of the following is something every character can normally do?",
    possibleAnswers: [
      "cast a spell",
      "Take one Action",
      "Take two Bonus actions",
      "Move only after attacking",
    ],
    difficulty: "Easy",
    correctAnswer: "Take one Action",
  },
  {
    topic: "player stats",
    question: "What does an Armor Class of 20 represent?",
    possibleAnswers: [
      "The armor you are wearing has the AC and it is 20",
      "the attack role needed to hit the character is 20",
      "the attack role needed to hit is 21",
      "the base AC of your character before modifiers like spells but after Armor is 20",
    ],
    difficulty: "medium",
    correctAnswer: "the attack role needed to hit the character is 20",
  },
  {
    topic: "combat mechanics",
    question:
      "When making an attack roll in D&D 5e, what do you add to the d20?",
    possibleAnswers: [
      "Only your Strength modifier",
      "Your ability modifier plus proficiency bonus if proficient",
      "Your proficiency bonus only",
      "Your Armor Class",
    ],
    difficulty: "easy",
    correctAnswer: "Your ability modifier plus proficiency bonus if proficient",
  },
  {
    topic: "spellcasting",
    question: "What determines the Difficulty Class (DC) of a spell you cast?",
    possibleAnswers: [
      "10 + spell level",
      "Your spellcasting ability modifier only",
      "8 + proficiency bonus + spellcasting ability modifier",
      "The target’s Armor Class",
    ],
    difficulty: "medium",
    correctAnswer: "8 + proficiency bonus + spellcasting ability modifier",
  },
  {
    topic: "actions",
    question: "Which of the following is considered a Bonus Action?",
    possibleAnswers: [
      "Casting most spells",
      "Making an Opportunity Attack",
      "Using two-weapon fighting to make an off-hand attack",
      "Dodging an attack",
    ],
    difficulty: "medium",
    correctAnswer: "Using two-weapon fighting to make an off-hand attack",
  },
  {
    topic: "conditions",
    question: "What does the Restrained condition do to a creature?",
    possibleAnswers: [
      "The creature cannot take actions",
      "The creature’s speed becomes 0 and attacks against it have advantage",
      "The creature automatically fails Strength checks",
      "The creature falls unconscious",
    ],
    difficulty: "medium",
    correctAnswer:
      "The creature’s speed becomes 0 and attacks against it have advantage",
  },
  {
    topic: "death saving throws",
    question:
      "What happens when a character succeeds on three death saving throws?",
    possibleAnswers: [
      "They immediately regain 1 hit point",
      "They become stable at 0 hit points",
      "They regain consciousness",
      "They can take a Bonus Action",
    ],
    difficulty: "easy",
    correctAnswer: "They become stable at 0 hit points",
  },
  {
    topic: "resting",
    question: "What is one benefit of completing a Long Rest?",
    possibleAnswers: [
      "You regain all hit dice",
      "You regain all hit points and spell slots",
      "You can immediately take another Long Rest",
      "You remove all exhaustion levels",
    ],
    difficulty: "easy",
    correctAnswer: "You regain all hit points and spell slots",
  },
];
