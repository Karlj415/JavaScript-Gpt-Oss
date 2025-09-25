# Lesson 04 · Control Flow

With variables and operators under your belt, today I’ll show you how to direct the flow of your programs. Control flow statements give your code the power to react to data and repeat work efficiently.

## Objectives
- Understand and use truthy and falsy values in conditions.
- Use `if`, `else if`, and `else` to create logical branches.
- Employ the ternary operator for concise conditional assignments.
- Use logical short-circuiting (`&&` and `||`) for efficient control flow.
- Employ `switch` for multi-branch decisions based on a single value.
- Master looping with `for`, `while`, `do...while`, and `for...of`.
- Control loop execution with `break` and `continue`.

## Why Control Flow Matters
Every meaningful program makes decisions. Whether you’re validating user input or iterating over data, control flow is the steering wheel. I’ll teach you patterns that keep your logic expressive and prevent the “spaghetti code” trap.

## Lesson Narrative

### 1. The Foundation: Truthy and Falsy Values
In JavaScript, a condition doesn't have to be strictly `true` or `false`. Every value has an inherent boolean value.

**Falsy Values:** There are only six values that are considered `false` in a condition.
1.  `false`
2.  `0`
3.  `''` or `""` (empty string)
4.  `null`
5.  `undefined`
6.  `NaN` (Not a Number)

**Everything else is TRUTHY.** This includes non-empty strings (`"hello"`), numbers other than 0 (`42`), arrays (`[]`), and objects (`{}`).

This allows for more concise code:
```javascript
// truthy-falsy.js
let username = ""; // An empty string is falsy

if (!username) { // The ! operator turns a falsy value to true
  console.log("Username is required!");
}

let itemsInCart = 5; // A non-zero number is truthy
if (itemsInCart) {
  console.log(`You have ${itemsInCart} items in your cart.`);
}
```

### 2. Conditional Branching

#### `if / else if / else`
This is the most common way to make a decision.
```javascript
// weather.js
const temperature = 17;

if (temperature > 30) {
  console.log("It’s blazing outside.");
} else if (temperature >= 20) {
  console.log("Mild weather.");
} else {
  console.log("Grab a jacket.");
}
```

#### The Ternary Operator
The ternary operator (`? :`) is a compact alternative for a simple `if/else` that produces a value.

`condition ? valueIfTrue : valueIfFalse;`

```javascript
// ternary.js
const userAge = 21;

// Using if/else
let message;
if (userAge >= 18) {
  message = "Welcome, adult.";
} else {
  message = "Access denied.";
}

// Using the ternary operator - much cleaner!
const ternaryMessage = userAge >= 18 ? "Welcome, adult." : "Access denied.";

console.log(ternaryMessage);
```

### 3. Logical Operators as Control Flow (Short-Circuiting)
Logical operators `||` (OR) and `&&` (AND) stop evaluating as soon as the result is known.

- `||` returns the **first truthy** value (or the last value if all are falsy). Great for setting defaults.
- `&&` returns the **first falsy** value (or the last value if all are truthy). Great for guarding against errors.

```javascript
// short-circuiting.js

// Use || to provide a default username
const receivedUsername = null;
const currentUser = receivedUsername || "Guest";
console.log(`Welcome, ${currentUser}!`); // Welcome, Guest!

// Use && to access a property only if the object exists
const userProfile = { name: "Alice", email: "alice@example.com" };
// This is safer than userProfile.name because it won't crash if userProfile is null
userProfile && console.log(`Logged in as ${userProfile.name}`);
```

### 4. The `switch` Statement
Use `switch` when you have several branches based on a single value. It's often cleaner than a long `if/else if` chain.

```javascript
// command-runner.js
const command = "deploy";

switch (command) {
  case "build":
    console.log("Running build pipeline...");
    break; // The break is crucial!
  case "test":
    console.log("Executing tests...");
    break;
  case "deploy":
    console.log("Shipping to production!");
    break;
  default:
    console.log("Unknown command.");
}
```

### 5. Loops for Automation

#### `for`, `while`, and `do...while`
- **`for` loop:** The classic. Use when you know the number of iterations.
- **`while` loop:** Use when the iteration count is unknown and depends on a condition.
- **`do...while` loop:** Guarantees the loop body runs at least once.

#### `for...of` (for arrays and strings)
This is the most modern and readable way to loop over iterable values.

```javascript
// loop-demo.js
const todoList = ["Install Node", "Practice loops", "Commit code"];

for (const task of todoList) {
  console.log(`- ${task}`);
}
```

#### `for...in` (for object properties)
To iterate over the keys of an object, use `for...in`. Be aware that this can sometimes have surprising results with inheritance, so use it carefully.

```javascript
const user = { name: 'Bob', role: 'Admin' };
for (const key in user) {
    console.log(`${key}: ${user[key]}`); // name: Bob, role: Admin
}
```

#### `break` and `continue`
You can control a loop's execution from within:
- `continue`: Skips the rest of the current iteration and moves to the next one.
- `break`: Exits the loop entirely.

```javascript
// loop-control.js
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue; // Skip odd numbers
  }
  if (i > 8) {
    break; // Stop if the number is greater than 8
  }
  console.log(i); // Will print 2, 4, 6, 8
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
