# Lesson 06 · Data Structures

Now that you’re wielding functions confidently, let’s master the collections that hold data in JavaScript. You’ll learn about arrays, objects, maps, and sets, and the modern, safe, and efficient patterns for manipulating them.

## Objectives
- Understand and apply the principle of immutability.
- Manipulate arrays using chained methods (`map`, `filter`, `reduce`).
- Iterate over objects using `Object.keys`, `Object.values`, and `Object.entries`.
- Safely access nested properties with Optional Chaining (`?.`) and provide smart defaults with Nullish Coalescing (`??`).
- Use `Map` and `Set` for specialized use cases.
- Apply destructuring, spread, and rest syntax for expressive code.
- Serialize and deserialize data with `JSON.stringify` and `JSON.parse`.

## Why This Matters
Almost every feature you build will involve transforming data. Knowing which structure to use and how to manipulate it safely and predictably—especially when dealing with external API data—is a critical professional skill.

## Lesson Narrative

### 1. The Principle of Immutability
Immutability means not changing data or data structures, but instead creating new ones with the updated values. This makes your code more predictable and easier to debug.

```javascript
// immutability.js
const user = { name: "Alex", status: "active" };

// BAD: Mutation - directly changing the original object
// const updatedUser = user;
// updatedUser.status = "inactive";
// console.log(user.status); // "inactive" -> The original object was changed unexpectedly!

// GOOD: Immutability - creating a new object with the changes
const updatedUser = { ...user, status: "inactive" };
console.log(user.status); // "active" -> The original is safe!
console.log(updatedUser.status); // "inactive"
```
**Always prefer immutable patterns**, especially with the spread (`...`) operator.

### 2. Arrays: Ordered Collections
Arrays are lists of values. Modern array manipulation focuses on chaining methods to produce a new array.

```javascript
// array-chaining.js
const scores = [82, 91, 65, 99, 74, 88];

// Chain methods to perform a complex transformation
const honorRoll = scores
  .filter(score => score >= 85) // 1. Find scores 85 or higher
  .map(score => `Student (Score: ${score})`) // 2. Transform them into strings
  .sort(); // 3. Sort the results

console.log(honorRoll); // [ 'Student (Score: 88)', 'Student (Score: 91)', 'Student (Score: 99)' ]
```
Key methods to know: `.map`, `.filter`, `.reduce`, `.find`, `.some`, `.every`, `.includes`.

### 3. Objects: Key-Value Pairs
Objects model entities. Use dot notation (`.`) for known properties and bracket notation (`[]`) for dynamic ones.

#### Iterating Over Objects
To loop over an object, use these static methods with a `for...of` loop:
- `Object.keys(obj)`: Returns an array of the object's keys.
- `Object.values(obj)`: Returns an array of the object's values.
- `Object.entries(obj)`: Returns an array of `[key, value]` pairs.

```javascript
// object-iteration.js
const student = { name: "Avery", cohort: "Spring", progress: 0.45 };

for (const key of Object.keys(student)) {
  console.log(key); // name, cohort, progress
}

for (const [key, value] of Object.entries(student)) {
  console.log(`${key}: ${value}`);
}
```

### 4. Safer Data Access (ES2020+)
When working with external data (e.g., from an API), you can't be sure if properties exist. These operators prevent common errors.

**Optional Chaining (`?.`)**: Stops an expression from causing an error if a nested property is `null` or `undefined`.
```javascript
// optional-chaining.js
const userA = { name: "Ben", address: { street: "123 Main St" } };
const userB = { name: "Carla" };

console.log(userA.address.street); // "123 Main St"
// console.log(userB.address.street); // CRASH! Cannot read properties of undefined
console.log(userB.address?.street); // undefined (No crash!)
```

**Nullish Coalescing (`??`)**: Provides a default value, but ONLY for `null` or `undefined`. This is better than `||`, which also overrides `0` and `''` (empty strings).
```javascript
// nullish-coalescing.js
const settings = { volume: 0, theme: "dark" };

const volume = settings.volume || 0.5; // 0.5 (Incorrect! 0 is a valid volume)
const betterVolume = settings.volume ?? 0.5; // 0 (Correct!)

const theme = settings.theme || "light"; // "dark"
const betterTheme = settings.theme ?? "light"; // "dark"
```

### 5. Destructuring and Spread/Rest
- **Destructuring**: Pulls values out of arrays or objects.
- **Spread (`...`)**: Copies values from one data structure into another.
- **Rest (`...`)**: Collects remaining values into an array or object.

```javascript
// destructuring-spread.js
const [firstLang, ...otherLangs] = ["JavaScript", "Python", "Rust"];
const { name, ...details } = { name: "Avery", cohort: "Spring", progress: 0.45 };

console.log(firstLang); // "JavaScript"
console.log(otherLangs); // ["Python", "Rust"]
console.log(name); // "Avery"
console.log(details); // { cohort: "Spring", progress: 0.45 }
```

### 6. Maps and Sets
- `Map`: An object-like structure where keys can be any type. Remembers insertion order.
- `Set`: A collection of unique values. Great for de-duplicating.

```javascript
// map-set.js
const duplicateTags = ["js", "node", "react", "js"];
const uniqueTags = new Set(duplicateTags);
console.log(uniqueTags); // Set { 'js', 'node', 'react' }
const uniqueTagsArray = [...uniqueTags]; // Use spread to convert back to an array
console.log(uniqueTagsArray); // ['js', 'node', 'react']
```

### 7. Working with JSON
JSON (JavaScript Object Notation) is the standard text format for sending data between web servers and browsers.

- `JSON.stringify()`: Converts a JavaScript object into a JSON string.
- `JSON.parse()`: Converts a JSON string back into a JavaScript object.

```javascript
// json-demo.js
const dataToSend = { userId: 123, message: "Hello!" };

// 1. You send this string over the network
const jsonString = JSON.stringify(dataToSend);
console.log("Sent:", jsonString);

// 2. The server receives the string and parses it back into an object
const receivedObject = JSON.parse(jsonString);
console.log("Received:", receivedObject.message);
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Array Methods In-Depth (Dev Ed)](https://www.youtube.com/watch?v=R8rmfD9Y5-c)
- [Destructuring & Spread Operator (Academind)](https://www.youtube.com/watch?v=NIq3qLaHCIs)

## References
- MDN: [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- MDN: [Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- MDN: [Optional Chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- MDN: [Nullish Coalescing Operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

## Reflection
- When would you choose a `Map` over a plain object?
- How does optional chaining simplify your code when dealing with potentially missing data?
- Describe a scenario where the `||` operator would give you a bug but `??` would work correctly.

In Lesson 07 we’ll explore prototypes, classes, and object-oriented thinking.