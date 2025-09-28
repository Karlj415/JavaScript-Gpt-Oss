/*
====================================
 LESSON 01: PRACTICE DRILLS
====================================

These exercises build your programming mindset. Do them all!
Time estimate: 45 minutes total

------------------------------------
DRILL 1: Your "Why" (5 minutes)
------------------------------------
Write down (in a file called my-why.md):
- Why are you learning JavaScript?
- What do you want to build in 12 months?
- What job/project excites you?

Example:
"I'm learning JavaScript because I want to build interactive websites.
In 12 months, I want to have built my own web app for tracking recipes.
I'm excited about potentially working as a junior developer."

------------------------------------
DRILL 2: Robot Instructions (10 minutes)
------------------------------------
Practice the OPTR method with a non-programming task.
Write instructions for a robot to make a peanut butter sandwich.

Remember: The robot knows NOTHING. Be specific!

Bad instruction: "Make sandwich"
Good instruction:
1. Walk to kitchen
2. Open cabinet door
3. Locate bread loaf
4. Pick up bread loaf
5. Place on counter
6. Open bread bag by untwisting tie
(and so on...)

Try this with:
- Making coffee
- Brushing teeth  
- Tying shoes

------------------------------------
DRILL 3: Tool Verification (5 minutes)
------------------------------------
Take screenshots showing:
1. VS Code open
2. Terminal/PowerShell showing `node -v` output
3. Chrome DevTools Console tab

Save these in a folder called "setup-proof"
You'll thank yourself later when troubleshooting!

------------------------------------
DRILL 4: Console Playground (15 minutes)
------------------------------------
Open Chrome DevTools Console and try these experiments:
*/

// Experiment 1: Variables and Strings
// Type each line separately and press Enter
const myName = 'Your Name Here';  // Replace with your actual name!
console.log('Hello, ' + myName);
console.log(`Welcome to JavaScript, ${myName}!`);  // This uses template literals

// Experiment 2: Basic Math
// JavaScript can be your calculator!
10 + 5;
100 - 37;
6 * 7;
100 / 4;
10 % 3;  // This gives the remainder of division

// Experiment 3: Variables with Math
let myAge = 25;  // Use your real age
let futureAge = myAge + 10;
console.log('In 10 years, I\'ll be ' + futureAge);

// Experiment 4: True or False (Booleans)
5 > 3;    // Is 5 greater than 3?
10 < 2;   // Is 10 less than 2?
7 === 7;  // Is 7 equal to 7?
'cat' === 'dog';  // Is "cat" the same as "dog"?

// Experiment 5: Mini Program
// Copy this whole block and paste it
let pizzaSlices = 8;
let peopleEating = 3;
let slicesPerPerson = pizzaSlices / peopleEating;
console.log(`Each person gets ${slicesPerPerson} slices`);

// Experiment 6: Change the Webpage!
document.body.style.backgroundColor = 'lightblue';
document.body.style.fontSize = '20px';
// Refresh the page to undo these changes

/*
------------------------------------
DRILL 5: Error Practice (10 minutes)
------------------------------------
Purposely make mistakes to see error messages!
This removes fear of errors.

Try these broken commands and observe the errors:
*/

// Missing quotes
// console.log(Hello World);

// Misspelled command
// consle.log("Test");

// Using undefined variable
// console.log(someRandomVariable);

// Missing closing parenthesis
// console.log("Oops"

/*
What you learned from errors:
- Red text isn't scary, it's helpful!
- Errors tell you the line number
- Most errors are typos
- Every developer sees errors daily
*/

/*
====================================
 PROJECT: Your Developer Profile
====================================

Time estimate: 30-45 minutes
Difficulty: Beginner-friendly

------------------------------------
The Mission
------------------------------------
Create a README.md file that introduces you as a developer-in-training.
This is your first "real" project - it goes in your portfolio!

------------------------------------
Step-by-Step Instructions
------------------------------------

1. CREATE YOUR PROJECT FOLDER
   Open Terminal/PowerShell and run:
   ```
   mkdir javascript-course-work
   cd javascript-course-work
   ```

2. CREATE YOUR README FILE
   Create a new file called README.md
   
3. COPY THIS TEMPLATE AND CUSTOMIZE IT:
*/

/*
# [Your Name] - JavaScript Learning Journey

## 👋 About Me
I'm [Your Name], and I'm learning JavaScript to [your reason].
Started my coding journey on [today's date].

## 🎯 My Goals
- **30 Days:** Complete Lessons 1-6 (JavaScript Fundamentals)
- **60 Days:** Build my first interactive web page
- **90 Days:** Create a full project for my portfolio
- **6 Months:** Be job-ready as a Junior Developer
- **Dream Project:** [Describe something you want to build]

## 💻 My Setup
- **Operating System:** [Windows/Mac/Linux]
- **Code Editor:** Visual Studio Code ✅
- **Node.js Version:** [Your version from `node -v`] ✅
- **Git Version:** [Your version from `git --version`] ✅
- **Browser:** Google Chrome with DevTools ✅

## 📈 My Learning Commitments
- [ ] Code for at least 30 minutes every day
- [ ] Complete all exercises before moving to next lesson
- [ ] Keep a learning journal
- [ ] Ask for help when stuck for more than 30 minutes
- [ ] Share my progress weekly
- [ ] Build projects, not just follow tutorials

## 📚 Current Lesson
Working on: Lesson 01 - Welcome to JavaScript

## 📅 Progress Log
| Date | Lesson | Time Spent | Key Learning |
|------|--------|------------|-------------|
| [Today] | Lesson 01 | 2 hours | Installed tools, wrote first code! |

## 💡 Today I Learned (TIL)
- JavaScript makes websites interactive
- `console.log()` prints messages
- Computers follow instructions exactly
- Every developer uses Google

## 🤔 Questions I Have
- How do websites remember my login?
- What's the difference between let and const?
- How long until I can build a real app?

## 🎉 Victories
- ✅ Installed all development tools
- ✅ Wrote my first line of JavaScript
- ✅ Understood the OPTR problem-solving method
- ✅ Created my first repository

## 📝 Notes to Future Me
Dear Future Me who knows JavaScript,
Remember when console.log seemed magical?
Remember when you didn't know what a variable was?
You've come so far!

---
*Last Updated: [Today's Date]*
*/

/*
4. SAVE YOUR FILE

5. INITIALIZE GIT (Version Control)
   In Terminal/PowerShell:
   ```
   git init
   git add README.md
   git commit -m "My first commit! Starting my JavaScript journey"
   ```

6. BONUS CHALLENGES:
   - Add an emoji to each section 🚀
   - Include a motivational quote
   - Add a "Skills to Learn" section
   - Create a "Resources" section with helpful links

------------------------------------
Why This Project Matters
------------------------------------
1. Every developer has a README profile
2. You're practicing Markdown (used everywhere in tech)
3. You're starting version control habits
4. It's your coding journal's home base
5. Future employers will see your growth

------------------------------------
Common Mistakes to Avoid
------------------------------------
- Don't skip the git commands (they're important!)
- Don't worry about perfect grammar
- Don't copy someone else's - be authentic
- Don't forget to update it as you progress

------------------------------------
Success Criteria
------------------------------------
You've succeeded when:
✓ README.md file exists
✓ All sections are filled out
✓ Git repository is initialized
✓ First commit is made
✓ You feel proud of starting your journey!

🎉 Congratulations on completing Lesson 01!
You're officially a programmer now!
*/
