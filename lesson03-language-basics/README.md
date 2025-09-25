# Lesson 03 · Language Basics

It’s time to write real JavaScript. Today I’ll teach you about primitives, variables, and operators—the raw ingredients of every program. By mastering these fundamentals you’ll be able to express logic clearly and avoid the confusion that plagues beginners.

## Objectives
- Distinguish between JavaScript's two main data type categories: primitives and objects.
- Understand the 7 primitive types.
- Learn the difference between `var`, `let`, and `const`, and see why `var` is avoided.
- Practice with arithmetic, comparison, and logical operators.
- Learn to convert types explicitly and avoid the pitfalls of implicit coercion.

## The Big Ideas
JavaScript is dynamically typed, meaning a variable can hold different types of data over time. This flexibility is powerful, but it requires you to be deliberate. This lesson provides the mental model for how values behave and how to handle them safely.

## Lesson Narrative


### 1. Variables: Containers for Values
Think of a variable as a labeled box where you can store a value.

- `const`: Use for values that **will not be reassigned**. The box is "read-only."
- `let`: Use for values that you expect **to change**. The contents of the box can be replaced.
- `var`: The old way. It has tricky scoping rules, so you should **avoid using it** in modern code.

```javascript
// script.js

// The name of the course won't change.
const courseName = "Mastering JavaScript";

// Our progress will change as we complete lessons.
let lessonsCompleted = 2;

console.log(`Welcome to ${courseName}!`);
console.log(`You have completed ${lessonsCompleted} lessons.`);

// Let's update our progress.
lessonsCompleted = 3;
console.log(`You have now completed ${lessonsCompleted} lessons. Great work!`);
```

#### The Problem with `var`
`var` is function-scoped, not block-scoped. This means it can "leak" out of loops and conditionals, causing bugs. Watch this:

```javascript
// var-problem.js
for (var i = 0; i < 5; i++) {
  console.log(i); // Prints 0, 1, 2, 3, 4
}
console.log("After the loop, i is:", i); // Prints 5. The variable 'i' leaked out!

for (let j = 0; j < 5; j++) {
  console.log(j);
}
// console.log(j); // This would cause an error, because 'j' only exists inside the loop block. This is the behavior you want!
```

### 2. JavaScript's Two Type Categories
Every value in JavaScript fits into one of two categories:

1.  **Primitive Types:** The fundamental, immutable building blocks. When you pass them around, you are passing their actual value.
2.  **Object Types:** Complex, mutable structures for holding collections of data. When you pass them, you are passing a *reference* (like a pointer) to their location in memory.

#### Primitives: The Building Blocks
- **String:** Text. Must be in quotes. `const greeting = "Hello, world!";`
- **Number:** Both integers and floating-point numbers. `const userAge = 30; const price = 19.99;`
- **Boolean:** Represents `true` or `false`. `const isLoggedIn = true;`
- **Null:** Represents the intentional absence of a value. `let currentUser = null; // No one is logged in yet.`
- **Undefined:** The default value of a variable that has been declared but not yet assigned. `let userAddress;`
- **Symbol:** A unique, anonymous identifier. `const uniqueId = Symbol('id');`
- **BigInt:** For integers larger than the standard `Number` type can hold. `const veryLargeNumber = 9007199254740991n;`

#### Objects: Collections of Data
Anything that isn't a primitive is an object. This includes arrays, functions, and object literals. We will cover these in depth later, but for now, just know they exist.

```javascript
const person = {
  name: "Alice",
  age: 30
};
```
This context is key to understanding a famous JavaScript quirk: `typeof null` returns `"object"`. This is a bug from the dawn of JavaScript that can't be fixed, but now you know why the category exists!

### 3. Operators in Action
Operators are the symbols we use to perform actions on our variables and values.

- **Arithmetic:** `+`, `-`, `*`, `/` (division), `%` (remainder), `**` (exponent).
- **Comparison:** `===` (strict equality), `!==` (strict inequality). **Always use these!** Avoid `==` and `!=` which perform unpredictable type coercion.
- **Logical:** `&&` (AND), `||` (OR), `!` (NOT).

Modern string formatting uses **template literals** (backticks `` ` ``) which are more readable than concatenation with `+`.

```javascript
// operators.js
const name = "Jordan";
const age = 25;

// Template Literal
console.log(`User ${name} is ${age} years old.`);

// Comparison
console.log('Is user an adult?', age >= 18); // true
```

### 4. Type Conversion: The Safe and the Risky
Because JavaScript is flexible, you sometimes need to convert values from one type to another.

#### The Safe Way: Explicit Conversion
Always be direct. Tell JavaScript exactly what you want.

```javascript
// conversion.js
const stringValue = "42";
const numberValue = Number(stringValue);
console.log(numberValue + 1); // 43

const numericValue = 100;
const textValue = String(numericValue);
console.log(textValue + " dollars"); // "100 dollars"

// Any non-zero number is true, 0 is false. Any non-empty string is true.
console.log(Boolean("hello")); // true
console.log(Boolean(0));     // false
```

#### The Risky Way: Implicit Coercion
This is when JavaScript tries to guess the type. It is a common source of bugs.

```javascript
// coercion-dangers.js
console.log("5" + 5);   // "55" (number becomes a string)
console.log("5" - 1);   // 4 (string becomes a number)
console.log("5" * 2);   // 10 (string becomes a number)
console.log(0 == false); // true (avoid `==`!)
console.log('' == false); // true (avoid `==`!)
```
Understand that this happens, but don't rely on it. **Always convert explicitly.**

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [JavaScript Numbers, Number Methods, isNaN | JavaScript Tutorial for Beginners (Dave Gray)](https://www.youtube.com/watch?v=3Ul9gYweEPs)
- [JavaScript Strings (Programming with Mosh)](https://www.youtube.com/watch?v=09BwruU4kiY)

## References
- MDN: [Data Types and Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- MDN: [Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)

## Reflection Questions
- When did you reach for `let` instead of `const`, and why?
- Which coercion rule surprised you the most?
- How confident do you feel explaining primitives to another beginner?

Next up: Lesson 04 dives into control flow—conditionals and loops that let us actually make decisions in code.
