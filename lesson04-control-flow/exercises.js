/*
## Practice Drills
1.  **FizzBuzz:** Write a loop that prints numbers from 1 to 100. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both 3 and 5, print "FizzBuzz". This is a classic interview question!
2.  **User Role System:** Create a script. Define a `userRole` variable (`"admin"`, `"editor"`, `"guest"`). Use a `switch` statement to log the permissions for each role.
3.  **Default Value:** Write a function that accepts a `name` parameter. Inside, use the `||` operator to default the name to `"Anonymous"` if it's not provided, and log a greeting.
*/

/*
## Project: Interactive Quiz Engine
Create `quiz-engine.js` that:
- Stores an array of question objects. Each object should have `{ prompt: string, options: array, answer: string }`.
- Iterates through the questions, displaying the prompt and options to the user.
- Collects user input (e.g., via `prompt-sync`).
- Uses an `if/else` statement or a `ternary` operator to check if the answer is correct and provide immediate feedback.
- Keeps track of the score.
- After the quiz, prints a final score and a personalized message using a `switch` statement or `if/else if` based on the score (e.g., 0-50% -> "Needs Improvement", 51-80% -> "Good Job!", 81-100% -> "Excellent!").
*/

// To handle user input in Node.js, you'll need a package.
// Run `npm install prompt-sync` and then use it like this:
// const prompt = require('prompt-sync')();
// const name = prompt('What is your name?');

// --- Starter Code for the Project ---

const questions = [
  {
    prompt: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    prompt: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  // Add more questions here!
];

let score = 0;

// TODO: Loop through each question in the `questions` array.

// TODO: For each question, display the prompt and the options to the user.

// TODO: Get the user's answer.

// TODO: Check if the user's answer is correct.
// Use an if/else statement or a ternary operator.
// If correct, increment the score and log a success message.
// If incorrect, log a failure message.

// TODO: After the loop, display the final score.

// TODO: Based on the score, display a personalized message.
// Use a switch statement or an if/else if chain.
