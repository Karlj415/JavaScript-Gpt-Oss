/*
====================================
LESSON 04: PRACTICE DRILLS
====================================

Time: 60-90 minutes
Goal: Master decision-making and loops in JavaScript

------------------------------------
DRILL 1: FizzBuzz (The Classic Interview Question!)
------------------------------------

The Challenge:
- Count from 1 to 100
- BUT: Replace certain numbers with words
  - Multiples of 3 → "Fizz" 
  - Multiples of 5 → "Buzz"
  - Multiples of both → "FizzBuzz"
  
Why This Matters:
- Tests your understanding of loops and conditions
- Asked in MANY tech interviews
- Combines multiple concepts elegantly

Example Output:
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz...
*/

// SOLUTION 1: Traditional Approach
console.log("=== FizzBuzz Traditional ===");
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {  // Check 15 first (3*5)
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// SOLUTION 2: Cleaner Approach (Building the String)
console.log("\n=== FizzBuzz Clean Version ===");
for (let i = 1; i <= 100; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    console.log(output || i);  // Use number if output is empty
}

// SOLUTION 3: One-Liner with Ternary (Show-off Version)
console.log("\n=== FizzBuzz One-Liner ===");
for (let i = 1; i <= 100; i++) {
    console.log(
        i % 15 === 0 ? "FizzBuzz" : 
        i % 3 === 0 ? "Fizz" : 
        i % 5 === 0 ? "Buzz" : i
    );
}

/*
------------------------------------
DRILL 2: User Role Permission System
------------------------------------

The Challenge:
Build a permission system that shows what each user role can do.

Roles:
- admin: Can do everything
- editor: Can read and write
- viewer: Can only read
- guest: Limited access

Why This Matters:
- Real apps use role-based permissions
- Practice with switch statements
- Understanding access control
*/

console.log("\n=== User Role System ===");

// Test different roles
const roles = ["admin", "editor", "viewer", "guest", "hacker"];

for (const userRole of roles) {
    console.log(`\nUser Role: ${userRole}`);
    console.log("Permissions:");
    
    switch(userRole) {
        case "admin":
            console.log("  ✅ Read content");
            console.log("  ✅ Write content");
            console.log("  ✅ Delete content");
            console.log("  ✅ Manage users");
            console.log("  ✅ Access settings");
            console.log("  🔑 FULL SYSTEM ACCESS");
            break;
            
        case "editor":
            console.log("  ✅ Read content");
            console.log("  ✅ Write content");
            console.log("  ✅ Edit content");
            console.log("  ❌ Delete content");
            console.log("  ❌ Manage users");
            break;
            
        case "viewer":
            console.log("  ✅ Read content");
            console.log("  ❌ Write content");
            console.log("  ❌ Edit content");
            console.log("  ❌ Delete content");
            break;
            
        case "guest":
            console.log("  ✅ Read public content");
            console.log("  ❌ Access private content");
            console.log("  ❌ Make changes");
            console.log("  💡 Sign up for more access!");
            break;
            
        default:
            console.log("  ⚠️ UNRECOGNIZED ROLE");
            console.log("  🚫 Access denied - invalid credentials");
            console.log("  📞 Contact administrator");
    }
}

/*
------------------------------------
DRILL 3: Smart Greeting Function with Defaults
------------------------------------

The Challenge:
Create a function that greets users but handles missing names gracefully.

Why This Matters:
- Default values prevent crashes
- Common pattern in real applications  
- Understanding truthy/falsy and ||
*/

console.log("\n=== Smart Greeting Function ===");

// Version 1: Using || operator
function greetUser(name) {
    const displayName = name || "Anonymous";
    console.log(`Hello, ${displayName}! Welcome back.`);
}

// Version 2: With time-based greeting
function smartGreet(name, hour) {
    const displayName = name || "Guest";
    const currentHour = hour || new Date().getHours();
    
    let greeting;
    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    console.log(`${greeting}, ${displayName}!`);
}

// Version 3: With multiple defaults
function advancedGreet(options) {
    // Destructure with defaults
    const name = options?.name || "Visitor";
    const language = options?.language || "en";
    const emoji = options?.emoji || "👋";
    
    const greetings = {
        en: "Hello",
        es: "Hola",
        fr: "Bonjour",
        de: "Guten Tag"
    };
    
    const greeting = greetings[language] || greetings.en;
    console.log(`${emoji} ${greeting}, ${name}!`);
}

// Test the functions
console.log("Testing greetUser:");
greetUser("Alice");        // Hello, Alice! Welcome back.
greetUser("");             // Hello, Anonymous! Welcome back.
greetUser(null);           // Hello, Anonymous! Welcome back.
greetUser();               // Hello, Anonymous! Welcome back.

console.log("\nTesting smartGreet:");
smartGreet("Bob", 9);      // Good morning, Bob!
smartGreet("Charlie", 14); // Good afternoon, Charlie!
smartGreet("", 20);        // Good evening, Guest!

console.log("\nTesting advancedGreet:");
advancedGreet({ name: "Maria", language: "es", emoji: "🌟" });
advancedGreet({ name: "Pierre", language: "fr" });
advancedGreet({});         // All defaults
advancedGreet();           // Handle undefined gracefully

/*
====================================
PROJECT: Interactive Quiz Game
====================================

Time: 45-60 minutes
Difficulty: Intermediate

Your Mission:
Build a quiz game that tests knowledge, keeps score, and gives feedback!

What You'll Learn:
- Working with arrays of objects
- Looping through questions
- Validating user input
- Calculating percentages
- Providing dynamic feedback

Note: This version works in Node.js without external packages
For browser version, replace readline with prompt()
*/

console.log("""
╔═══════════════════════════════════╗
║     🧠 JAVASCRIPT QUIZ GAME 🧠    ║
╚═══════════════════════════════════╝
""");

// ====================================
// QUIZ DATA
// ====================================

const questions = [
    {
        prompt: "What type is 'Hello World'?",
        options: ["Number", "String", "Boolean", "Object"],
        answer: "String",
        explanation: "Text in quotes is always a string!"
    },
    {
        prompt: "What is 10 % 3?",
        options: ["3", "1", "0", "10"],
        answer: "1",
        explanation: "% gives the remainder: 10 ÷ 3 = 3 remainder 1"
    },
    {
        prompt: "Which loop runs at least once?",
        options: ["for", "while", "do...while", "for...of"],
        answer: "do...while",
        explanation: "do...while checks the condition AFTER running once"
    },
    {
        prompt: "What does '5' == 5 return?",
        options: ["true", "false", "undefined", "error"],
        answer: "true",
        explanation: "== converts types, so string '5' equals number 5 (use === instead!)"
    },
    {
        prompt: "Which is NOT falsy?",
        options: ["0", "''", "[]", "null"],
        answer: "[]",
        explanation: "Empty arrays are truthy! Only 6 values are falsy."
    }
];

// ====================================
// QUIZ ENGINE (Browser/Node Compatible)
// ====================================

// For Node.js command line input
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to ask questions
function askQuestion(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

// Main quiz function
async function runQuiz() {
    let score = 0;
    const totalQuestions = questions.length;
    
    console.log(`\n📋 ${totalQuestions} questions ready. Let's begin!\n`);
    console.log("Type the NUMBER of your answer (1, 2, 3, or 4)\n");
    
    // Loop through each question
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionNumber = i + 1;
        
        // Display question
        console.log("=".repeat(40));
        console.log(`Question ${questionNumber} of ${totalQuestions}:`);
        console.log(`\n${question.prompt}\n`);
        
        // Display options
        for (let j = 0; j < question.options.length; j++) {
            console.log(`  ${j + 1}. ${question.options[j]}`);
        }
        
        // Get user answer
        const userInput = await askQuestion("\nYour answer (1-4): ");
        const userAnswerIndex = parseInt(userInput) - 1;
        const userAnswer = question.options[userAnswerIndex];
        
        // Check answer
        if (userAnswer === question.answer) {
            score++;
            console.log("\n✅ CORRECT! Well done!");
        } else {
            console.log(`\n❌ INCORRECT!`);
            console.log(`The correct answer was: ${question.answer}`);
        }
        
        // Show explanation
        console.log(`💡 Explanation: ${question.explanation}\n`);
        
        // Show running score
        console.log(`Current Score: ${score}/${questionNumber}`);
    }
    
    // Calculate final results
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Display final score
    console.log("\n" + "=".repeat(40));
    console.log("         🏁 QUIZ COMPLETE! 🏁");
    console.log("=".repeat(40));
    console.log(`\nFinal Score: ${score}/${totalQuestions} (${percentage}%)\n`);
    
    // Performance feedback using switch for grade boundaries
    let grade;
    switch(true) {
        case percentage >= 90:
            grade = "A";
            console.log("🌟 OUTSTANDING! You're a JavaScript master!");
            console.log("Grade: A - Exceptional work!");
            break;
            
        case percentage >= 80:
            grade = "B";
            console.log("🎉 EXCELLENT! Great understanding!");
            console.log("Grade: B - Very good performance!");
            break;
            
        case percentage >= 70:
            grade = "C";
            console.log("👍 GOOD JOB! You're getting there!");
            console.log("Grade: C - Solid foundation!");
            break;
            
        case percentage >= 60:
            grade = "D";
            console.log("💪 KEEP GOING! More practice needed.");
            console.log("Grade: D - Review the concepts!");
            break;
            
        default:
            grade = "F";
            console.log("📚 TIME TO STUDY! Review the lessons.");
            console.log("Grade: F - Don't give up, try again!");
    }
    
    // Detailed feedback
    console.log("\n📊 Performance Analysis:");
    
    if (score === totalQuestions) {
        console.log("  🏆 PERFECT SCORE! You nailed every question!");
    } else if (score === 0) {
        console.log("  🔄 Everyone starts somewhere. Review and retry!");
    } else {
        const missed = totalQuestions - score;
        console.log(`  ✓ Correct: ${score} questions`);
        console.log(`  ✗ Missed: ${missed} questions`);
        
        // Specific advice based on performance
        if (percentage >= 80) {
            console.log("  💡 Tip: You're close to mastery!");
        } else if (percentage >= 60) {
            console.log("  💡 Tip: Review the explanations for missed questions.");
        } else {
            console.log("  💡 Tip: Re-read the lesson before trying again.");
        }
    }
    
    // Ask if they want to try again
    console.log("\n" + "=".repeat(40));
    const playAgain = await askQuestion("\nPlay again? (yes/no): ");
    
    if (playAgain.toLowerCase() === 'yes' || playAgain.toLowerCase() === 'y') {
        console.clear();
        runQuiz();
    } else {
        console.log("\nThanks for playing! Keep learning JavaScript! 🚀\n");
        rl.close();
    }
}

// Start the quiz
runQuiz();

/*
====================================
BONUS CHALLENGES
====================================

1. Add a timer for each question
   - Give 30 seconds per question
   - Deduct points for slow answers

2. Add difficulty levels
   - Easy, Medium, Hard questions
   - More points for harder questions

3. Add categories
   - Arrays, Loops, Functions, etc.
   - Let user choose a category

4. Save high scores
   - Store best scores in a file
   - Display leaderboard

5. Add hints system
   - Allow 3 hints per quiz
   - Hints eliminate one wrong answer

6. Create question randomizer
   - Shuffle questions each time
   - Prevent memorization

7. Add explanations for wrong answers
   - Show why each wrong option is incorrect
   - Educational mode vs. test mode
*/
