# Lesson 06 · Data Structures: Your Digital Filing Cabinets

🎯 **Achievement Unlocked:** Today you learn to organize data like a pro!

Think of data structures as different types of containers in your home:
- **Arrays** = Numbered mailboxes (ordered, indexed)
- **Objects** = Filing cabinets with labeled folders (key-value pairs)
- **Sets** = A bag of unique marbles (no duplicates)
- **Maps** = A more powerful filing cabinet (any key type)

Today, you'll master organizing, finding, and transforming data - the skills you'll use in EVERY JavaScript project!

## 🎯 Your Mission Objectives
- [ ] Master arrays (your go-to data container)
- [ ] Master objects (modeling real-world things)
- [ ] Chain array methods like a pro (`.map()`, `.filter()`, `.reduce()`)
- [ ] Safely handle missing data (no more crashes!)
- [ ] Use spread operator (`...`) to copy and combine data
- [ ] Destructure data elegantly (pull out what you need)
- [ ] Convert data to/from JSON (talk to servers!)

**Success Metric:** You can build a shopping cart system with products, filtering, and calculations.

## 💡 Why Data Structures Are Your Superpowers

**Every app is just data + transformations:**
- Instagram = Array of photos + filtering/sorting
- Amazon = Objects of products + searching/calculating
- Gmail = Array of emails + organizing/filtering
- Spotify = Playlists (arrays) + Songs (objects)

Master data structures, and you can build ANYTHING!

## Lesson Narrative

### 1. Immutability: The "Don't Touch the Original" Rule

#### The Photo Album Analogy
Imagine you have a precious photo album:
- **Mutable (BAD)**: Drawing on the original photos with a marker
- **Immutable (GOOD)**: Making a photocopy, then drawing on the copy

The original stays safe! This prevents nasty surprises in your code.

```javascript
// ❌ BAD: Mutating (Changing the Original)
const originalCart = ['apple', 'banana'];
const newCart = originalCart;
newCart.push('orange');  // This changes BOTH variables!
console.log(originalCart);  // ['apple', 'banana', 'orange'] - OOPS!
console.log(newCart);       // ['apple', 'banana', 'orange']

// ✅ GOOD: Immutable (Making a Copy)
const originalCart2 = ['apple', 'banana'];
const newCart2 = [...originalCart2, 'orange'];  // Spread makes a copy!
console.log(originalCart2);  // ['apple', 'banana'] - Safe!
console.log(newCart2);       // ['apple', 'banana', 'orange']

// Real-World Example: User Settings
const userSettings = {
    theme: 'dark',
    notifications: true,
    language: 'en'
};

// ❌ BAD: This would affect all components using userSettings!
const badUpdate = userSettings;
badUpdate.theme = 'light';  // Changed everywhere!

// ✅ GOOD: Create a new object with updates
const updatedSettings = {
    ...userSettings,      // Copy all existing settings
    theme: 'light'        // Override just what we want
};

console.log(userSettings.theme);     // 'dark' - Original intact!
console.log(updatedSettings.theme);  // 'light' - New version
```

**Golden Rule:** Never modify, always create new!

### 2. Arrays: Your Swiss Army Knife of Data

#### What Are Arrays Really?
Arrays are like a row of numbered lockers:
- Each item has a position (index)
- Order matters
- Perfect for lists of similar things

#### The Power Trio: Map, Filter, Reduce

```javascript
// Starting Data: Online Store Products
const products = [
    { name: 'Laptop', price: 999, category: 'electronics', inStock: true },
    { name: 'Shirt', price: 29, category: 'clothing', inStock: true },
    { name: 'Phone', price: 699, category: 'electronics', inStock: false },
    { name: 'Jeans', price: 79, category: 'clothing', inStock: true },
    { name: 'Tablet', price: 399, category: 'electronics', inStock: true }
];

// 🗺️ MAP: Transform each item (like applying a filter to photos)
const productNames = products.map(product => product.name);
console.log(productNames);
// ['Laptop', 'Shirt', 'Phone', 'Jeans', 'Tablet']

const withTax = products.map(product => ({
    ...product,
    priceWithTax: (product.price * 1.08).toFixed(2)
}));
// Each product now has priceWithTax added

// 🔍 FILTER: Keep only what matches (like sorting mail)
const inStockProducts = products.filter(product => product.inStock);
console.log(`${inStockProducts.length} products in stock`);

const affordableElectronics = products.filter(product => 
    product.category === 'electronics' && product.price < 500
);
// Only Tablet matches!

// ➕ REDUCE: Combine into single value (like counting money)
const totalValue = products.reduce((sum, product) => sum + product.price, 0);
console.log(`Total inventory value: $${totalValue}`); // $2205

const byCategory = products.reduce((groups, product) => {
    const cat = product.category;
    groups[cat] = groups[cat] || [];
    groups[cat].push(product);
    return groups;
}, {});
// Groups products by category!

// 🔗 CHAINING: Combine multiple operations
const saleMessage = products
    .filter(p => p.inStock)                    // Only in-stock
    .filter(p => p.price < 100)                // Under $100
    .map(p => p.name)                          // Get names
    .map(name => `${name} is on sale!`)        // Create messages
    .join(' ');
    
console.log(saleMessage);
// "Shirt is on sale! Jeans is on sale!"

// 🎯 OTHER ESSENTIAL METHODS

// FIND: Get first match (like finding your keys)
const laptop = products.find(p => p.name === 'Laptop');
console.log(laptop); // The laptop object

// SOME: Does ANY item match? (like checking if anyone wants pizza)
const hasAffordable = products.some(p => p.price < 50);
console.log('Has affordable items?', hasAffordable); // true

// EVERY: Do ALL items match? (like checking if everyone is ready)
const allInStock = products.every(p => p.inStock);
console.log('Everything in stock?', allInStock); // false

// INCLUDES: Simple check for primitive values
const sizes = ['S', 'M', 'L', 'XL'];
console.log(sizes.includes('M')); // true
```

### 3. Objects: Modeling the Real World

#### What Are Objects?
Objects are like forms with labeled fields:
- Each piece of data has a name (key)
- Perfect for representing things (users, products, settings)
- Access by name, not position

```javascript
// Objects represent entities
const user = {
    id: 1,
    username: 'coolcoder',
    email: 'cool@example.com',
    profile: {
        bio: 'Love JavaScript!',
        avatar: 'avatar.jpg',
        joined: '2023-01-15'
    },
    settings: {
        theme: 'dark',
        notifications: true
    }
};

// Two ways to access properties
console.log(user.username);           // Dot notation (when you know the key)
console.log(user['username']);        // Bracket notation (for dynamic keys)

const field = 'email';
console.log(user[field]);             // Dynamic access

// Nested access
console.log(user.profile.bio);        // 'Love JavaScript!'
```

#### Looping Through Objects (3 Ways)

```javascript
// Sample data: Game character stats
const character = {
    name: 'Aragorn',
    level: 45,
    health: 850,
    mana: 200,
    class: 'Ranger',
    skills: ['Archery', 'Tracking', 'Swordsmanship']
};

// 1️⃣ Object.keys() - Get all property names
const stats = Object.keys(character);
console.log('Character stats:', stats);
// ['name', 'level', 'health', 'mana', 'class', 'skills']

// Use case: Check if character has certain stats
if (Object.keys(character).includes('mana')) {
    console.log('This character can use magic!');
}

// 2️⃣ Object.values() - Get all values
const values = Object.values(character);
console.log('All values:', values);
// ['Aragorn', 45, 850, 200, 'Ranger', Array(3)]

// Use case: Find max numeric value
const numbers = Object.values(character).filter(v => typeof v === 'number');
const maxStat = Math.max(...numbers);
console.log('Highest stat:', maxStat); // 850

// 3️⃣ Object.entries() - Get [key, value] pairs
for (const [stat, value] of Object.entries(character)) {
    if (typeof value === 'number') {
        console.log(`${stat}: ${value}`);
    }
}
// level: 45
// health: 850
// mana: 200

// Real-world: Converting object to HTML
const statsHTML = Object.entries(character)
    .filter(([key, val]) => typeof val !== 'object')
    .map(([key, val]) => `<div>${key}: ${val}</div>`)
    .join('');
console.log(statsHTML);

// Practical: Counting occurrences
const votes = ['pizza', 'burger', 'pizza', 'tacos', 'pizza', 'burger'];
const voteCount = votes.reduce((counts, vote) => {
    counts[vote] = (counts[vote] || 0) + 1;
    return counts;
}, {});
console.log(voteCount); // { pizza: 3, burger: 2, tacos: 1 }

// Find winner
const winner = Object.entries(voteCount)
    .sort((a, b) => b[1] - a[1])[0][0];
console.log(`Winner: ${winner}!`); // Winner: pizza!
```

### 4. Safe Data Access: No More Crashes! 🛡️

#### The Problem: APIs Send Messy Data
When fetching data from servers, you never know what you'll get:
- Missing fields
- Null values  
- Deeply nested structures
- Inconsistent formats

#### Optional Chaining (`?.`): Your Safety Net
```javascript
// Real API Response (often messy!)
const apiResponse = {
    users: [
        {
            id: 1,
            name: 'Alice',
            profile: {
                bio: 'Developer',
                social: {
                    twitter: '@alice',
                    github: 'alice123'
                }
            }
        },
        {
            id: 2,
            name: 'Bob',
            profile: {
                bio: 'Designer'
                // No social object!
            }
        },
        {
            id: 3,
            name: 'Charlie'
            // No profile at all!
        }
    ]
};

// ❌ WITHOUT Optional Chaining (Crash City)
try {
    // This crashes for Bob and Charlie!
    const twitter = apiResponse.users[1].profile.social.twitter;
} catch (error) {
    console.log('💥 Crashed!', error.message);
}

// ✅ WITH Optional Chaining (Safe!)
const users = apiResponse.users;

// Safe access for all users
users.forEach(user => {
    const twitter = user.profile?.social?.twitter;
    console.log(`${user.name}: ${twitter || 'No Twitter'}`);  
});
// Alice: @alice
// Bob: No Twitter
// Charlie: No Twitter

// Works with arrays and functions too!
const firstUserBio = apiResponse.users?.[0]?.profile?.bio;
const result = apiResponse.getData?.(); // Only calls if function exists

// Real-world: Displaying user data safely
function displayUser(user) {
    return `
        Name: ${user?.name || 'Unknown'}
        Email: ${user?.contact?.email || 'No email'}
        City: ${user?.address?.city || 'No location'}
        Company: ${user?.job?.company?.name || 'Unemployed'}
    `;
}
```

#### Nullish Coalescing (`??`): Smart Defaults
```javascript
// The Problem with || (OR operator)
const userSettings = {
    volume: 0,          // User wants silence
    brightness: 100,
    nickname: '',       // User wants no nickname
    age: 0             // Baby user?
};

// ❌ Using || gives wrong defaults for "falsy" values
const badVolume = userSettings.volume || 50;      // 50 (WRONG! User wanted 0)
const badNickname = userSettings.nickname || 'Anonymous'; // 'Anonymous' (WRONG!)
const badAge = userSettings.age || 18;            // 18 (WRONG! Baby is not 18!)

// ✅ Using ?? respects 0, '', false as valid values
const goodVolume = userSettings.volume ?? 50;     // 0 (Correct!)
const goodNickname = userSettings.nickname ?? 'Anonymous'; // '' (Correct!)
const goodAge = userSettings.age ?? 18;           // 0 (Correct!)

// Only replaces null or undefined
const missingValue = userSettings.language ?? 'en'; // 'en' (property doesn't exist)
const nullValue = null ?? 'default';               // 'default'

// Real-world: Form handling
function processForm(formData) {
    return {
        quantity: formData.quantity ?? 1,          // Default 1 if not specified
        discount: formData.discount ?? 0,          // 0 is valid discount
        express: formData.express ?? false,        // false is valid choice
        notes: formData.notes ?? '',               // Empty string is valid
        giftWrap: formData.giftWrap ?? false
    };
}

// Combining ?. and ??
const config = {};
const port = config.server?.port ?? 3000;         // 3000
const timeout = config.api?.timeout ?? 5000;      // 5000
const retries = config.api?.retries ?? 3;         // 3
```

### 5. Modern Syntax Magic: Destructuring & Spread

#### Destructuring: Unpack Your Suitcase
Instead of pulling items out one by one, grab everything you need at once!

```javascript
// ==================
// ARRAY DESTRUCTURING
// ==================

// Old way (tedious)
const colors = ['red', 'green', 'blue', 'yellow'];
const primary1 = colors[0];
const primary2 = colors[1];
const primary3 = colors[2];

// New way (destructuring!)
const [red, green, blue, yellow] = colors;
console.log(red);    // 'red'
console.log(blue);   // 'blue'

// Skip items with commas
const [first, , third] = colors;  // Skip green
console.log(first, third);  // 'red', 'blue'

// Use rest to gather remainder
const [mainColor, ...otherColors] = colors;
console.log(mainColor);     // 'red'
console.log(otherColors);   // ['green', 'blue', 'yellow']

// Swap variables (cool trick!)
let a = 1, b = 2;
[a, b] = [b, a];  // Swap!
console.log(a, b); // 2, 1

// ==================
// OBJECT DESTRUCTURING
// ==================

// API response
const userData = {
    id: 123,
    username: 'johndoe',
    email: 'john@example.com',
    profile: {
        age: 28,
        city: 'New York'
    },
    permissions: ['read', 'write']
};

// Old way
const username_old = userData.username;
const email_old = userData.email;
const age_old = userData.profile.age;

// New way (destructuring!)
const { username, email } = userData;
const { age, city } = userData.profile;

// Rename while destructuring
const { username: userName, email: userEmail } = userData;
console.log(userName);  // 'johndoe' (renamed!)

// Default values
const { phone = 'No phone' } = userData;
console.log(phone);  // 'No phone'

// Nested destructuring
const { profile: { age: userAge } } = userData;
console.log(userAge);  // 28

// ==================
// SPREAD OPERATOR (...)
// ==================

// Copying arrays (no mutation!)
const original = [1, 2, 3];
const copy = [...original];
const extended = [...original, 4, 5];

// Combining arrays
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'broccoli'];
const food = [...fruits, ...vegetables];
console.log(food); // ['apple', 'banana', 'carrot', 'broccoli']

// Copying objects
const baseConfig = { theme: 'dark', fontSize: 14 };
const userConfig = { ...baseConfig, fontSize: 16 }; // Override fontSize
console.log(userConfig); // { theme: 'dark', fontSize: 16 }

// Merging objects
const defaults = { volume: 50, quality: 'HD' };
const userPrefs = { volume: 80 };
const final = { ...defaults, ...userPrefs }; // User prefs win!
console.log(final); // { volume: 80, quality: 'HD' }

// ==================
// REAL-WORLD EXAMPLES
// ==================

// Function parameters with destructuring
function createUser({ name, email, age = 18 }) {
    return `User: ${name} (${email}), Age: ${age}`;
}

const newUser = createUser({ name: 'Alice', email: 'alice@example.com' });
console.log(newUser); // User: Alice (alice@example.com), Age: 18

// React-style component props (preview!)
function Button({ text, onClick, style = {}, ...otherProps }) {
    console.log('Button text:', text);
    console.log('Other props:', otherProps);
}

Button({ 
    text: 'Click me', 
    onClick: () => {}, 
    id: 'btn-1', 
    className: 'primary' 
});
```

### 6. Special Collections: Set and Map

#### Set: The Unique Value Guardian
Like a bag of unique marbles - no duplicates allowed!

```javascript
// ==================
// SET: Unique Values Only
// ==================

// Remove duplicates from array
const views = ['home', 'profile', 'home', 'settings', 'profile', 'home'];
const uniqueViews = [...new Set(views)];
console.log(uniqueViews); // ['home', 'profile', 'settings']

// Track unique visitors
const visitors = new Set();
visitors.add('user123');
visitors.add('user456');
visitors.add('user123'); // Ignored, already exists!
console.log(visitors.size); // 2

// Check membership
if (visitors.has('user123')) {
    console.log('User has visited before');
}

// Common use: Finding common/different elements
const skills1 = new Set(['JS', 'React', 'Node']);
const skills2 = new Set(['Python', 'React', 'Node']);

// Intersection (common skills)
const common = [...skills1].filter(skill => skills2.has(skill));
console.log('Common skills:', common); // ['React', 'Node']

// Union (all skills)
const all = new Set([...skills1, ...skills2]);
console.log('All skills:', [...all]); // ['JS', 'React', 'Node', 'Python']

// ==================
// MAP: Better Objects
// ==================

// Map allows ANY type as key (even objects!)
const userRoles = new Map();

const user1 = { id: 1, name: 'Alice' };
const user2 = { id: 2, name: 'Bob' };

userRoles.set(user1, 'admin');
userRoles.set(user2, 'editor');
userRoles.set('guest', 'viewer'); // String key also works

console.log(userRoles.get(user1)); // 'admin'
console.log(userRoles.size); // 3

// Iteration is guaranteed in insertion order
for (const [key, value] of userRoles) {
    console.log(`${key.name || key}: ${value}`);
}

// Real-world: Caching expensive calculations
const cache = new Map();

function expensiveOperation(n) {
    if (cache.has(n)) {
        console.log('Using cached result');
        return cache.get(n);
    }
    
    console.log('Computing...');
    const result = n * n * n; // Pretend this is expensive
    cache.set(n, result);
    return result;
}

console.log(expensiveOperation(5)); // Computing... 125
console.log(expensiveOperation(5)); // Using cached result 125

// When to use Map vs Object:
// Map: When keys aren't strings, need size, need iteration order
// Object: When keys are strings, need JSON serialization
```

### 7. JSON: Speaking the Language of APIs

#### What is JSON?
JSON is how JavaScript objects travel over the internet:
- It's just text (strings)
- Universal format (every language understands it)
- How APIs send and receive data

```javascript
// ==================
// JSON.stringify() - Object to String
// ==================

const gameData = {
    player: 'CoolGamer123',
    level: 42,
    inventory: ['sword', 'shield', 'potion'],
    stats: {
        health: 100,
        mana: 50
    }
};

// Convert to JSON string for saving/sending
const jsonString = JSON.stringify(gameData);
console.log(jsonString);
// {"player":"CoolGamer123","level":42,...}

// Pretty printing (for debugging)
const prettyJson = JSON.stringify(gameData, null, 2);
console.log(prettyJson);
/*
{
  "player": "CoolGamer123",
  "level": 42,
  ...
}
*/

// Save to localStorage (browser storage)
localStorage.setItem('gameData', jsonString);

// ==================
// JSON.parse() - String to Object
// ==================

// Load from localStorage
const savedJson = localStorage.getItem('gameData');
const loadedGame = JSON.parse(savedJson);
console.log(loadedGame.player); // 'CoolGamer123'

// API response simulation
const apiResponse = '{"status":"success","data":{"id":1,"name":"Product"}}';
const responseObj = JSON.parse(apiResponse);
console.log(responseObj.status); // 'success'

// ==================
// REAL-WORLD PATTERNS
// ==================

// 1. Deep copying objects (trick!)
const original = {
    name: 'Alice',
    scores: [90, 85, 92],
    nested: { deep: { value: 42 } }
};

const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.scores.push(100);
console.log(original.scores);  // [90, 85, 92] - unchanged!
console.log(deepCopy.scores);  // [90, 85, 92, 100]

// 2. API communication
async function saveUserData(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) // Convert to JSON!
    });
    
    const result = await response.json(); // Parse JSON response!
    return result;
}

// 3. Configuration files
const config = {
    appName: 'My App',
    version: '1.0.0',
    features: {
        darkMode: true,
        analytics: false
    }
};

// Save configuration
const configJson = JSON.stringify(config);
// Write to file or send to server

// ==================
// JSON LIMITATIONS
// ==================

// These values get lost or changed:
const problematic = {
    date: new Date(),           // Becomes string
    func: () => {},            // Removed!
    undefined: undefined,       // Removed!
    symbol: Symbol('id'),       // Removed!
    nan: NaN,                  // Becomes null
    infinity: Infinity         // Becomes null
};

const jsonified = JSON.parse(JSON.stringify(problematic));
console.log(jsonified);
// Only date remains (as string): {"date":"2024-01-01T00:00:00.000Z"}

// Solution: Custom serialization
const customStringify = (obj) => {
    return JSON.stringify(obj, (key, value) => {
        if (value instanceof Date) {
            return { _type: 'Date', value: value.toISOString() };
        }
        return value;
    });
};
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