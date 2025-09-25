# Lesson 13 · Advanced Patterns

Today I’ll teach you the patterns seasoned developers use to write clean, scalable, and powerful JavaScript. We’ll explore advanced functional techniques, metaprogramming, and common design patterns tailored for the language.

## Objectives
- Apply functional patterns like pure functions, composition, and memoization.
- Implement common design patterns: Module, Factory, Observer, and Singleton.
- Create custom, pausable iterators with Generator functions.
- Intercept and customize object behavior with `Proxy` and `Reflect`.
- Use object composition and mixins to share behavior without deep inheritance.

## Lesson Narrative

### 1. Advanced Functional Programming

#### Function Composition
This is the act of creating a new function by piping the output of one function into the input of another. It creates clear, reusable data-processing pipelines.

```javascript
// composition.js
const compose = (...fns) => value => fns.reduceRight((acc, fn) => fn(acc), value);

const trim = str => str.trim();
const toUpperCase = str => str.toUpperCase();
const exclaim = str => `${str}!`;

// This pipeline will trim, uppercase, and then add an exclamation mark.
const shout = compose(exclaim, toUpperCase, trim);

console.log(shout("  hello world  ")); // "HELLO WORLD!"
```

#### Memoization
Memoization is a caching technique. You create a higher-order function that wraps another function and stores the results for given inputs. Subsequent calls with the same input return the cached result instead of re-computing.

```javascript
// memoization.js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowFibonacci = (n) => {
  if (n < 2) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

const fastFib = memoize(slowFibonacci);
console.time("fib");
console.log(fastFib(40));
console.timeEnd("fib"); // First call is slow

console.time("fib-cached");
console.log(fastFib(40));
console.timeEnd("fib-cached"); // Second call is instantaneous
```

### 2. Common Design Patterns in JavaScript

**Module Pattern:** Encapsulates private state using closures. Before ES Modules, this was the primary way to create private variables.
```javascript
const counter = (() => {
  let privateCount = 0;
  return {
    increment: () => privateCount++,
    getCount: () => privateCount,
  };
})();
```

**Factory Pattern:** A function that creates and returns objects. It abstracts away the complexity of object creation.
```javascript
function createPerson(name) {
  return { name, greet: () => `Hello, I am ${name}` };
}
```

**Observer Pattern:** An object (the "subject") maintains a list of dependents ("observers") and notifies them of any state changes. This is the foundation of event emitters and reactive frameworks.
```javascript
class NewsPublisher {
  subscribers = new Set();
  subscribe(observer) { this.subscribers.add(observer); }
  unsubscribe(observer) { this.subscribers.delete(observer); }
  notify(news) { this.subscribers.forEach(obs => obs.update(news)); }
}
```

**Singleton Pattern:** Ensures a class has only one instance and provides a global point of access to it.
```javascript
class DatabaseConnection {
  static instance;
  constructor() { /* ... */ }
  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
```

### 3. Iterators and Generators
**Generators** are special functions (`function*`) that can be paused and resumed, allowing you to create custom iterators.

```javascript
// generators.js
function* createIdGenerator() {
  let id = 1;
  while (true) {
    yield id++; // 'yield' pauses the function and returns the value
  }
}

const idGen = createIdGenerator();
console.log(idGen.next().value); // 1
console.log(idGen.next().value); // 2
console.log(idGen.next().value); // 3
```
This is powerful for handling large data sets, streams, or infinite sequences without holding everything in memory.

### 4. Metaprogramming: Proxy and Reflect
Metaprogramming is writing code that acts on other code. `Proxy` lets you intercept and redefine fundamental operations of an object.

```javascript
// proxy.js
const user = { name: "John", age: 30 };

const userProxy = new Proxy(user, {
  get(target, prop) {
    console.log(`Getting property '${prop}'`);
    return Reflect.get(target, prop); // Reflect provides the default behavior
  },
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError("Age must be a number.");
    }
    console.log(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  },
});

console.log(userProxy.name); // Logs "Getting..." and returns "John"
userProxy.age = 31; // Logs "Setting..."
// userProxy.age = "thirty-one"; // Throws TypeError
```
Frameworks like Vue.js use Proxies to create their reactivity systems.

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Functional Programming in JS (Anjana Vakil)](https://www.youtube.com/watch?v=e-5obm1G_FY)
- [Design Patterns in JavaScript (Dmitri Pavlutin)](https://www.youtube.com/watch?v=tv-_1er1mWI)

## References
- Eric Elliott: *Composing Software* (free online series).
- "Learning JavaScript Design Patterns" by Addy Osmani.
- MDN: [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- MDN: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Reflection
- When would a Generator be more appropriate than a simple array?
- How could you use a Proxy to create a read-only view of an object?
- Which design pattern do you think is most common in the frontend frameworks you’ve seen?

Lesson 14 targets performance tuning: measuring, profiling, and optimizing JavaScript.