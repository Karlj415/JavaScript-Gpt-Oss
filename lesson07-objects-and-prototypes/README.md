# Lesson 07 · Objects and Prototypes 🏗️

> "If JavaScript objects are like LEGO blocks, prototypes are the instruction manual that tells you how to build them."

Welcome to JavaScript's secret sauce! Today we're diving into how JavaScript creates and shares behaviors between objects. Think of it like learning how recipes inherit from family cookbooks—grandma's cookie recipe becomes the foundation for mom's chocolate chip cookies, which becomes your own special version with extra chocolate!

## 🎯 What You'll Learn

### Core Concepts
- **The Prototype Chain** - How objects inherit from other objects (like family traits!)
- **Classes** - The modern way to create object blueprints (like cookie cutters)
- **Constructor Functions** - The old-school way (still important to know!)
- **Factory Functions** - An alternative pattern that's often simpler
- **The `this` keyword mastery** - Finally understand what `this` actually means!

### Practical Skills
- Build reusable object templates for your apps
- Create private data that can't be accessed from outside
- Use getters/setters to control how data is accessed
- Choose between classes and factories (and know why!)
- Debug prototype-related issues like a pro

## 🌟 Why This Matters

**Real-World Applications:**
- 🎮 **Game Development**: Player characters inheriting from a base character class
- 🛒 **E-commerce**: Product types sharing common properties
- 👥 **User Systems**: Different user roles (admin, customer) with shared behaviors
- 📱 **React Components**: Understanding class components (though hooks are now preferred)
- 🔧 **Node.js**: Most built-in modules use prototypes extensively

**Career Impact:**
- Every JavaScript framework uses these patterns
- Required knowledge for technical interviews
- Essential for reading and understanding existing codebases
- Foundation for TypeScript classes

## 📚 Deep Dive Into Concepts

### 1. The Prototype Chain: JavaScript's Inheritance System 🔗

**Analogy:** Imagine you're at a library. You ask for a book. If your local branch doesn't have it, they check the main library. If the main library doesn't have it, they check the national archive. That's the prototype chain!

**How It Works:**
1. You try to access a property on an object
2. JavaScript looks for it on the object itself
3. If not found, it looks at the object's prototype
4. Keeps looking up the chain until found or reaches `null`

```javascript
// prototype-chain-demo.js

// Think of this as the "grandparent" object
const vehicle = {
    hasWheels: true,
    move() {
        console.log("Moving...");
    }
};

// Think of this as the "parent" object
const car = Object.create(vehicle);  // car's prototype is vehicle
car.doors = 4;
car.honk = function() {
    console.log("Beep beep!");
};

// Think of this as the "child" object
const myCar = Object.create(car);  // myCar's prototype is car
myCar.brand = "Tesla";
myCar.model = "Model 3";

// Let's trace the prototype chain!
console.log(myCar.brand);      // "Tesla" (own property)
console.log(myCar.doors);      // 4 (from car prototype)
console.log(myCar.hasWheels);  // true (from vehicle prototype)
myCar.move();                   // "Moving..." (from vehicle prototype)

// Visualize the chain
console.log("\nPrototype Chain:");
console.log("myCar -> car -> vehicle -> Object.prototype -> null");

// You can check the prototype
console.log(Object.getPrototypeOf(myCar) === car);        // true
console.log(Object.getPrototypeOf(car) === vehicle);      // true
console.log(Object.getPrototypeOf(vehicle) === Object.prototype); // true
```

**💡 Key Insight:** Every object in JavaScript (except `Object.prototype`) has a prototype. This is how methods like `.toString()` work on any object—they're defined on `Object.prototype`!

### 2. Constructor Functions: The Classic Pattern 🏗️

**Analogy:** A constructor function is like a factory assembly line. The `new` keyword starts the conveyor belt, and each step adds parts to build your object.

Before ES6 classes, this was THE way to create object blueprints:

```javascript
// constructor-functions-explained.js

// Constructor function (note the capital letter convention!)
function Person(firstName, lastName, age) {
    // The 'new' keyword creates 'this' as an empty object
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.friendsList = [];  // Each person gets their own friends array
}

// Methods go on the prototype (shared by all instances)
Person.prototype.introduce = function() {
    return `Hi, I'm ${this.firstName} ${this.lastName}`;
};

Person.prototype.haveBirthday = function() {
    this.age++;
    console.log(`🎂 Happy birthday! Now ${this.age} years old.`);
};

Person.prototype.addFriend = function(friendName) {
    this.friendsList.push(friendName);
    console.log(`${this.firstName} is now friends with ${friendName}`);
};

// Creating instances
const alice = new Person("Alice", "Johnson", 25);
const bob = new Person("Bob", "Smith", 30);

// Each instance has its own properties
console.log(alice.introduce());  // "Hi, I'm Alice Johnson"
console.log(bob.introduce());    // "Hi, I'm Bob Smith"

// But they share the same methods (memory efficient!)
console.log(alice.introduce === bob.introduce);  // true

// Modifying instance data
alice.haveBirthday();  // Now 26
alice.addFriend("Charlie");
bob.addFriend("Diana");

console.log(alice.friendsList);  // ["Charlie"]
console.log(bob.friendsList);    // ["Diana"] - separate arrays!
```

**🎯 What `new` Actually Does:**
```javascript
// Behind the scenes, 'new' does this:
function whatNewDoes(Constructor, ...args) {
    // Step 1: Create empty object
    const obj = {};
    
    // Step 2: Set prototype
    Object.setPrototypeOf(obj, Constructor.prototype);
    
    // Step 3: Call constructor with 'this' = obj
    Constructor.apply(obj, args);
    
    // Step 4: Return the object
    return obj;
}
```

**⚠️ Common Mistake:**
```javascript
// WRONG: Forgetting 'new'
const wrongPerson = Person("Wrong", "Way", 20);
console.log(wrongPerson);  // undefined
console.log(window.firstName);  // "Wrong" - Oops! Added to global!

// RIGHT: Always use 'new' with constructor functions
const rightPerson = new Person("Right", "Way", 20);
```

### 3. Modern Classes: The Clean, Powerful Way 🎨

**Analogy:** If constructor functions are like building furniture from scratch, classes are like IKEA—same result, but with clearer instructions and better organization!

```javascript
// modern-classes-complete.js

class BankAccount {
    // Private fields (truly private, not just convention!)
    #balance = 0;
    #pin;
    #transactionHistory = [];
    
    // Static property (shared by all instances)
    static totalAccounts = 0;
    static MINIMUM_BALANCE = 10;
    
    constructor(owner, initialDeposit = 0, pin) {
        this.owner = owner;
        this.accountNumber = BankAccount.generateAccountNumber();
        this.#pin = pin;
        
        if (initialDeposit > 0) {
            this.deposit(initialDeposit);
        }
        
        BankAccount.totalAccounts++;
    }
    
    // Getter - accessed like a property, computed on-the-fly
    get balance() {
        return `$${this.#balance.toFixed(2)}`;
    }
    
    // Getter for transaction count
    get transactionCount() {
        return this.#transactionHistory.length;
    }
    
    // Setter - control how values are set
    set pin(newPin) {
        if (String(newPin).length !== 4) {
            throw new Error("PIN must be 4 digits");
        }
        this.#pin = newPin;
        console.log("PIN updated successfully");
    }
    
    // Public methods
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit must be positive");
        }
        this.#balance += amount;
        this.#recordTransaction('deposit', amount);
        return this.balance;
    }
    
    withdraw(amount, pin) {
        if (!this.#verifyPin(pin)) {
            throw new Error("Invalid PIN");
        }
        if (amount > this.#balance) {
            throw new Error("Insufficient funds");
        }
        if (this.#balance - amount < BankAccount.MINIMUM_BALANCE) {
            throw new Error(`Balance cannot go below $${BankAccount.MINIMUM_BALANCE}`);
        }
        
        this.#balance -= amount;
        this.#recordTransaction('withdrawal', amount);
        return this.balance;
    }
    
    // Private methods (can only be called inside the class)
    #verifyPin(pin) {
        return this.#pin === pin;
    }
    
    #recordTransaction(type, amount) {
        this.#transactionHistory.push({
            type,
            amount,
            timestamp: new Date(),
            balanceAfter: this.#balance
        });
    }
    
    // Public method that uses private data
    getStatement() {
        console.log(`\n=== Account Statement ===");
        console.log(`Account: ${this.accountNumber}`);
        console.log(`Owner: ${this.owner}`);
        console.log(`Current Balance: ${this.balance}`);
        console.log(`\nRecent Transactions:`);
        
        this.#transactionHistory.slice(-5).forEach(trans => {
            const sign = trans.type === 'deposit' ? '+' : '-';
            console.log(`  ${sign}$${trans.amount} on ${trans.timestamp.toLocaleDateString()}`);
        });
    }
    
    // Static method (called on class, not instance)
    static generateAccountNumber() {
        return 'ACC' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    
    // Static method to create account from existing data
    static fromJSON(jsonString) {
        const data = JSON.parse(jsonString);
        return new BankAccount(data.owner, data.initialDeposit, data.pin);
    }
}

// Using the class
const myAccount = new BankAccount("Alice Johnson", 1000, "1234");

console.log(myAccount.balance);           // "$1000.00" (getter)
console.log(myAccount.owner);             // "Alice Johnson"
// console.log(myAccount.#balance);       // Error! Private field

myAccount.deposit(500);
console.log(myAccount.balance);           // "$1500.00"

try {
    myAccount.withdraw(200, "0000");      // Wrong PIN
} catch (error) {
    console.log("Error:", error.message); // "Invalid PIN"
}

myAccount.withdraw(200, "1234");          // Success!
myAccount.getStatement();

// Using static methods
console.log(`Total accounts created: ${BankAccount.totalAccounts}`);

const jsonData = '{"owner":"Bob Smith","initialDeposit":500,"pin":"5678"}';
const bobAccount = BankAccount.fromJSON(jsonData);
```

**🎯 Class Features Explained:**

| Feature | What It Does | When to Use |
|---------|--------------|-------------|
| `constructor()` | Initializes new instances | Always needed for setup |
| `#privateField` | Data that can't be accessed outside | Sensitive data, internal state |
| `get propertyName()` | Computed property, accessed like regular property | Derived values, formatted output |
| `set propertyName(value)` | Controls how property is set | Validation, side effects |
| `static method()` | Method on class itself, not instances | Utility functions, factories |
| `static property` | Shared data across all instances | Constants, counters |

### 4. Inheritance: Building on What Exists 🏰

**Analogy:** Inheritance is like evolving Pokémon—Pikachu (base) evolves into Raichu (extended) with all original abilities plus new ones!

```javascript
// inheritance-example.js

// Base class (parent)
class Vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        return `${this.brand} ${this.model} started!`;
    }
    
    stop() {
        this.isRunning = false;
        return `${this.brand} ${this.model} stopped.`;
    }
    
    getAge() {
        return new Date().getFullYear() - this.year;
    }
}

// Extended class (child)
class ElectricVehicle extends Vehicle {
    #batteryCapacity;
    #currentCharge;
    
    constructor(brand, model, year, batteryCapacity) {
        // MUST call super() first in constructor!
        super(brand, model, year);
        
        this.#batteryCapacity = batteryCapacity;
        this.#currentCharge = batteryCapacity; // Start fully charged
        this.type = 'Electric';
    }
    
    // Override parent method
    start() {
        if (this.#currentCharge <= 0) {
            return `${this.brand} ${this.model} needs charging!`;
        }
        // Call parent's start method
        return super.start() + " (Silent mode 🔇)";
    }
    
    // New method specific to electric vehicles
    charge(amount) {
        this.#currentCharge = Math.min(
            this.#currentCharge + amount,
            this.#batteryCapacity
        );
        return `Charged to ${this.chargePercentage}%`;
    }
    
    // Getter for battery status
    get chargePercentage() {
        return Math.round((this.#currentCharge / this.#batteryCapacity) * 100);
    }
    
    drive(distance) {
        const energyNeeded = distance * 0.3; // 0.3 kWh per mile
        if (energyNeeded > this.#currentCharge) {
            return "Not enough charge for this trip!";
        }
        this.#currentCharge -= energyNeeded;
        return `Drove ${distance} miles. Battery at ${this.chargePercentage}%`;
    }
}

// Even more specific class
class Tesla extends ElectricVehicle {
    constructor(model, year, batteryCapacity) {
        super('Tesla', model, year, batteryCapacity);
        this.autopilotEnabled = false;
    }
    
    enableAutopilot() {
        this.autopilotEnabled = true;
        return "Autopilot engaged! 🚗🤖";
    }
}

// Create instances
const regularCar = new Vehicle('Toyota', 'Camry', 2020);
const electricCar = new ElectricVehicle('Nissan', 'Leaf', 2022, 62);
const myTesla = new Tesla('Model 3', 2023, 75);

// Test inheritance chain
console.log(regularCar.start());     // "Toyota Camry started!"
console.log(electricCar.start());    // "Nissan Leaf started! (Silent mode 🔇)"
console.log(myTesla.start());        // "Tesla Model 3 started! (Silent mode 🔇)"

// Tesla has all methods from its parents
console.log(myTesla.getAge());       // Age from Vehicle
console.log(myTesla.drive(50));      // Drive from ElectricVehicle  
console.log(myTesla.enableAutopilot()); // Its own method

// Type checking with instanceof
console.log('\nType Checking:');
console.log(myTesla instanceof Tesla);           // true
console.log(myTesla instanceof ElectricVehicle); // true
console.log(myTesla instanceof Vehicle);         // true
console.log(myTesla instanceof Object);          // true (everything is an Object)

console.log(regularCar instanceof ElectricVehicle); // false
console.log(electricCar instanceof Tesla);          // false

// Checking constructor
console.log(myTesla.constructor.name);  // "Tesla"
```

**🎯 Inheritance Rules:**
1. Child classes MUST call `super()` before using `this`
2. Child can override parent methods
3. Child can call parent methods with `super.methodName()`
4. Private fields are NOT inherited (truly private!)
5. Static methods ARE inherited

### 5. Mastering `this` with bind, call, and apply 🎯

**Analogy:** Think of `this` as a pronoun in a sentence. "I am hungry" - who is "I"? It depends on who's speaking! Similarly, `this` depends on how a function is called.

```javascript
// this-mastery.js

// The problem: 'this' can be confusing!
const user = {
    name: 'Alice',
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    },
    greetDelayed() {
        // Problem: setTimeout changes 'this' context
        setTimeout(function() {
            console.log(`Delayed: I'm ${this.name}`); // undefined!
        }, 1000);
    }
};

user.greet();  // Works: "Hello, I'm Alice"

// But if we extract the method...
const greetFunction = user.greet;
greetFunction();  // Broken: "Hello, I'm undefined"

// SOLUTION 1: bind() - Creates a new function with fixed 'this'
const boundGreet = user.greet.bind(user);
boundGreet();  // Works: "Hello, I'm Alice"

// Real-world bind() example: Event handlers
class Button {
    constructor(label) {
        this.label = label;
        this.clickCount = 0;
    }
    
    handleClick() {
        this.clickCount++;
        console.log(`${this.label} clicked ${this.clickCount} times`);
    }
    
    attachToElement(element) {
        // Without bind, 'this' would be the DOM element
        element.addEventListener('click', this.handleClick.bind(this));
    }
}

// SOLUTION 2: call() - Invoke function with specific 'this' RIGHT NOW
function describe(age, occupation) {
    console.log(`${this.name} is ${age} years old and works as ${occupation}`);
}

const person1 = { name: 'Bob' };
const person2 = { name: 'Carol' };

describe.call(person1, 25, 'Developer');
// "Bob is 25 years old and works as Developer"

describe.call(person2, 30, 'Designer');
// "Carol is 30 years old and works as Designer"

// SOLUTION 3: apply() - Like call(), but arguments as array
const numbers = [5, 6, 2, 3, 7];

// Using apply to pass array as arguments
const max = Math.max.apply(null, numbers);
console.log(`Max: ${max}`);  // 7

// Modern alternative: spread operator
const max2 = Math.max(...numbers);

// Practical apply() example: Borrowing methods
const fakeArray = {
    0: 'first',
    1: 'second',
    2: 'third',
    length: 3
};

// Borrow Array's join method
const joined = Array.prototype.join.call(fakeArray, ' - ');
console.log(joined);  // "first - second - third"

// COMPREHENSIVE EXAMPLE: Restaurant ordering system
class Restaurant {
    constructor(name) {
        this.name = name;
        this.orders = [];
    }
    
    takeOrder(customerName, ...items) {
        const order = {
            customer: customerName,
            items: items,
            timestamp: new Date(),
            restaurant: this.name
        };
        this.orders.push(order);
        console.log(`Order placed at ${this.name} for ${customerName}`);
        return order;
    }
}

const italianPlace = new Restaurant("Luigi's");
const sushiPlace = new Restaurant("Sakura");

// Normal call
italianPlace.takeOrder("Alice", "Pizza", "Salad");

// Using call to place order at different restaurant
italianPlace.takeOrder.call(sushiPlace, "Bob", "Sushi", "Miso Soup");

// Using apply with array of items
const bigOrder = ["Customer123", "Roll1", "Roll2", "Roll3", "Sake"];
italianPlace.takeOrder.apply(sushiPlace, bigOrder);

// Using bind for recurring customer
const orderAtLuigis = italianPlace.takeOrder.bind(italianPlace, "Regular Joe");
orderAtLuigis("Daily Special");  // Always orders as "Regular Joe" at Luigi's
orderAtLuigis("Coffee");

console.log("\nOrders at Luigi's:", italianPlace.orders.length);
console.log("Orders at Sakura:", sushiPlace.orders.length);
```

**📊 Quick Reference Table:**

| Method | When to Use | Syntax | Returns |
|--------|-------------|--------|----------|
| `bind()` | Create reusable function with fixed `this` | `func.bind(thisArg, arg1, arg2)` | New function |
| `call()` | Invoke function once with specific `this` | `func.call(thisArg, arg1, arg2)` | Function result |
| `apply()` | Invoke function with `this` and array args | `func.apply(thisArg, [args])` | Function result |

**🚨 Common Pitfall:**
```javascript
// Arrow functions don't have their own 'this'
const obj = {
    name: 'MyObject',
    regularMethod: function() {
        return this.name;  // Works
    },
    arrowMethod: () => {
        return this.name;  // Doesn't work as expected!
    }
};
```

### 6. Factory Functions: The Simple Alternative 🏭

**Analogy:** If classes are like car manufacturing plants with complex machinery, factory functions are like a craftsman's workshop—simpler, more flexible, and often all you need!

```javascript
// factory-functions-complete.js

// Simple factory function
function createUser(name, email) {
    // Private data (via closure)
    let loginCount = 0;
    let lastLogin = null;
    
    // Public interface
    return {
        name,  // Shorthand for name: name
        email,
        
        login() {
            loginCount++;
            lastLogin = new Date();
            console.log(`${name} logged in (Total: ${loginCount} times)`);
        },
        
        getStats() {
            return {
                loginCount,
                lastLogin: lastLogin ? lastLogin.toLocaleString() : 'Never'
            };
        },
        
        // Method that returns another factory object!
        createSession() {
            return createSession(this);
        }
    };
}

// Factory with composition (mixing features)
function createSession(user) {
    const sessionId = Math.random().toString(36).substr(2, 9);
    const startTime = Date.now();
    
    return {
        sessionId,
        user: user.name,
        
        getDuration() {
            return Math.floor((Date.now() - startTime) / 1000) + ' seconds';
        },
        
        end() {
            console.log(`Session ${sessionId} ended after ${this.getDuration()}`);
        }
    };
}

// Advanced factory: Game character with composition
function createCharacter(name, characterClass) {
    // Private state
    let health = 100;
    let mana = 50;
    let level = 1;
    let experience = 0;
    
    // Abilities based on class
    const abilities = getAbilitiesForClass(characterClass);
    
    // Public interface
    const character = {
        name,
        characterClass,
        
        // Getters using closures
        getHealth: () => health,
        getMana: () => mana,
        getLevel: () => level,
        
        takeDamage(amount) {
            health = Math.max(0, health - amount);
            console.log(`${name} takes ${amount} damage! Health: ${health}`);
            if (health === 0) {
                console.log(`${name} has been defeated! 💀`);
            }
        },
        
        heal(amount) {
            const oldHealth = health;
            health = Math.min(100, health + amount);
            console.log(`${name} healed for ${health - oldHealth}. Health: ${health}`);
        },
        
        gainExperience(amount) {
            experience += amount;
            console.log(`${name} gained ${amount} XP`);
            
            // Level up logic
            while (experience >= level * 100) {
                experience -= level * 100;
                level++;
                health = 100;  // Full heal on level up
                mana = 50 + (level * 10);
                console.log(`🎉 LEVEL UP! ${name} is now level ${level}!`);
            }
        },
        
        // Compose abilities into the character
        ...abilities
    };
    
    return character;
}

// Helper function for abilities
function getAbilitiesForClass(characterClass) {
    const abilities = {
        warrior: {
            slash() {
                console.log(`⚔️ Warrior slashes for 20 damage!`);
                return 20;
            },
            shieldBlock() {
                console.log(`🛡️ Warrior blocks incoming damage!`);
                return 10;
            }
        },
        mage: {
            fireball() {
                console.log(`🔥 Mage casts Fireball for 30 damage!`);
                return 30;
            },
            iceShield() {
                console.log(`❄️ Mage creates Ice Shield!`);
                return 15;
            }
        },
        rogue: {
            stealth() {
                console.log(`🌑 Rogue enters stealth mode!`);
                return true;
            },
            backstab() {
                console.log(`🗡️ Rogue backstabs for 25 damage!`);
                return 25;
            }
        }
    };
    
    return abilities[characterClass] || {};
}

// Using the factories
console.log('=== Factory Functions Demo ===\n');

// User factory
const user1 = createUser('Alice', 'alice@example.com');
const user2 = createUser('Bob', 'bob@example.com');

user1.login();
user1.login();
console.log(user1.getStats());

const session = user1.createSession();
setTimeout(() => session.end(), 1000);

// Game character factory
console.log('\n=== Game Characters ===\n');

const warrior = createCharacter('Thorin', 'warrior');
const mage = createCharacter('Gandalf', 'mage');

warrior.slash();
warrior.takeDamage(30);
warrior.heal(20);
warrior.gainExperience(150);

mage.fireball();
mage.iceShield();

console.log(`\nThorin's health: ${warrior.getHealth()}`);
console.log(`Gandalf's mana: ${mage.getMana()}`);
```

**🔍 Factory vs Class Comparison:**

```javascript
// CLASS APPROACH
class UserClass {
    #password;  // Private
    
    constructor(name, password) {
        this.name = name;
        this.#password = password;
    }
    
    checkPassword(attempt) {
        return attempt === this.#password;
    }
}

// FACTORY APPROACH  
function createUserFactory(name, password) {
    // password is private via closure
    return {
        name,
        checkPassword(attempt) {
            return attempt === password;
        }
    };
}

// Both work, but factory is simpler!
const classUser = new UserClass('Alice', 'secret123');
const factoryUser = createUserFactory('Bob', 'secret456');
```

**📊 When to Use Each:**

| Use Classes When... | Use Factories When... |
|--------------------|-----------------------|
| You need inheritance | You want simple objects |
| You need `instanceof` checks | You prefer functional programming |
| Working with frameworks expecting classes | You want true privacy via closures |
| Performance with many instances matters | You want to avoid `this` confusion |
| You like OOP style | You want more flexibility |

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