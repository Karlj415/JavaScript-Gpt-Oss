# Lesson 10 · Asynchronous JavaScript

Welcome to one of the most important lessons in JavaScript! Asynchronous programming is what makes modern web applications fast, responsive, and user-friendly. Today, we'll master the concepts that separate junior developers from senior ones.

Imagine you're at a restaurant. In a **synchronous** restaurant, you'd have to wait for each course to be completely prepared before ordering the next one. The kitchen would handle only one order at a time, and you'd wait hours for your meal! In an **asynchronous** restaurant, you order everything at once, the kitchen works on multiple dishes simultaneously, and servers bring out food as it's ready.

JavaScript's asynchronous nature works similarly - it can handle multiple operations at once without blocking the main thread.

## Objectives
- **Master the Event Loop**: Understand how JavaScript handles asynchronous operations under the hood
- **Conquer Callback Hell**: Learn to recognize and refactor deeply nested callbacks
- **Promise Mastery**: Create, chain, and handle promises like a pro
- **async/await Excellence**: Write clean, readable asynchronous code
- **Promise Combinators**: Use `Promise.all`, `race`, `allSettled`, and `any` effectively
- **Real-world Applications**: Build practical examples you'll use in actual projects

## Lesson Narrative

### 1. Why Asynchrony Exists

JavaScript is **single-threaded**, meaning it can only do one thing at a time on the main thread. But wait - how can it handle button clicks while loading data from a server?

The secret lies in the **JavaScript runtime environment** (browser or Node.js) that provides additional threads and APIs. Think of it like this:

- **JavaScript Engine**: The main chef (single-threaded)
- **Web APIs/Runtime**: Kitchen assistants (multi-threaded)
- **Event Loop**: The head waiter coordinating everything

```javascript
// Without asynchrony (BLOCKING - Don't do this!)
console.log('Starting task...');
// Imagine this blocks for 5 seconds
for (let i = 0; i < 5000000000; i++) {
  // Blocking operation - freezes the entire page!
}
console.log('Task complete');
// User can't click buttons, scroll, or do anything for 5 seconds!

// With asynchrony (NON-BLOCKING - The right way!)
console.log('Starting task...');
setTimeout(() => {
  console.log('Task complete');
}, 5000);
console.log('Ready for user interaction!');
// User can interact immediately while task runs in background
```

**Real-world scenarios where async is crucial:**
- 📡 Fetching data from APIs (weather, user profiles, posts)
- 📁 Reading/writing files
- ⏱️ Setting timers and delays
- 🎬 Loading images, videos, or other media
- 💾 Database operations
- 🌐 WebSocket connections

### 2. The Event Loop Deep Dive: Understanding the Queue System

The **Event Loop** is JavaScript's traffic controller. It decides what code runs when, especially for asynchronous operations. Understanding this is like having X-ray vision into JavaScript!

#### The Queue Hierarchy (Priority System)

Think of the Event Loop like a VIP nightclub with different entrance lines:

1. **Call Stack** - The VIP room (currently executing code)
2. **Microtask Queue** - VIP line (highest priority)
3. **Macrotask Queue** - General admission line (lower priority)

```
┌─ Call Stack ─────────────────────┐
│ Currently executing functions    │
└──────────────────────────────────┘
           ▲
           │ (when empty, check queues)
┌─ Microtask Queue ────────────────┐
│ • Promise callbacks (.then)      │
│ • queueMicrotask()              │ ← Higher Priority
│ • MutationObserver              │
└──────────────────────────────────┘
           ▲
           │ (only when microtasks empty)
┌─ Macrotask Queue ────────────────┐
│ • setTimeout/setInterval         │
│ • I/O operations                │ ← Lower Priority  
│ • User events (click, scroll)   │
└──────────────────────────────────┘
```

**The Golden Rules:**
1. **Synchronous code** runs first (on the call stack)
2. **All microtasks** must complete before any macrotask
3. **Between each macrotask**, all microtasks run again
4. **Browser rendering** happens between macrotasks

#### Predicting Execution Order

```javascript
// execution-order-detailed.js
console.log('🥇 1. Sync code starts');

// Macrotask - goes to back of macrotask queue
setTimeout(() => console.log('🏃 5. Timeout 1 (Macrotask)'), 0);

// Another macrotask
setTimeout(() => console.log('🏃 6. Timeout 2 (Macrotask)'), 0);

// Microtask - goes to microtask queue
Promise.resolve().then(() => {
  console.log('⚡ 3. Promise 1 (Microtask)');
  // This microtask creates another microtask!
  return Promise.resolve();
}).then(() => {
  console.log('⚡ 4. Promise 2 (Chained Microtask)');
});

console.log('🥈 2. Sync code ends');

/* 
Execution Order:
1. 🥇 1. Sync code starts        (Call Stack)
2. 🥈 2. Sync code ends          (Call Stack)
3. ⚡ 3. Promise 1 (Microtask)    (Microtask Queue - runs first!)
4. ⚡ 4. Promise 2 (Chained)      (Microtask Queue - still higher priority)
5. 🏃 5. Timeout 1 (Macrotask)    (Macrotask Queue - finally runs)
6. 🏃 6. Timeout 2 (Macrotask)    (Macrotask Queue)
*/
```

#### Real-World Implications

```javascript
// Why this matters in real applications
function updateUI() {
  // This runs immediately
  document.getElementById('status').textContent = 'Loading...';
  
  // Microtask - runs before DOM updates are rendered
  Promise.resolve().then(() => {
    console.log('This runs before the "Loading..." text appears!');
  });
  
  // Macrotask - runs after DOM updates
  setTimeout(() => {
    console.log('This runs after "Loading..." is visible to user');
    document.getElementById('status').textContent = 'Complete!';
  }, 0);
}
```

### 3. Callbacks: The Foundation of Async JavaScript

A **callback** is simply a function that gets called later - like leaving your phone number for a callback from customer service. In JavaScript, callbacks were the original way to handle asynchronous operations.

#### Understanding Callbacks with Real Examples

```javascript
// Simple callback example - like ordering food delivery
function orderPizza(type, onReady) {
  console.log(`Ordering ${type} pizza...`);
  
  // Simulate cooking time
  setTimeout(() => {
    console.log(`${type} pizza is ready!`);
    onReady(); // This is the callback - called when pizza is done
  }, 2000);
}

// Using the callback
orderPizza('Margherita', () => {
  console.log('Time to eat!');
});

// Browser APIs use callbacks extensively
button.addEventListener('click', () => {
  console.log('Button clicked!'); // This is a callback
});

fs.readFile('data.txt', (error, data) => {
  if (error) {
    console.error('Error reading file:', error);
  } else {
    console.log('File contents:', data);
  }
});
```

#### The "Pyramid of Doom" (Callback Hell)

When you need multiple async operations in sequence, callbacks create deeply nested code that's hard to read and maintain. It looks like a sideways pyramid!

```javascript
// callback-hell.js - A real-world example
// Scenario: User login -> Get profile -> Get posts -> Get comments

function loginUser(credentials, callback) {
  // Simulate API call
  setTimeout(() => callback(null, { userId: 123 }), 1000);
}

function getUserProfile(userId, callback) {
  setTimeout(() => callback(null, { name: 'John', email: 'john@example.com' }), 500);
}

function getUserPosts(userId, callback) {
  setTimeout(() => callback(null, ['Post 1', 'Post 2']), 300);
}

function getPostComments(postId, callback) {
  setTimeout(() => callback(null, ['Comment 1', 'Comment 2']), 200);
}

// THE PYRAMID OF DOOM! 🏔️
loginUser({ username: 'john', password: '123' }, (err, user) => {
  if (err) {
    console.error('Login failed:', err);
  } else {
    getUserProfile(user.userId, (err, profile) => {
      if (err) {
        console.error('Profile fetch failed:', err);
      } else {
        getUserPosts(user.userId, (err, posts) => {
          if (err) {
            console.error('Posts fetch failed:', err);
          } else {
            getPostComments(posts[0], (err, comments) => {
              if (err) {
                console.error('Comments fetch failed:', err);
              } else {
                // Finally! We have everything
                console.log('User data:', { profile, posts, comments });
                // But this is getting ridiculous... 😵
              }
            });
          }
        });
      }
    });
  }
});
```

**Problems with Callback Hell:**
- 📖 **Hard to read** - Code flows horizontally instead of vertically
- 🔧 **Difficult to maintain** - Adding features requires deep nesting
- 🐛 **Error handling mess** - Repetitive error checking
- 🧪 **Testing nightmare** - Hard to test individual steps
- 🔄 **No easy way to handle parallel operations**

### 4. Promises: The Hero That Saved Us from Callback Hell

A **Promise** is like a restaurant receipt - it's a guarantee that something will happen in the future. It represents the eventual completion (or failure) of an asynchronous operation.

Think of it this way:
- 🏦 **Pending**: Your order is being prepared
- ✅ **Fulfilled (Resolved)**: Your order is ready!
- ❌ **Rejected**: Sorry, we're out of ingredients

#### Promise States

```
┌──────────────────────┐
│      PROMISE STATES      │
├──────────────────────┤
│  🔄 PENDING           │
│  (initial state)        │
│         │              │
│         ▼              │
│  ✅ FULFILLED   ❌ REJECTED  │
│  (success)     (failure)   │
│                         │
│ Note: Once settled,      │
│ state cannot change!     │
└──────────────────────┘
```

#### Creating Promises from Scratch

```javascript
// create-promise.js - Real-world examples

// Example 1: Simple delay function
function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      return reject(new Error("Time cannot go backwards! 😅"));
    }
    
    setTimeout(() => {
      resolve(`✅ Successfully waited ${ms}ms`);
    }, ms);
  });
}

// Example 2: Simulating API call
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error('❌ Invalid user ID'));
      } else {
        resolve({
          id: userId,
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://example.com/avatar.jpg'
        });
      }
    }, 1000);
  });
}

// Example 3: "Promisifying" a callback-based function
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    // Old callback-style function
    fs.readFile(filename, 'utf8', (error, data) => {
      if (error) {
        reject(error); // Something went wrong
      } else {
        resolve(data); // Success!
      }
    });
  });
}

// Using our promises
delay(1000)
  .then(message => {
    console.log(message); // "✅ Successfully waited 1000ms"
    return fetchUserData(123); // Return another promise for chaining
  })
  .then(userData => {
    console.log('👤 User data:', userData);
  })
  .catch(error => {
    console.error('❌ Something went wrong:', error.message);
  });
```

#### Promise Chaining: Escape from Callback Hell

Promises allow you to chain operations in a linear, readable way. Each `.then()` returns a new promise, allowing you to chain operations together.

```javascript
// promise-chaining.js - Same scenario as callback hell, but clean!

function loginUser(credentials) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId: 123 }), 1000);
  });
}

function getUserProfile(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'John', email: 'john@example.com' }), 500);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['Post 1', 'Post 2']), 300);
  });
}

function getPostComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['Comment 1', 'Comment 2']), 200);
  });
}

// CLEAN PROMISE CHAIN! 🌟
loginUser({ username: 'john', password: '123' })
  .then(user => {
    console.log('✅ User logged in:', user);
    return getUserProfile(user.userId);
  })
  .then(profile => {
    console.log('✅ Profile loaded:', profile);
    return getUserPosts(profile.id || 123);
  })
  .then(posts => {
    console.log('✅ Posts loaded:', posts);
    return getPostComments(posts[0]);
  })
  .then(comments => {
    console.log('✅ Comments loaded:', comments);
    console.log('🎉 All data loaded successfully!');
  })
  .catch(error => {
    console.error('❌ Something went wrong:', error);
  })
  .finally(() => {
    console.log('🏁 Operation complete');
  });
```

#### Promise Methods Explained

- **`.then(onFulfilled, onRejected)`**: Handles successful resolution
- **`.catch(onRejected)`**: Handles errors (shorthand for `.then(null, onRejected)`)
- **`.finally(onFinally)`**: Runs regardless of success/failure (cleanup)

```javascript
// Real-world API example
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('📡 Response received:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json(); // This also returns a promise!
  })
  .then(post => {
    console.log('📄 Post data:', post.title);
    
    // Transform the data
    return {
      ...post,
      wordCount: post.body.split(' ').length,
      readTime: Math.ceil(post.body.split(' ').length / 200) // avg reading speed
    };
  })
  .then(enhancedPost => {
    console.log('✨ Enhanced post:', enhancedPost);
  })
  .catch(error => {
    console.error('❌ Fetch failed:', error.message);
  })
  .finally(() => {
    console.log('🔄 Request completed');
  });
```

### 5. async/await: The Elegant Solution

`async/await` is syntactic sugar over promises that makes asynchronous code look and feel like synchronous code. It's the modern standard for handling async operations.

**Think of `await` as a "pause" button** - it pauses function execution until the promise resolves, then continues with the result.

#### Basic async/await Syntax

```javascript
// async-await-basics.js

// The same promise chain from before, but with async/await:
async function loadUserData() {
  try {
    console.log('🚀 Starting user data load...');
    
    // Each 'await' pauses until the promise resolves
    const user = await loginUser({ username: 'john', password: '123' });
    console.log('✅ User logged in:', user);
    
    const profile = await getUserProfile(user.userId);
    console.log('✅ Profile loaded:', profile);
    
    const posts = await getUserPosts(user.userId);
    console.log('✅ Posts loaded:', posts);
    
    const comments = await getPostComments(posts[0]);
    console.log('✅ Comments loaded:', comments);
    
    console.log('🎉 All data loaded successfully!');
    return { user, profile, posts, comments };
    
  } catch (error) {
    console.error('❌ Something went wrong:', error.message);
    throw error; // Re-throw if you want calling code to handle it
  } finally {
    console.log('🏁 Load operation complete');
  }
}

// Call the async function
loadUserData()
  .then(allData => console.log('📦 Final result:', allData))
  .catch(error => console.error('🛑 Failed to load data'));
```

#### Real-World async/await Examples

```javascript
// real-world-async-await.js

// Example 1: API data fetching
async function fetchPostWithComments(postId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const post = await response.json();
    
    // Fetch comments for this post
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const comments = await commentsResponse.json();
    
    return {
      ...post,
      comments,
      commentCount: comments.length,
      hasComments: comments.length > 0
    };
  } catch (error) {
    console.error('😱 Failed to fetch post:', error.message);
    return null;
  }
}

// Example 2: File operations (Node.js)
const fs = require('fs').promises;

async function processFile(filename) {
  try {
    console.log(`📁 Reading ${filename}...`);
    const data = await fs.readFile(filename, 'utf8');
    
    console.log('⚙️ Processing data...');
    const processedData = data.toUpperCase();
    
    const outputFile = filename.replace('.txt', '-processed.txt');
    console.log(`💾 Writing to ${outputFile}...`);
    await fs.writeFile(outputFile, processedData);
    
    console.log('✅ File processed successfully!');
    return outputFile;
  } catch (error) {
    console.error('❌ File processing failed:', error.message);
    throw error;
  }
}

// Example 3: Database operations (conceptual)
async function createUserAccount(userData) {
  const transaction = await db.beginTransaction();
  
  try {
    // Create user record
    const user = await db.users.create({
      name: userData.name,
      email: userData.email
    });
    
    // Create user profile
    const profile = await db.profiles.create({
      userId: user.id,
      bio: userData.bio || 'New user'
    });
    
    // Send welcome email
    await emailService.sendWelcomeEmail(user.email, user.name);
    
    await transaction.commit();
    
    return { user, profile };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Account creation failed: ${error.message}`);
  }
}
```

### 6. Promise Combinators: Working with Multiple Promises

When you need to handle multiple asynchronous operations, Promise combinators are your best friends. Each has its own superpower!

#### Promise.all() - "Wait for everyone" 👥

**Use when:** You need ALL operations to succeed, and you want them to run in parallel.

```javascript
// promise-all.js
async function loadDashboardData() {
  try {
    console.log('🚀 Loading dashboard...');
    
    // All of these run in PARALLEL (not sequential!)
    const [user, posts, notifications, settings] = await Promise.all([
      fetchUser(123),
      fetchUserPosts(123),
      fetchNotifications(123),
      fetchUserSettings(123)
    ]);
    
    console.log('✅ All dashboard data loaded!');
    return { user, posts, notifications, settings };
  } catch (error) {
    // If ANY promise fails, this catch runs
    console.error('❌ Dashboard load failed:', error);
    throw error;
  }
}

// Real timing example
async function fetchMultipleAPIs() {
  const startTime = Date.now();
  
  // This takes ~3 seconds total (all run in parallel)
  const results = await Promise.all([
    delay(1000).then(() => 'First API (1s)'),
    delay(2000).then(() => 'Second API (2s)'),
    delay(3000).then(() => 'Third API (3s)')
  ]);
  
  console.log(`Total time: ${Date.now() - startTime}ms`); // ~3000ms, not 6000ms!
  return results;
}
```

#### Promise.allSettled() - "Tell me what happened to everyone" 📊

**Use when:** You want to try all operations and see which ones succeeded/failed.

```javascript
// promise-allSettled.js
async function loadOptionalData() {
  const results = await Promise.allSettled([
    fetchUser(123),
    fetchUserAvatar(123),
    fetchUserPreferences(123),
    fetch('https://broken-api.com/data') // This will fail
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`✅ Operation ${index + 1} succeeded:`, result.value);
    } else {
      console.log(`❌ Operation ${index + 1} failed:`, result.reason.message);
    }
  });
  
  // Extract successful results
  const successfulResults = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);
  
  return successfulResults;
}
```

#### Promise.race() - "First one wins" 🏁

**Use when:** You want the first result, regardless of which promise finishes first.

```javascript
// promise-race.js

// Example 1: Timeout pattern
function fetchWithTimeout(url, timeoutMs = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
}

// Example 2: Multiple mirror APIs
async function fetchFromMirrors(endpoint) {
  const mirrors = [
    `https://api1.example.com${endpoint}`,
    `https://api2.example.com${endpoint}`,
    `https://api3.example.com${endpoint}`
  ];
  
  try {
    // Use whichever API responds first
    const response = await Promise.race(mirrors.map(url => fetch(url)));
    return await response.json();
  } catch (error) {
    console.error('All mirrors failed or timed out');
    throw error;
  }
}

// Example 3: User interaction race
function waitForUserAction() {
  return Promise.race([
    waitForClick('#submit-btn').then(() => 'clicked'),
    waitForKeypress('Enter').then(() => 'pressed'),
    delay(10000).then(() => 'timeout')
  ]);
}
```

#### Promise.any() - "First success wins" 🎆

**Use when:** You want the first successful result (ignores failures until all fail).

```javascript
// promise-any.js

// Try multiple backup strategies
async function loadConfigFromBackups() {
  try {
    const config = await Promise.any([
      loadConfigFromCache(),     // Fastest, might be stale
      loadConfigFromLocalStorage(), // Fallback 1
      loadConfigFromAPI(),       // Fallback 2, most reliable
      loadDefaultConfig()        // Last resort
    ]);
    
    console.log('✅ Config loaded from first available source');
    return config;
  } catch (error) {
    // This only happens if ALL promises reject
    console.error('❌ All config sources failed:', error);
    throw new Error('Unable to load configuration');
  }
}

// Comparison: Promise.any vs Promise.race
function demonstrateDifference() {
  const promises = [
    Promise.reject('First fails'),
    Promise.resolve('Second succeeds'),
    Promise.resolve('Third succeeds')
  ];
  
  // Promise.race returns first (even if it's a rejection)
  Promise.race(promises)
    .then(result => console.log('Race result:', result))
    .catch(error => console.log('Race error:', error)); // "First fails"
  
  // Promise.any returns first success
  Promise.any(promises)
    .then(result => console.log('Any result:', result)) // "Second succeeds"
    .catch(error => console.log('Any error:', error));
}
```

#### Combining Strategies

```javascript
// advanced-promise-patterns.js

// Load critical and optional data separately
async function loadAppData() {
  try {
    // Critical data - must all succeed
    const critical = await Promise.all([
      fetchUserAuth(),
      fetchAppConfig()
    ]);
    
    // Optional data - get whatever we can
    const optional = await Promise.allSettled([
      fetchUserPreferences(),
      fetchRecentActivity(),
      fetchNotifications()
    ]);
    
    return {
      critical,
      optional: optional
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
    };
  } catch (error) {
    console.error('Failed to load critical app data');
    throw error;
  }
}
```

### 7. Advanced Async Patterns

#### Top-Level await
In modern JavaScript modules, you can use `await` outside of an `async` function.

```javascript
// app.js - ES module (type="module" or .mjs file)
console.log('🚀 App starting...');

// No need to wrap in an async function!
const config = await fetch('./config.json').then(r => r.json());
console.log('⚙️ Config loaded:', config);

const user = await getCurrentUser();
console.log('👤 Current user:', user.name);

console.log('✅ App initialized!');
```

#### Error Handling Best Practices

```javascript
// error-handling-patterns.js

// Pattern 1: Specific error handling
async function robustDataFetching() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      // Handle different HTTP errors differently
      if (response.status === 401) {
        throw new Error('Authentication required');
      } else if (response.status === 404) {
        throw new Error('Resource not found');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    // Network errors, JSON parsing errors, etc.
    if (error.name === 'TypeError') {
      throw new Error('Network error: Check your connection');
    }
    
    // Re-throw our custom errors
    throw error;
  }
}

// Pattern 2: Graceful degradation
async function loadUserData(userId) {
  const defaults = {
    name: 'Guest User',
    avatar: '/default-avatar.png',
    preferences: {}
  };
  
  try {
    return await fetchUserData(userId);
  } catch (error) {
    console.warn('⚠️ Failed to load user data, using defaults:', error.message);
    return defaults;
  }
}
```

#### Performance Considerations

```javascript
// performance-tips.js

// ❌ BAD: Sequential when parallel is possible
async function loadDataSlowly() {
  const user = await fetchUser();      // Wait 1s
  const posts = await fetchPosts();    // Wait another 1s
  const comments = await fetchComments(); // Wait another 1s
  // Total: ~3 seconds
}

// ✅ GOOD: Parallel when possible
async function loadDataFast() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  // Total: ~1 second (whatever the slowest takes)
}

// ✨ EVEN BETTER: Start what you can early
async function loadDataOptimal() {
  // Start user fetch immediately
  const userPromise = fetchUser();
  
  // Do some synchronous work while user loads
  const defaultSettings = getDefaultSettings();
  
  // Now wait for user and start dependent fetches
  const user = await userPromise;
  
  // These can run in parallel since they both need user.id
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),
    fetchComments(user.id)
  ]);
  
  return { user, posts, comments, settings: defaultSettings };
}
```

## Practical Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory. These exercises will give you hands-on experience with:

1. Converting callback-based code to promises
2. Fetching data from multiple sources with Promise combinators
3. Building a complete API client with error handling and cancellation

## Key Takeaways

1. **Single-threaded != Single-tasking**: JavaScript is single-threaded, but its runtime environment allows asynchronous operations.

2. **Event Loop Priority**: Remember the golden rule - microtasks (Promises) run before macrotasks (setTimeout).

3. **Modern Async Progression**:
   - Callbacks → Promises → async/await
   - Each solution solves problems with the previous approach

4. **Promise Combinators Cheat Sheet**:
   - `Promise.all()`: ALL must succeed (parallel execution)
   - `Promise.race()`: First one wins (success or failure)
   - `Promise.allSettled()`: Wait for ALL (get success/failure for each)
   - `Promise.any()`: First SUCCESS wins

5. **Performance Tip**: When operations don't depend on each other, run them in parallel with Promise.all()

## Watch These Videos

- [What the heck is the event loop anyway? (Philip Roberts)](https://www.youtube.com/watch?v=8aGhZQkoFbQ) - Visualizing the event loop
- [Promises in 10 Minutes (Web Dev Simplified)](https://www.youtube.com/watch?v=DHvZLI7Db8E) - Concise explanation of promises
- [JavaScript Promises in 100 Seconds (Fireship)](https://www.youtube.com/watch?v=RvYYCGs45L4) - Quick introduction
- [async/await in JavaScript (Academind)](https://www.youtube.com/watch?v=jAAmI5gMlVo) - Detailed async/await tutorial

## References

### Official Documentation
- MDN: [Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- MDN: [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- MDN: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- MDN: [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- MDN: [Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

### Additional Learning Resources
- [JavaScript.info: Promises, async/await](https://javascript.info/async) - Comprehensive tutorial
- [ES6 Promises in Depth](https://ponyfoo.com/articles/es6-promises-in-depth) - Deep dive into Promises
- [Understanding async/await](https://css-tricks.com/understanding-async-await/) - Visual guide to async/await
- [Error handling in async functions](https://www.valentinog.com/blog/throw-async/) - Best practices

## Reflection Questions

After completing this lesson, challenge yourself with these questions:

### 1. Event Loop Understanding
**Question:** Explain the output of the microtask/macrotask example in your own words. Why do promises run before setTimeout, even with a 0ms delay?

**Think about:** The priority system in JavaScript's event loop and how it affects execution order.

### 2. Promise Combinator Choice
**Question:** When would you use `Promise.all` vs. `Promise.allSettled`? Give a real-world scenario for each.

**Consider:** 
- What happens when one operation fails in each case?
- When do you need "fail-fast" behavior vs. "get all results"?

### 3. Error Handling Evolution
**Question:** How does `async/await` improve upon `.then()` chains for error handling?

**Compare:**
```javascript
// Promise chain error handling
fetchUserData()
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .catch(error => handleError(error));

// async/await error handling
try {
  const user = await fetchUserData();
  const posts = await fetchUserPosts(user.id);
  const comments = await fetchComments(posts[0].id);
} catch (error) {
  handleError(error);
}
```

### 4. Performance Considerations
**Question:** Look at these two approaches. Which is faster and why?

```javascript
// Approach A
const user = await fetchUser();
const posts = await fetchPosts();
const settings = await fetchSettings();

// Approach B
const [user, posts, settings] = await Promise.all([
  fetchUser(),
  fetchPosts(), 
  fetchSettings()
]);
```

### 5. Real-World Application
**Question:** Imagine you're building a dashboard that loads:
- User profile (required)
- Recent activities (optional - nice to have)
- Notifications (optional)
- System status (optional)

Which Promise combinator would you use and why? Write pseudo-code for your solution.

---

## Next Steps

Congratulations! You've mastered asynchronous JavaScript. You now understand:
- ✅ How the event loop prioritizes different types of tasks
- ✅ When and how to use callbacks, promises, and async/await
- ✅ How to handle multiple asynchronous operations efficiently
- ✅ Best practices for error handling and performance

**Coming up in Lesson 11:** We'll explore modules, npm, and the tooling ecosystem that keeps large JavaScript applications organized and maintainable.

---

*"The best way to understand asynchronous JavaScript is to build with it. Keep experimenting, and these concepts will become second nature!"* 🚀
