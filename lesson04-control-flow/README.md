# Lesson 04 · Control Flow: Teaching Your Code to Make Decisions

🎮 **Achievement Unlocked:** Today your code becomes SMART!

Up until now, your code has been like a train on tracks - it goes straight from top to bottom. Today, we add switches, loops, and branches. Your code will make decisions, repeat tasks, and react to different situations. This is where programming gets FUN!

## 🌟 The Magic You'll Learn Today
Imagine you're creating a game, a shopping site, or an app:
- **IF statements** → "IF player health is zero, show game over"
- **Loops** → "Keep spawning enemies WHILE player is alive"
- **Switch** → "Based on user's choice, do different things"

After this lesson, your programs can think and react!

## 🎯 Your Mission Objectives
- [ ] Master the 6 "falsy" values (everything else is truthy!)
- [ ] Write IF/ELSE decisions like a pro
- [ ] Use the ternary operator (the cool one-liner)
- [ ] Understand short-circuit evaluation (JavaScript's shortcuts)
- [ ] Build multi-path decisions with SWITCH
- [ ] Loop through data with FOR, WHILE, and FOR...OF
- [ ] Control loops with BREAK (emergency exit) and CONTINUE (skip)

**Success Metric:** You can write a program that makes decisions and repeats tasks automatically.

## 💡 Why This Changes Everything

**Without Control Flow:**
- Your code is a recipe that always makes the same dish
- You'd need to write separate programs for every scenario
- No automation, no intelligence

**With Control Flow:**
- Your code becomes a smart assistant
- One program handles infinite scenarios
- Automation becomes possible
- Your code can validate passwords, process orders, play games, analyze data...

Think of control flow as your code's brain - it's what makes programs intelligent!

## Lesson Narrative

### 1. The Secret: Truthy and Falsy (JavaScript's Hidden Superpower)

#### The Mind-Blowing Concept
In JavaScript, EVERYTHING has a hidden true/false personality. It's like every value has a secret opinion: "Am I something or nothing?"

#### The "Falsy Six" - The Only Liars in JavaScript
Memorize these 6 values that pretend to be false:

```javascript
// The Falsy Six - These are considered "nothing" or "empty"
1. false        // The obvious one
2. 0            // Zero = nothing
3. ""           // Empty string = no text
4. null         // Intentionally empty
5. undefined    // Accidentally empty
6. NaN          // Not a Number = math gone wrong
```

#### EVERYTHING Else is Truthy!
```javascript
// These are ALL truthy (considered "something")
true            // Obviously
1, -5, 3.14     // Any number except 0
"hello", "0"    // Any string with content (even "false"!)
[], [1,2,3]     // ALL arrays (even empty ones!)
{}, {a: 1}      // ALL objects (even empty ones!)
```

#### Why This Matters - Real Examples

```javascript
// Real-World Use Cases

// 1. Check if user entered their name
let username = "";  // Empty string is falsy
if (username) {
  console.log(`Welcome, ${username}!`);
} else {
  console.log("Please enter your name");  // This runs!
}

// 2. Check if shopping cart has items
let cartItems = 0;  // Zero is falsy
if (cartItems) {
  console.log(`You have ${cartItems} items`);
} else {
  console.log("Your cart is empty");  // This runs!
}

// 3. Check if data was fetched
let userData = null;  // Null is falsy
if (!userData) {  // ! flips falsy to true
  console.log("Loading user data...");  // This runs!
}

// 4. The Pro Move - Quick Existence Check
const score = 100;
if (score) {  // Any non-zero number is truthy
  console.log(`Your score: ${score}`);  // This runs!
}
```

### 2. Making Decisions: IF/ELSE Statements

#### The Universal Decision Maker
Think of IF/ELSE like a GPS giving directions:
- IF (road is clear) → go straight
- ELSE IF (road blocked) → take detour
- ELSE → turn around

#### Basic IF Statement
```javascript
// Simple Decision
const age = 16;

if (age >= 18) {
  console.log("You can vote! 🗳️");
}
// If age is less than 18, nothing happens

// Decision with Alternative
const password = "cat123";

if (password.length >= 8) {
  console.log("Strong password ✅");
} else {
  console.log("Password too short! ❌");
}

// Multiple Decisions (Grading System)
const score = 85;

if (score >= 90) {
  console.log("Grade: A - Excellent! 🌟");
} else if (score >= 80) {
  console.log("Grade: B - Great job! 👍");
} else if (score >= 70) {
  console.log("Grade: C - Good effort! 👌");
} else if (score >= 60) {
  console.log("Grade: D - Keep trying! 💪");
} else {
  console.log("Grade: F - Need to study more 📚");
}

// Real-World Example: Shipping Calculator
const orderTotal = 75;
let shippingCost;

if (orderTotal >= 100) {
  shippingCost = 0;  // Free shipping!
  console.log("🎉 FREE SHIPPING!");
} else if (orderTotal >= 50) {
  shippingCost = 5;
  console.log("Shipping: $5");
} else {
  shippingCost = 10;
  console.log("Shipping: $10");
}

console.log(`Total with shipping: $${orderTotal + shippingCost}`);
```

#### The Ternary Operator: The Cool One-Liner

The ternary operator is like a compact IF/ELSE for simple decisions. It's called "ternary" because it has three parts.

**Formula:** `condition ? valueIfTrue : valueIfFalse`

Think of `?` as "then" and `:` as "otherwise"

```javascript
// Ternary Examples - From Simple to Advanced

// Basic: Can they drink?
const age = 21;
const canDrink = age >= 21 ? "Yes 🍺" : "No 🥤";
console.log(`Can drink alcohol? ${canDrink}`);

// Setting defaults
const username = "";
const displayName = username ? username : "Guest";
// Even shorter: const displayName = username || "Guest";

// Pluralization (super common!)
const items = 1;
const itemText = `You have ${items} item${items !== 1 ? 's' : ''}`;
console.log(itemText);  // "You have 1 item" (no 's')

// Nested ternary (use sparingly - can get confusing)
const score = 85;
const grade = score >= 90 ? 'A' :
              score >= 80 ? 'B' :
              score >= 70 ? 'C' :
              score >= 60 ? 'D' : 'F';
console.log(`Your grade: ${grade}`);

// Real-world: Setting CSS classes
const isLoggedIn = true;
const buttonClass = isLoggedIn ? 'btn-logout' : 'btn-login';
const buttonText = isLoggedIn ? 'Log Out' : 'Log In';
console.log(`<button class="${buttonClass}">${buttonText}</button>`);
```

### 3. JavaScript's Shortcuts: Short-Circuit Evaluation

#### The Concept (This Blew My Mind as a Beginner!)
JavaScript is lazy (in a good way). When checking conditions, it stops as soon as it knows the answer.

#### OR (||) - The Default Value Operator
**Rule:** Returns the FIRST truthy value it finds (or the last value if all are falsy)

**Mental Model:** "Give me this OR that as a backup"

#### AND (&&) - The Guard Operator  
**Rule:** Returns the FIRST falsy value it finds (or the last value if all are truthy)

**Mental Model:** "Do this ONLY IF that exists"

```javascript
// OR (||) - Setting Defaults

// Example 1: User input with fallback
let userColor = "";  // User didn't pick a color
const themeColor = userColor || "blue";  // Use blue as default
console.log(`Theme color: ${themeColor}`);  // "Theme color: blue"

// Example 2: Configuration with defaults
const config = {
  // port might not be defined
};
const port = config.port || 3000;  // Default to 3000
console.log(`Server running on port ${port}`);

// Example 3: Chaining fallbacks
const primaryServer = null;
const backupServer = null;
const defaultServer = "server3.com";
const activeServer = primaryServer || backupServer || defaultServer;
console.log(`Connecting to: ${activeServer}`);  // "server3.com"

// AND (&&) - Safe Property Access

// Example 1: Prevent crashes
const user = null;
// This would crash: user.name
// This is safe:
user && console.log(user.name);  // Nothing happens, no crash!

// Example 2: Conditional execution
const isLoggedIn = true;
const username = "Alice";
isLoggedIn && console.log(`Welcome back, ${username}!`);

// Example 3: Nested property access
const data = {
  user: {
    profile: {
      name: "Bob"
    }
  }
};
// Safe deep access
const name = data && data.user && data.user.profile && data.user.profile.name;
console.log(name);  // "Bob"

// Modern alternative (optional chaining - we'll learn this later)
// const name = data?.user?.profile?.name;
```

### 4. The SWITCH Statement: The Menu System

#### When to Use Switch
Use SWITCH when you're checking one variable against many specific values. It's like a restaurant menu - pick one option from a list.

**Perfect for:**
- Menu selections
- Command processing 
- Day/month handling
- Status codes

```javascript
// Basic Switch Example
const dayNumber = 3;
let dayName;

switch (dayNumber) {
  case 1:
    dayName = "Monday";
    break;  // CRITICAL: Without break, it falls through!
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  case 7:
    dayName = "Sunday";
    break;
  default:  // Like 'else' - catches everything else
    dayName = "Invalid day";
}
console.log(dayName);  // "Wednesday"

// Real-World: Game Command System
const userAction = "attack";

switch (userAction) {
  case "attack":
    console.log("⚔️ You swing your sword!");
    console.log("Enemy takes 10 damage");
    break;
    
  case "defend":
    console.log("🛡️ You raise your shield!");
    console.log("Damage reduced by 50%");
    break;
    
  case "heal":
    console.log("💚 You drink a potion!");
    console.log("Health restored by 25");
    break;
    
  case "run":
    console.log("🏃 You flee from battle!");
    break;
    
  default:
    console.log("❓ Unknown action");
}

// Advanced: Multiple Cases, Same Action
const month = "December";

switch (month) {
  case "December":
  case "January":
  case "February":
    console.log("❄️ It's winter!");
    break;
    
  case "March":
  case "April":
  case "May":
    console.log("🌸 It's spring!");
    break;
    
  case "June":
  case "July":
  case "August":
    console.log("☀️ It's summer!");
    break;
    
  case "September":
  case "October":
  case "November":
    console.log("🍂 It's autumn!");
    break;
    
  default:
    console.log("Unknown month");
}
```

### 5. Loops: Making Your Computer Do the Repetitive Work

#### Why Loops? The Power of Automation
Imagine clicking "like" on 1000 posts manually vs. writing a loop that does it in milliseconds. That's the power of loops!

#### The Loop Family - Each Has Its Specialty

**1. FOR Loop** - When you know how many times
- "Do this exactly 10 times"
- Perfect for: Countdowns, fixed iterations, array indices

**2. WHILE Loop** - When you have a condition
- "Keep going while the user wants more"
- Perfect for: User input, games, unknown iterations

**3. DO...WHILE Loop** - At least once, then check
- "Try this, then see if we should continue"
- Perfect for: Menus, validation retries

**4. FOR...OF Loop** - The modern array iterator
- "Go through each item in this collection"
- Perfect for: Arrays, strings (anything iterable)

```javascript
// ==================
// 1. FOR LOOP - The Counting Loop
// ==================

// Basic counting
for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}
// Output: Count: 1, Count: 2, ..., Count: 5

// Countdown
for (let i = 10; i >= 0; i--) {
  console.log(i === 0 ? "🚀 BLASTOFF!" : i);
}

// Array with index
const fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}
// Output: 1. apple, 2. banana, 3. orange

// ==================
// 2. WHILE LOOP - The Condition Loop
// ==================

// Keep asking until valid
let userAge = 0;  // Invalid age
let attempts = 0;

while (userAge <= 0 || userAge > 120) {
  // In real code, you'd get user input here
  userAge = 25;  // Simulating user input
  attempts++;
  
  if (attempts > 3) {
    console.log("Too many attempts!");
    break;
  }
}

// Game loop
let playerHealth = 100;
let enemyHealth = 100;

while (playerHealth > 0 && enemyHealth > 0) {
  // Simulate combat
  enemyHealth -= 20;  // Player attacks
  playerHealth -= 10;  // Enemy attacks
  console.log(`Player: ${playerHealth} HP, Enemy: ${enemyHealth} HP`);
}

console.log(playerHealth > 0 ? "You win! 🏆" : "Game Over 💀");

// ==================
// 3. DO...WHILE - The "At Least Once" Loop
// ==================

let choice;
do {
  // This runs at least once, even if choice is already 4
  console.log("\nMenu:");
  console.log("1. Start Game");
  console.log("2. Options");
  console.log("3. High Scores");
  console.log("4. Quit");
  
  // Simulate user choice
  choice = 4;  // User selects quit
  
} while (choice !== 4);  // Keep showing until user quits

console.log("Thanks for playing!");

// ==================
// 4. FOR...OF - The Modern Iterator
// ==================

// Arrays
const shoppingCart = ["milk", "eggs", "bread"];
for (const item of shoppingCart) {
  console.log(`✓ ${item}`);
}

// Strings (each character)
const word = "Hello";
for (const letter of word) {
  console.log(letter.toUpperCase());
}
// Output: H E L L O

// With array methods (preview of functional programming)
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (const num of numbers) {
  doubled.push(num * 2);
}
console.log(doubled);  // [2, 4, 6, 8, 10]
```

#### FOR...IN - The Object Property Loop

**Use Case:** When you need to go through an object's properties

```javascript
// Basic object iteration
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
  job: "Developer"
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Alice
// age: 30
// city: New York
// job: Developer

// Real-world: Form validation
const formData = {
  username: "alice123",
  email: "alice@example.com",
  password: "securePass123",
  age: 25
};

const errors = [];
for (const field in formData) {
  if (!formData[field]) {
    errors.push(`${field} is required`);
  }
}

if (errors.length > 0) {
  console.log("Form errors:", errors);
} else {
  console.log("Form is valid! ✅");
}

// Warning: for...in can be tricky with inherited properties
// Usually safer to use Object.keys() or Object.entries()
Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});
```

#### Loop Control: BREAK and CONTINUE

**BREAK** = Emergency exit ("Stop everything!")
**CONTINUE** = Skip this one ("Next, please!")

```javascript
// ==================
// BREAK - The Emergency Exit
// ==================

// Finding something in a list
const users = ["Alice", "Bob", "Charlie", "Admin", "David"];

for (const user of users) {
  console.log(`Checking ${user}...`);
  
  if (user === "Admin") {
    console.log("🔴 Admin found! Stopping search.");
    break;  // Exit immediately
  }
}
// Only checks: Alice, Bob, Charlie, Admin (stops there)

// Password attempts
let attempts = 0;
const maxAttempts = 3;
let correctPassword = false;

while (attempts < maxAttempts) {
  attempts++;
  
  // Simulate password check
  const password = "guess123";
  
  if (password === "correct123") {
    correctPassword = true;
    console.log("✅ Access granted!");
    break;  // No need to continue checking
  }
  
  console.log(`❌ Wrong password. ${maxAttempts - attempts} attempts left.`);
}

if (!correctPassword) {
  console.log("🔒 Account locked!");
}

// ==================
// CONTINUE - The Skipper
// ==================

// Skip certain items
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Even numbers only:");
for (const num of numbers) {
  if (num % 2 !== 0) {
    continue;  // Skip odd numbers
  }
  console.log(num);
}
// Output: 2, 4, 6, 8, 10

// Process valid data only
const data = ["valid", "", "good", null, "ok", undefined, "fine"];

for (const item of data) {
  if (!item) {  // Skip falsy values
    console.log("Skipping invalid data...");
    continue;
  }
  
  console.log(`Processing: ${item}`);
}
// Processes: "valid", "good", "ok", "fine"

// ==================
// NESTED LOOPS - Breaking Out
// ==================

// Finding in a grid (like Battleship game)
const grid = [
  [".", ".", "."],
  [".", "X", "."],  // X marks the spot!
  [".", ".", "."]
];

let found = false;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    console.log(`Checking position [${row}][${col}]...`);
    
    if (grid[row][col] === "X") {
      console.log(`💰 Treasure found at [${row}][${col}]!`);
      found = true;
      break;  // Only breaks inner loop!
    }
  }
  
  if (found) break;  // Break outer loop too
}
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [JavaScript if else (tutorial) (Programming with Mosh)](https://www.youtube.com/watch?v=IsG4Xd6LlsM)
- [JavaScript Loops — Practical Guide (Net Ninja)](https://www.youtube.com/watch?v=s9wW2PpJsmQ)

## References
- MDN: [Control Flow and Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- MDN: [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

## Reflection
- Which loop construct felt most natural? Why?
- How can you use short-circuiting to make your code safer?
- When would a ternary operator be a better choice than a full `if/else` statement?

Great job. Next, Lesson 05 dives into functions and closures—the heart of reusable, modular JavaScript.
