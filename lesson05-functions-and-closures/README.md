# Lesson 05 · Functions and Closures

Today I’ll teach you to think in functions—the primary building blocks of JavaScript. We’ll cover declarations, expressions, arrow functions, parameters, return values, the `this` keyword, and the magical concept of closures.

## Objectives
- Define functions using declarations, expressions, and all arrow function syntaxes.
- Understand parameters, default values, and rest arguments.
- Grasp the basics of the `this` keyword and how arrow functions treat it differently.
- Distinguish between pure and impure functions.
- Understand what closures are and why they’re powerful.
- Recognize and use higher-order functions and callbacks.

## Why Functions Matter
Functions help you organize logic, avoid repetition, and build reusable components. Closures and higher-order functions are cornerstones of advanced programming patterns, from module systems to modern frontend frameworks. You can’t master JavaScript without internalizing them.

## Lesson Narrative

### 1. Ways to Define a Function

**Function Declaration:**
Hoisted to the top of its scope. You can call it before it’s defined.
```javascript
// Hoisting allows this to work
greet("Alice");

function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

**Function Expression:**
Not hoisted. The function is anonymous, assigned to a variable. It can't be called before the assignment.
```javascript
const greet2 = function(name) {
  console.log(`Hello, ${name}!`);
};
greet2("Bob");
```

**Arrow Function (ES6+):**
Concise syntax, not hoisted, and has a special behavior with the `this` keyword.
```javascript
const greet3 = (name) => {
  console.log(`Hello, ${name}!`);
};
greet3("Charlie");
```

#### Arrow Function Flavors
- **Implicit Return:** If the function body is a single expression, you can omit the curly braces and the `return` keyword.
  `const add = (a, b) => a + b;`
- **Single Parameter:** If there's only one parameter, you can omit the parentheses around it.
  `const square = x => x * x;`

### 2. The `this` Keyword: A Quick Look
The `this` keyword refers to the object a function is a property of—its "calling context." This can be confusing.

**The Problem:** In traditional functions, `this` can change unexpectedly, especially inside callbacks.
```javascript
// this-problem.js
const user = {
  name: "Diana",
  actions: ["post", "comment", "like"],
  showActions: function() {
    // 'this' here correctly refers to the 'user' object
    this.actions.forEach(function(action) {
      // PROBLEM: 'this' inside this callback is NOT the user object!
      // It's 'undefined' in strict mode. This code will crash.
      console.log(`${this.name} can ${action}`);
    });
  }
};
// user.showActions(); // TypeError: Cannot read properties of undefined (reading 'name')
```

**The Arrow Function Solution:** Arrow functions don’t have their own `this`. They inherit it from their parent scope. This makes them perfect for callbacks.
```javascript
// this-solution.js
const user = {
  name: "Diana",
  actions: ["post", "comment", "like"],
  showActions: function() {
    this.actions.forEach(action => {
      // SOLUTION: The arrow function inherits 'this' from showActions.
      console.log(`${this.name} can ${action}`);
    });
  }
};
user.showActions(); // Works perfectly!
```

### 3. Parameters and Return Values
- **Default Parameters:** Make your functions more robust by providing default values.
  `function createGreeting(name = "friend") { return `Hello, ${name}!`; }`
- **Rest Parameters:** Gather an indefinite number of arguments into a single array.
  `function sumAll(...numbers) { return numbers.reduce((total, n) => total + n, 0); }`
- **Return:** A function that doesn’t explicitly `return` a value will implicitly return `undefined`.

### 4. Pure vs. Impure Functions
- **Pure Function:** Given the same input, always returns the same output and has no "side effects" (e.g., modifying external state, logging to console, writing to a file).
- **Impure Function:** May have side effects or return different values for the same input.

```javascript
// pure-vs-impure.js

// PURE: Predictable and testable.
const multiply = (a, b) => a * b;

// IMPURE: Modifies state outside of itself.
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

// IMPURE: Has a side effect (logging to console).
function logMessage(message) {
  console.log(message);
}
```
Strive to use pure functions when possible. They are easier to reason about, debug, and test.

### 5. Closures Demystified
A closure is when a function "remembers" the variables from its outer scope, even after that outer function has finished executing.

```javascript
// closure-counter.js
function createCounter() {
  let count = 0; // This variable is "closed over"

  return function increment() {
    count += 1;
    return count;
  };
}

const counterA = createCounter(); // Creates one scope
const counterB = createCounter(); // Creates a separate scope

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterB()); // 1 (independent of counterA)
```
Here, the inner `increment` function maintains a private reference to its own `count` variable. This is the foundation for privacy and stateful functions in JavaScript.

### 6. Higher-Order Functions and Callbacks
- **Higher-Order Function:** A function that takes another function as an argument, or returns a function.
- **Callback Function:** A function that is passed into another function as an argument, to be "called back" later.

```javascript
// callbacks.js

// `processUserInput` is a higher-order function.
// `greetingCallback` is a callback function.
function processUserInput(callback) {
  const name = "Zoe"; // Imagine this came from a prompt
  callback(name);
}

function greetingCallback(name) {
  console.log(`Hello, ${name}!`);
}

processUserInput(greetingCallback); // Prints "Hello, Zoe!"
```
Array methods like `.map()`, `.filter()`, and `.reduce()` are the most common higher-order functions you'll use.

### 7. Bonus Pattern: IIFE
An **I**mmediately **I**nvoked **F**unction **E**xpression is a function that is defined and executed right away. In the past, it was used to create a private scope to avoid polluting the global namespace.

```javascript
(function() {
  const privateMessage = "This is a secret.";
  console.log(privateMessage);
})();
// privateMessage is not accessible out here.
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [JavaScript Closures Explained (Fun Fun Function)](https://www.youtube.com/watch?v=71AtaJpJHw0)
- [Higher-Order Functions by Example (Frontend Masters Snippet)](https://www.youtube.com/watch?v=BMUiFMZr7vk)
- [The `this` keyword in JavaScript (Web Dev Simplified)](https://www.youtube.com/watch?v=gvicrj31JOM)

## References
- MDN: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- Kyle Simpson, *You Don’t Know JS Yet*, Chapter "Scope & Closures".

## Reflection
- How would you explain closures to someone new?
- When would you choose an arrow function over a traditional function expression?
- Find an example of an impure function in your own code. How could you make it pure?

In Lesson 06 we’ll expand to arrays and objects—the data structures you’ll handle every day.