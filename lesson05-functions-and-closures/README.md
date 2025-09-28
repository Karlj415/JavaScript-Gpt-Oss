# Lesson 05 · Functions: Your Code's Reusable Recipe Cards

🎯 **Achievement Unlocked:** Today you learn to write code ONCE and use it EVERYWHERE!

Imagine having to write the same recipe every time you wanted to make cookies. Exhausting, right? Functions are like recipe cards - write once, use infinite times. Today, you'll master JavaScript's most powerful feature and understand the "magic" of closures that confuses even experienced developers!

## 🎯 Your Mission Objectives
- [ ] Write functions 3 different ways (and know when to use each)
- [ ] Pass data INTO functions (parameters) and get data OUT (return)
- [ ] Master arrow functions (the modern way)
- [ ] Understand `this` (the trickiest JavaScript concept)
- [ ] Grasp closures (functions with "memory")
- [ ] Use functions that take other functions (mind-blown!)

**Success Metric:** You can explain functions using cooking analogies and build a calculator using different function styles.

## 💡 Why Functions Change Everything

### Life Without Functions (The Dark Ages)
```javascript
// Calculating tips for 3 meals (WITHOUT functions)
let meal1 = 50;
let tip1 = meal1 * 0.20;
let total1 = meal1 + tip1;
console.log(`Total: $${total1}`);

let meal2 = 75;
let tip2 = meal2 * 0.20;
let total2 = meal2 + tip2;
console.log(`Total: $${total2}`);

let meal3 = 30;
let tip3 = meal3 * 0.20;
let total3 = meal3 + tip3;
console.log(`Total: $${total3}`);
// 😱 So much repetition!
```

### Life With Functions (The Enlightenment)
```javascript
// WITH functions - write once, use forever!
function calculateTotal(mealCost) {
    const tip = mealCost * 0.20;
    return mealCost + tip;
}

console.log(`Total: $${calculateTotal(50)}`);
console.log(`Total: $${calculateTotal(75)}`);
console.log(`Total: $${calculateTotal(30)}`);
// 🎉 Clean, reusable, maintainable!
```

Functions are the difference between amateur code and professional code!

## Lesson Narrative

### 1. Three Ways to Create Functions (Each Has Its Superpower!)

#### The Recipe Card Analogy
Think of functions like recipe cards in your kitchen:
- **Declaration** = Traditional recipe card (always available)
- **Expression** = Recipe in a cookbook (must open book first)
- **Arrow** = Quick note on a sticky note (modern and concise)

#### Method 1: Function Declaration (The Classic)
```javascript
// 🎯 SUPERPOWER: Can be called BEFORE it's defined (hoisting)
sayHello("Alice");  // This works! (called before definition)

function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

// Real-world example: Main program flow
runApp();  // Clean main code

function runApp() {
    const user = getUser();
    const greeting = createGreeting(user);
    displayGreeting(greeting);
}

function getUser() {
    return "Bob";
}

function createGreeting(user) {
    return `Welcome back, ${user}!`;
}

function displayGreeting(message) {
    console.log(message);
}
```

#### Method 2: Function Expression (The Variable Function)
```javascript
// 🎯 SUPERPOWER: Can be passed around like data
// calculateTax(100);  // ❌ ERROR! Can't use before definition

const calculateTax = function(amount) {
    return amount * 0.08;
};

calculateTax(100);  // ✅ Now it works: 8

// Why use this? You can store functions in objects!
const calculator = {
    add: function(a, b) { return a + b; },
    subtract: function(a, b) { return a - b; },
    multiply: function(a, b) { return a * b; },
    divide: function(a, b) { return a / b; }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.multiply(4, 7)); // 28
```

#### Method 3: Arrow Functions (The Modern Favorite) ⚡
```javascript
// 🎯 SUPERPOWER: Super concise + special 'this' behavior

// Full syntax (multiple lines)
const greetFormal = (firstName, lastName) => {
    const fullName = `${firstName} ${lastName}`;
    return `Good evening, ${fullName}`;
};

// One-liner (implicit return - no 'return' needed!)
const add = (a, b) => a + b;
console.log(add(5, 3));  // 8

// Single parameter (no parentheses needed!)
const double = x => x * 2;
console.log(double(5));  // 10

// No parameters
const getRandomNumber = () => Math.random();

// Real-world: Perfect for array methods!
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);        // [2, 4, 6, 8, 10]
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((a, b) => a + b, 0); // 15
```

#### 🎨 Arrow Function Cheat Sheet
```javascript
// Different arrow function styles
const func1 = () => "no params";           // No parameters
const func2 = x => x * 2;                   // One parameter
const func3 = (x, y) => x + y;              // Multiple parameters
const func4 = x => { return x * 2; };       // With explicit return
const func5 = x => ({ value: x });          // Returning an object
```

### 2. The Mysterious `this` Keyword (Finally Explained!)

#### The Analogy That Makes It Click
Think of `this` like the word "I" in a conversation:
- When Alice says "I am 25", "I" refers to Alice
- When Bob says "I am 30", "I" refers to Bob
- Same word, different meaning based on WHO is speaking!

In JavaScript, `this` refers to "who called the function"

#### The Problem That Confuses Everyone
```javascript
// The Infamous 'this' Problem
const player = {
    name: "Mario",
    score: 0,
    powers: ["jump", "fireball", "star"],
    
    // Method using regular function
    showPowers: function() {
        console.log(`${this.name}'s powers:`);  // ✅ Works: this = player
        
        this.powers.forEach(function(power) {
            // ❌ BREAKS! Inside here, 'this' is undefined!
            console.log(`${this.name} can use ${power}`);
            // Error: Cannot read property 'name' of undefined
        });
    }
};

// player.showPowers();  // 💥 Crashes!
```

#### The Arrow Function Solution (Magic!)
```javascript
// Arrow Functions Save the Day!
const player = {
    name: "Mario",
    score: 0,
    powers: ["jump", "fireball", "star"],
    
    showPowers: function() {
        console.log(`${this.name}'s powers:`);
        
        // Arrow function doesn't have its own 'this'
        // It uses 'this' from showPowers (which is player)
        this.powers.forEach(power => {
            console.log(`${this.name} can use ${power}`);  // ✅ Works!
        });
    },
    
    // Bonus: Arrow function as method (careful!)
    brokenMethod: () => {
        console.log(this.name);  // ❌ undefined (arrow has no 'this')
    },
    
    workingMethod: function() {
        console.log(this.name);  // ✅ "Mario"
    }
};

player.showPowers();
// Output:
// Mario's powers:
// Mario can use jump
// Mario can use fireball  
// Mario can use star
```

**Golden Rule:** Use arrow functions for callbacks, regular functions for methods!

### 3. Function Input & Output (Parameters & Return)

#### Think of Functions as Machines
```
INPUT (parameters) → [FUNCTION MACHINE] → OUTPUT (return value)
```

#### Parameters: The Input Slots
```javascript
// Basic parameters
function greet(name) {
    return `Hello, ${name}!`;
}

// Multiple parameters
function calculatePrice(price, taxRate) {
    return price + (price * taxRate);
}

// Default parameters (fallback values)
function greet(name = "friend", time = "day") {
    return `Good ${time}, ${name}!`;
}

console.log(greet());                  // "Good day, friend!"
console.log(greet("Alice"));           // "Good day, Alice!"
console.log(greet("Bob", "evening"));  // "Good evening, Bob!"

// Rest parameters (...) - collect all extras into array
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Real-world: Shopping cart
function calculateTotal(taxRate = 0.08, ...prices) {
    const subtotal = prices.reduce((sum, price) => sum + price, 0);
    const tax = subtotal * taxRate;
    return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: (subtotal + tax).toFixed(2)
    };
}

const receipt = calculateTotal(0.08, 19.99, 35.50, 12.99);
console.log(receipt);
// { subtotal: "68.48", tax: "5.48", total: "73.96" }
```

#### Return: The Output
```javascript
// No return = undefined
function noReturn() {
    console.log("I don't return anything");
}
const result1 = noReturn();  // undefined

// Explicit return
function add(a, b) {
    return a + b;  // Stops here and sends back value
    console.log("Never runs");  // Unreachable code
}

// Multiple returns (conditional)
function checkAge(age) {
    if (age < 0) return "Invalid age";
    if (age < 18) return "Too young";
    if (age < 21) return "Almost there";
    return "Old enough";
}

// Returning objects
function createUser(name, age) {
    return {
        name: name,
        age: age,
        id: Date.now()
    };
}
```

### 4. Pure vs. Impure Functions (The Clean vs. Messy Kitchen)

#### Pure Functions = Clean Kitchen
Same ingredients → Same dish, every time. No mess left behind.

```javascript
// ✅ PURE FUNCTIONS - Predictable, testable, reliable

// Always same input = same output
const add = (a, b) => a + b;
console.log(add(2, 3));  // Always 5
console.log(add(2, 3));  // Always 5

// No outside dependencies
const calculateDiscount = (price, percent) => {
    return price * (1 - percent / 100);
};

// Pure function with object
const addItemToCart = (cart, item) => {
    // Creates NEW array, doesn't modify original
    return [...cart, item];
};

const cart = ['apple', 'banana'];
const newCart = addItemToCart(cart, 'orange');
console.log(cart);     // ['apple', 'banana'] - unchanged!
console.log(newCart);  // ['apple', 'banana', 'orange']
```

#### Impure Functions = Messy Kitchen
Unpredictable results, leaves dishes in sink, changes things around.

```javascript
// ❌ IMPURE FUNCTIONS - Harder to test and debug

// Modifies external state
let globalCounter = 0;
const incrementCounter = () => {
    globalCounter++;  // Changes outside variable
    return globalCounter;
};

// Different output each time (unpredictable)
const getRandomDiscount = (price) => {
    const discount = Math.random() * 0.5;  // Random!
    return price * discount;
};

// Has side effects (console.log, API calls, DOM manipulation)
const greetUser = (name) => {
    console.log(`Hello ${name}`);  // Side effect: printing
    document.title = name;          // Side effect: changing DOM
    return name;
};

// Modifies its input (dangerous!)
const addToCartImpure = (cart, item) => {
    cart.push(item);  // Modifies original array!
    return cart;
};
```

**Pro Tip:** Aim for 80% pure functions. Use impure functions only when necessary (DOM updates, API calls, user interaction).

### 5. Closures: Functions with Memory! 🧠

#### The Backpack Analogy
Imagine a function going on a trip. It packs a backpack with all the variables it might need from home. Even when far away, it can reach into its backpack and use those variables!

#### Simple Closure Example

```javascript
// Basic Closure - Counter with Memory
function createCounter() {
    let count = 0;  // This variable gets "remembered"
    
    return function() {
        count++;  // Inner function can access & modify count
        return count;
    };
}

const counter1 = createCounter();  // Creates closure #1
const counter2 = createCounter();  // Creates closure #2 (independent!)

console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter1());  // 3

console.log(counter2());  // 1 (separate memory!)
console.log(counter2());  // 2

// The 'count' variable is PRIVATE - can't access from outside!
// console.log(count);  // Error: count is not defined
```

#### Real-World Closure Examples

```javascript
// Example 1: Private Bank Account
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // Private variable!
    
    return {
        deposit: function(amount) {
            balance += amount;
            return `New balance: $${balance}`;
        },
        withdraw: function(amount) {
            if (amount > balance) {
                return "Insufficient funds!";
            }
            balance -= amount;
            return `New balance: $${balance}`;
        },
        checkBalance: function() {
            return `Current balance: $${balance}`;
        }
    };
}

const myAccount = createBankAccount(100);
console.log(myAccount.deposit(50));      // "New balance: $150"
console.log(myAccount.withdraw(30));     // "New balance: $120"
console.log(myAccount.checkBalance());   // "Current balance: $120"
// console.log(myAccount.balance);       // undefined (private!)

// Example 2: Function Factory
function multiplyBy(multiplier) {
    // The returned function "remembers" multiplier
    return function(number) {
        return number * multiplier;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
const times10 = multiplyBy(10);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(times10(5));  // 50

// Example 3: Event Handlers with State
function createButton(name) {
    let clickCount = 0;
    
    return function handleClick() {
        clickCount++;
        console.log(`${name} clicked ${clickCount} times`);
    };
}

const button1Handler = createButton("Login");
const button2Handler = createButton("Submit");

button1Handler();  // "Login clicked 1 times"
button1Handler();  // "Login clicked 2 times"
button2Handler();  // "Submit clicked 1 times"
```

**Why Closures Matter:**
- Create private variables (data encapsulation)
- Make function factories
- Remember state in event handlers
- Foundation of JavaScript modules

### 6. Higher-Order Functions: Functions That Take Functions! 🤯

#### The Restaurant Analogy
Think of a restaurant where:
- **Higher-Order Function** = The waiter (takes your order function)
- **Callback Function** = Your order (what to do with the food)

The waiter (higher-order) takes your order (callback) and executes it later!

```javascript
// Basic Example: Function Taking a Function
function doTwice(action) {
    action();
    action();
}

function sayHello() {
    console.log("Hello!");
}

doTwice(sayHello);  // "Hello!" "Hello!"

// Passing anonymous function
doTwice(function() {
    console.log("Anonymous!");
});

// With arrow function
doTwice(() => console.log("Arrow!"));

// Real-World: Custom Array Methods
function myMap(array, transformer) {
    const result = [];
    for (let item of array) {
        result.push(transformer(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = myMap(numbers, x => x * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Built-in Higher-Order Functions
const names = ["alice", "bob", "charlie"];

// map: Transform each element
const upperNames = names.map(name => name.toUpperCase());
// ["ALICE", "BOB", "CHARLIE"]

// filter: Keep only matching elements
const longNames = names.filter(name => name.length > 3);
// ["alice", "charlie"]

// reduce: Combine all elements into one value
const totalLetters = names.reduce((sum, name) => sum + name.length, 0);
// 15

// Practical Example: Event System
function addEventListener(event, callback) {
    console.log(`Registered listener for ${event}`);
    // Simulate event happening after 1 second
    setTimeout(() => {
        console.log(`Event ${event} triggered!`);
        callback();
    }, 1000);
}

addEventListener("click", () => {
    console.log("Button was clicked!");
});

addEventListener("hover", function() {
    console.log("Mouse hovering!");
});
```

#### Callback Hell (What to Avoid)
```javascript
// ❌ Callback Hell - Hard to read!
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                console.log(d);
            });
        });
    });
});

// ✅ Better: Use Promises or async/await (coming in later lessons!)
```

### 7. IIFE: Self-Running Functions (Run Once and Disappear!)

#### The Firework Analogy
An IIFE is like a firework - it launches, explodes with its effect, then disappears. One-time use!

```javascript
// Basic IIFE Structure
(function() {
    console.log("I run immediately!");
})();  // <- The () at the end runs it

// With parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})("World");

// Arrow function IIFE
(() => {
    console.log("Modern IIFE!");
})();

// Real-World Use: Initialization Code
(function initializeApp() {
    // All these variables are private
    const config = {
        apiUrl: "https://api.example.com",
        version: "1.0.0"
    };
    
    const secretKey = "abc123";
    
    // Setup code that runs once
    console.log("App initialized with version", config.version);
    
    // Only expose what's needed globally
    window.APP_VERSION = config.version;
})();

// console.log(config);     // Error: config is not defined (private!)
console.log(APP_VERSION);   // "1.0.0" (exposed globally)

// Modern Alternative: Modules
// In modern JavaScript, we use modules instead of IIFEs for privacy
// But IIFEs are still useful for one-time initialization
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