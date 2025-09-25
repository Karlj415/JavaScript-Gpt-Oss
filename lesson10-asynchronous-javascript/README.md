# Lesson 10 · Asynchronous JavaScript

Today I’ll demystify asynchronous programming. We’ll cover the event loop (in depth), callbacks, promises, and `async/await`. By the end, you’ll confidently orchestrate operations that take time, like network requests and timers.

## Objectives
- Understand the difference between the microtask and macrotask queues in the Event Loop.
- Recognize "callback hell" and know how to refactor it.
- Create new promises using the `Promise` constructor.
- Chain promises with `.then`, `.catch`, and `.finally`.
- Use all promise combinators: `all`, `race`, `allSettled`, and `any`.
- Write clean, readable asynchronous code with `async/await`.

## Lesson Narrative

### 1. Why Asynchrony Exists
JavaScript runs on a single thread. If a long-running task (like a network request) were synchronous, it would block the entire thread, freezing the user interface. Asynchronous operations allow us to hand off a task to the browser/Node.js runtime and run a callback function when the task is complete, keeping the application responsive.

### 2. The Event Loop In-Depth: Microtasks and Macrotasks
The Event Loop prioritizes tasks. There are two main queues:
- **Microtask Queue:** Higher priority. Holds callbacks for promises (`.then`, `.catch`, `.finally`). This queue is fully emptied before the browser does anything else (like rendering or running the next macrotask).
- **Macrotask Queue (or Task Queue):** Lower priority. Holds callbacks for `setTimeout`, `setInterval`, and I/O operations.

This distinction is crucial for predicting execution order:
```javascript
// execution-order.js
console.log('1. Sync Start');

setTimeout(() => console.log('4. Timeout (Macrotask)'), 0);

Promise.resolve().then(() => console.log('3. Promise (Microtask)'));

console.log('2. Sync End');

// Output Order: 1, 2, 3, 4
// The microtask (Promise) always runs before the next macrotask (setTimeout).
```

### 3. Callbacks: The Starting Point
Callbacks are the original async pattern. They are functions passed as arguments to be executed later.

#### The "Pyramid of Doom"
When you need to perform multiple async operations in sequence, you get deeply nested callbacks, which are hard to read and maintain.
```javascript
// callback-hell.js
firstAsyncOperation(input, (result1, err) => {
  if (err) {
    handleError(err);
  } else {
    secondAsyncOperation(result1, (result2, err) => {
      if (err) {
        handleError(err);
      } else {
        thirdAsyncOperation(result2, (result3, err) => {
          // ...and so on
        });
      }
    });
  }
});
```

### 4. Promises: A Better Way
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.

#### Creating a Promise
You can "promisify" a callback-based function using the `Promise` constructor.
```javascript
// create-promise.js
function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      return reject(new Error("Delay cannot be negative"));
    }
    setTimeout(() => {
      resolve(`Waited ${ms}ms`);
    }, ms);
  });
}

delay(500)
  .then(message => console.log(message)) // "Waited 500ms"
  .catch(error => console.error(error));
```

#### Consuming and Chaining Promises
- `.then(onFulfilled)`: Runs when the promise succeeds.
- `.catch(onRejected)`: Runs when the promise fails.
- `.finally(onFinally)`: Runs regardless of success or failure (for cleanup).

```javascript
// consume-promise.js
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Fetch failed:', error);
  })
  .finally(() => {
    console.log('Fetch operation finished.');
  });
```

### 5. `async/await`: The Modern Standard
`async/await` is syntactic sugar over promises, letting you write async code that looks synchronous.

```javascript
// async-await.js
async function loadData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Could not load data:', error);
  }
}
loadData();
```

#### Running Promises in Parallel
- `Promise.all([...])`: Fulfills when **all** promises fulfill. Rejects if **any** promise rejects (fail-fast).
- `Promise.race([...])`: Fulfills or rejects as soon as the **first** promise fulfills or rejects.
- `Promise.allSettled([...])`: Fulfills when **all** promises have settled (either fulfilled or rejected). Great for when you need all results, regardless of success.
- `Promise.any([...])`: Fulfills as soon as the **first** promise fulfills. Rejects only if **all** promises reject.

#### Top-Level `await`
In modern JavaScript modules, you can use `await` outside of an `async` function.
```javascript
// In a file treated as an ES module (e.g., <script type="module">)
const data = await fetch('https://api.example.com/data').then(r => r.json());
console.log(data);
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [What the heck is the event loop anyway? (Philip Roberts)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Promises in 10 Minutes (Web Dev Simplified)](https://www.youtube.com/watch?v=DHvZLI7Db8E)

## References
- MDN: [Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- MDN: [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- MDN: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- MDN: [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

## Reflection
- Explain the output of the microtask/macrotask example in your own words.
- When would you use `Promise.all` vs. `Promise.allSettled`?
- How does `async/await` improve upon `.then()` chains for error handling?

Next, Lesson 11 explores modules, npm, and the tooling that keeps large applications maintainable.