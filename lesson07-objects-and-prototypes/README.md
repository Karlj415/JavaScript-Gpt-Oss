# Lesson 07 · Objects and Prototypes

Today I’ll show you how JavaScript’s object system really works. We’ll crack open the prototype chain and explore the two primary patterns for creating reusable object blueprints: the modern `class` syntax and the classic factory function.

## Objectives
- Understand how the prototype chain enables inheritance.
- Create objects using constructor functions and the modern `class` syntax.
- Use getters, setters, static methods, and private fields in classes.
- Check an object's type with the `instanceof` operator.
- Manage `this` explicitly with `.bind`, `.call`, and `.apply`.
- Understand and use the factory function pattern as an alternative to classes.

## Why This Matters
Object-oriented patterns are everywhere in the JavaScript ecosystem. Mastering prototypes and classes gives you a mental model for reading any codebase, while understanding alternatives like factory functions allows you to choose the right tool for the job.

## Lesson Narrative

### 1. The Prototype Chain
Every object in JavaScript has an internal link (`[[Prototype]]`) to another object. When you try to access a property, JavaScript walks up this chain until it finds the property or reaches the end (`null`).

```javascript
// prototype.js
const basePermissions = { canView: true };

// Create a user object whose prototype is basePermissions
const user = Object.create(basePermissions);
user.name = "Alice";

console.log(user.name); // "Alice" (own property)
console.log(user.canView); // true (from the prototype)
console.log(Object.getPrototypeOf(user) === basePermissions); // true
```

### 2. The Old Way: Constructor Functions
Before `class`, developers used functions and the `new` keyword to simulate classes.

```javascript
// constructor.js
function Course(title) {
  this.title = title;
}

Course.prototype.describe = function () {
  return `Course: ${this.title}`;
};

const jsCourse = new Course("Mastering JavaScript");
console.log(jsCourse.describe()); // "Course: Mastering JavaScript"
```
The `new` keyword is doing four things: 1. Creates a new empty object. 2. Sets that object's prototype to `Course.prototype`. 3. Calls `Course` with `this` bound to the new object. 4. Returns the new object.

### 3. The Modern Way: `class` Syntax (ES6+)
`class` is syntactic sugar over the prototype system, providing a much cleaner and more powerful syntax.

```javascript
// class.js
class Person {
  // Private field (ES2022) - truly private
  #birthYear;

  constructor(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.#birthYear = birthYear;
  }

  // Getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }

  // Instance Method
  getAge() {
    return new Date().getFullYear() - this.#birthYear;
  }

  // Static Method - belongs to the class, not the instance
  static from(personObject) {
    return new Person(personObject.firstName, personObject.lastName, personObject.birthYear);
  }
}

const alice = new Person("Alice", "Green", 1990);
console.log(alice.fullName); // "Alice Green"
console.log(alice.getAge()); // (current year - 1990)
// console.log(alice.#birthYear); // SyntaxError: Private field must be declared in an enclosing class

const bob = Person.from({ firstName: "Bob", lastName: "Ross", birthYear: 1942 });
console.log(bob.fullName); // "Bob Ross"
```

### 4. Checking Type: `instanceof`
The `instanceof` operator checks if an object appears anywhere in the prototype chain of a constructor.

```javascript
console.log(alice instanceof Person); // true
console.log(alice instanceof Object); // true (all objects inherit from Object)
```

### 5. Explicitly Setting `this`
Sometimes you need to tell a function what its `this` context should be.

- `.call(thisContext, arg1, arg2)`: Calls the function immediately with a specific `this`.
- `.apply(thisContext, [arg1, arg2])`: Same as `call`, but arguments are in an array.
- `.bind(thisContext)`: Returns a *new* function that is permanently bound to the given `this`.

```javascript
// bind-call-apply.js
function introduce(greeting) {
  console.log(`${greeting}, I am ${this.name}.`);
}

const person = { name: "Zelda" };

introduce.call(person, "Greetings"); // "Greetings, I am Zelda."
introduce.apply(person, ["Hi there"]); // "Hi there, I am Zelda."

const introduceZelda = introduce.bind(person);
introduceZelda("Good morning"); // "Good morning, I am Zelda."
```

### 6. Alternative: Factory Functions
A factory function is any function that is not a class or constructor but returns a new object. They don't use `new` or `this`, and rely on closures for privacy.

```javascript
// factory.js
function createLogger(prefix) {
  // The 'prefix' variable is kept private by the closure
  return {
    info: (message) => console.log(`[${prefix}] INFO: ${message}`),
    warn: (message) => console.log(`[${prefix}] WARN: ${message}`),
  };
}

const appLogger = createLogger("App");
appLogger.info("Application has started.");

const dbLogger = createLogger("Database");
dbLogger.warn("Connection unstable.");
```
**Pros:** Simpler, no `this` confusion, natural encapsulation.
**Cons:** Can be less performant if creating many instances, no standard way to check type (`instanceof`).

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [JavaScript Prototypes Deep Dive (Steven Griffith)](https://www.youtube.com/watch?v=GhbhD1HR5vk)
- [ES6 Classes Crash Course (Traversy Media)](https://www.youtube.com/watch?v=3e1GHCA3GP0)

## References
- MDN: [Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- MDN: [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- MDN: [Private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

## Reflection
- When would you choose a `class` over a factory function, and why?
- What are the benefits of using a private `#` field instead of just a property with an `_` prefix?
- How does `bind` differ from `call`?

Up next, Lesson 08 takes us into the browser where we’ll manipulate the DOM.