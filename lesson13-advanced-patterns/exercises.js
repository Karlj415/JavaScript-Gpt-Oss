// =================================================================
// 🧩 ADVANCED JAVASCRIPT PATTERNS - PRACTICE EXERCISES
// =================================================================

/*
👋 WELCOME TO THE ADVANCED PATTERNS WORKSHOP!

These exercises will help you apply the professional patterns you've learned.
Don't worry if they seem challenging - that's how you grow as a developer!

⏰ Time Estimate: 45-90 minutes
🎯 Goal: Build practical examples of each pattern

🗺️ EXERCISE ROADMAP:
1. Functional Programming: Composition
2. Design Patterns: Observer Pattern
3. Design Patterns: Factory Pattern

💡 TIP: The patterns may seem complex at first, but they solve real problems.
Try to understand WHY each pattern is useful before implementing it.
*/

// =================================================================
// 🧩 EXERCISE 1: Function Composition - Text Processing Pipeline
// =================================================================

/*
🎯 TASK: Create a text processing pipeline using function composition

Real-world scenario: You need to normalize user input for a URL slug
(like "My Cool Article!" → "my-cool-article")

📋 STEPS:
1. Create a compose() utility function that takes multiple functions
   and chains them together (right-to-left processing order).

2. Create these transformation functions:
   - trimWhitespace: Removes leading/trailing spaces
   - toLowerCase: Converts text to lowercase
   - replaceSpacesWithHyphens: Replaces spaces with hyphens
   - removeSpecialChars: Removes non-alphanumeric characters

3. Use compose() to create a "createSlug" pipeline combining all functions

4. Test your pipeline with various inputs

🔍 WHAT YOU'LL LEARN: How to break complex operations into simple,
   reusable functions and chain them together.

💡 HINT: Remember, compose() processes right-to-left:
   compose(func3, func2, func1)(data) means data goes through func1, then func2, then func3
*/

// Your compose utility function - this chains functions together
function compose(...functions) {
  return (value) => {
    return functions.reduceRight((result, fn) => fn(result), value);
  };
}

// Your transformation functions
function trimWhitespace(text) {
  return text.trim();
}

function toLowerCase(text) {
  return text.toLowerCase();
}

function replaceSpacesWithHyphens(text) {
  return text.replace(/\s+/g, '-');
}

function removeSpecialChars(text) {
  return text.replace(/[^a-z0-9-]/g, '');
}

// Create your text processing pipeline
const createSlug = compose(
  removeSpecialChars,
  replaceSpacesWithHyphens,
  toLowerCase,
  trimWhitespace
);

// Test your function - uncomment these lines to run them
// console.log(createSlug("  Hello World!  "));               // "hello-world"
// console.log(createSlug("JavaScript is AWESOME!!!"));       // "javascript-is-awesome"
// console.log(createSlug("  This@#$, that & the OTHER  ")); // "this-that-the-other"

// =================================================================
// 🧩 EXERCISE 2: Observer Pattern - Simple Event System
// =================================================================

/*
🎯 TASK: Create an EventEmitter class that implements the Observer pattern

Real-world scenario: You need a simple event system for your application to
allow components to communicate without directly depending on each other.

📋 STEPS:
1. Create an EventEmitter class with these methods:
   - on(eventName, listener): Subscribe to an event
   - off(eventName, listener): Unsubscribe from an event
   - emit(eventName, ...args): Trigger an event with data
   - once(eventName, listener): Subscribe to an event for one-time execution

2. Implement proper event listener management (adding, removing, triggering)

3. Test your EventEmitter with various events

🔍 WHAT YOU'LL LEARN: How components can communicate through events
without directly knowing about each other (loose coupling).

💡 HINT: Store event listeners in a Map where the key is the event name
and the value is an array of listener functions.
*/

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // Subscribe to an event
  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
    return this; // For method chaining
  }

  // Unsubscribe from an event
  off(eventName, listener) {
    if (!this.events.has(eventName)) return this;

    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
      // Remove the event entirely if no listeners remain
      if (listeners.length === 0) {
        this.events.delete(eventName);
      }
    }

    return this; // For method chaining
  }

  // Trigger an event with optional data
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return false;

    const listeners = this.events.get(eventName);
    listeners.forEach(listener => {
      listener(...args);
    });

    return true;
  }

  // Subscribe to an event for one-time execution
  once(eventName, listener) {
    // Create a wrapper that will remove itself after execution
    const onceWrapper = (...args) => {
      listener(...args);          // Call the original listener
      this.off(eventName, onceWrapper); // Remove this wrapper
    };
    
    return this.on(eventName, onceWrapper);
  }
}

// Test your EventEmitter - uncomment these lines to run them
// const emitter = new EventEmitter();
// 
// // Regular event listener
// function onUserLogin(user) {
//   console.log(`User logged in: ${user.name}`);
// }
// 
// // Add listeners
// emitter.on('login', onUserLogin);
// emitter.once('login', user => console.log('First login only!'));
// 
// // Emit events
// emitter.emit('login', { name: 'John', id: 123 });
// emitter.emit('login', { name: 'Jane', id: 456 }); // 'once' listener won't fire again
// 
// // Remove listener
// emitter.off('login', onUserLogin);
// emitter.emit('login', { name: 'Bob', id: 789 }); // Nothing happens

// =================================================================
// 🧩 EXERCISE 3: Factory Pattern - Storage Adapters
// =================================================================

/*
🎯 TASK: Create a storage factory that produces different storage adapters

Real-world scenario: Your application needs to store data using different
storage mechanisms (localStorage, sessionStorage, memory) but you want
a consistent API regardless of which storage is used.

📋 STEPS:
1. Create a factory function that can produce different "storage adapters"

2. Implement these storage types:
   - memoryStorage: Stores data in memory (a simple object)
   - localStorageAdapter: Uses browser's localStorage
   - sessionStorageAdapter: Uses browser's sessionStorage

3. Each adapter should implement the same interface:
   - getItem(key): Retrieves a stored value
   - setItem(key, value): Stores a value
   - removeItem(key): Deletes a stored value
   - clear(): Removes all stored values

4. Test your factory by creating and using different storage adapters

🔍 WHAT YOU'LL LEARN: How to create objects that share the same interface
but have different implementations, allowing for easy swapping.

💡 HINT: For the memoryStorage adapter, use a regular JavaScript object
to store the key-value pairs in memory.
*/

// Storage Factory
function createStorage(type = 'memory') {
  // In-memory storage implementation
  if (type === 'memory') {
    const data = {};
    
    return {
      type: 'memory',
      getItem(key) {
        return data[key] === undefined ? null : data[key];
      },
      setItem(key, value) {
        data[key] = value;
      },
      removeItem(key) {
        delete data[key];
      },
      clear() {
        Object.keys(data).forEach(key => delete data[key]);
      }
    };
  }
  
  // LocalStorage adapter
  if (type === 'localStorage') {
    return {
      type: 'localStorage',
      getItem(key) {
        return localStorage.getItem(key);
      },
      setItem(key, value) {
        localStorage.setItem(key, value);
      },
      removeItem(key) {
        localStorage.removeItem(key);
      },
      clear() {
        localStorage.clear();
      }
    };
  }
  
  // SessionStorage adapter
  if (type === 'sessionStorage') {
    return {
      type: 'sessionStorage',
      getItem(key) {
        return sessionStorage.getItem(key);
      },
      setItem(key, value) {
        sessionStorage.setItem(key, value);
      },
      removeItem(key) {
        sessionStorage.removeItem(key);
      },
      clear() {
        sessionStorage.clear();
      }
    };
  }
  
  throw new Error(`Storage type '${type}' is not supported`);
}

// Test your storage factory - uncomment these lines to run them
// const memoryStore = createStorage('memory');
// const localStore = createStorage('localStorage');
// 
// // Both have the same API
// memoryStore.setItem('greeting', 'Hello from memory!');
// localStore.setItem('greeting', 'Hello from localStorage!');
// 
// console.log(memoryStore.getItem('greeting'));  // 'Hello from memory!'
// console.log(localStore.getItem('greeting'));   // 'Hello from localStorage!'

// =================================================================
// 🚀 MAIN PROJECT: Analytics Pipeline Library
// =================================================================

/*
🌟 PROJECT OBJECTIVE:

Build a professional analytics pipeline library that combines MULTIPLE advanced patterns
in a real-world scenario. This is exactly the kind of code you'd find in production systems!

Your library will process analytics events (like page views, clicks, etc.) through a
series of transformation steps before sending them for analysis.

📊 REAL-WORLD CONTEXT:

Companies like Google Analytics and Mixpanel use similar pipelines to process 
millions of events per day. Your version will be simpler, but uses the same principles!

🧩 PATTERNS YOU'LL USE:
- ✅ Factory Pattern (createPipeline function)
- ✅ Closures (for private state)
- ✅ Observer Pattern (subscribe/notify)
- ✅ Generator Functions (for unique IDs)
- ✅ Functional Composition (for processing steps)
- ✅ Proxy Objects (for API protection and logging)

⏱️ Time Estimate: 1.5-2.5 hours
🏆 Difficulty: Challenging (but very rewarding!)

📋 YOUR TASKS:

1. FACTORY & CLOSURE PATTERN
   - Create a `createPipeline()` factory function
   - Use closures to maintain private state (steps, observers)

2. STATE MANAGEMENT
   - Inside the factory, create a private array for processing steps
   - These steps will transform events as they pass through

3. OBSERVER PATTERN
   - Implement a system where other code can subscribe to events
   - Support events like "stepAdded" and "eventProcessed"

4. GENERATOR FUNCTION
   - Create a generator that produces unique, incrementing IDs
   - Every event that goes through the pipeline gets a unique ID

5. PROXY PROTECTION
   - Wrap the pipeline object in a Proxy
   - Prevent modification of the API by intercepting 'set' operations
   - Log when methods are accessed through the 'get' handler

6. PUBLIC API
   - addStep(fn): Add a processing function to the pipeline
   - process(event): Process an event through all steps
   - subscribe(eventName, callback): Subscribe to pipeline events

💡 THINK ABOUT:
- How do the patterns work together to create a flexible system?
- How does each pattern solve a specific problem?
- How does this approach make your code more maintainable?
*/

// =================================================================
// 📝 STARTER CODE WITH IMPLEMENTATION HINTS
// =================================================================

// --- Starter Code for the Project ---

/**
 * Creates an analytics pipeline for processing events through multiple steps.
 * Combines factory, observer, generator, and proxy patterns.
 * @returns {Object} A pipeline object with addStep, process, and subscribe methods
 */
export function createPipeline() {
  // === PRIVATE STATE (inaccessible from outside thanks to closure) ===
  let steps = [];           // Array of processing functions
  const observers = new Map(); // Event name -> array of callbacks

  // === GENERATOR FOR UNIQUE EVENT IDs ===
  /**
   * Creates an infinite sequence of unique IDs
   * The * makes this a generator function - it can yield values and pause
   */
  function* createEventIdGenerator() {
    let id = 1;
    while (true) { // This is safe because generators pause between yields
      yield id++; // Pause and return the current id, then increment for next time
    }
  }
  
  // Create our ID generator instance
  const eventIdGenerator = createEventIdGenerator();

  // === PRIVATE OBSERVER NOTIFICATION FUNCTION ===
  /**
   * Notifies all subscribers of a particular event
   * @param {string} eventName - Name of the event to trigger
   * @param {any} data - Data to pass to the subscribers
   */
  function notify(eventName, data) {
    // Only notify if someone is listening to this event
    if (observers.has(eventName)) {
      // Call each subscriber with the data
      observers.get(eventName).forEach(callback => callback(data));
    }
  }

  // === PUBLIC API (methods exposed to users) ===
  const pipeline = {
    /**
     * Adds a processing step to the pipeline
     * @param {Function} fn - Function to add as a processing step
     */
    addStep(fn) {
      steps.push(fn);
      // Notify any subscribers that a step was added
      notify('stepAdded', fn);
    },

    /**
     * Processes an event through all pipeline steps
     * @param {Object} event - The event to process
     * @returns {Object} The processed event
     */
    process(event) {
      // 1. Add a unique ID to the event
      const eventWithId = { 
        ...event, 
        id: eventIdGenerator.next().value,
        timestamp: new Date().toISOString()
      };

      // 2. Run the event through all processing steps using reduce for composition
      const processedEvent = steps.reduce((acc, fn) => fn(acc), eventWithId);

      // 3. Notify subscribers that processing is complete
      notify('eventProcessed', processedEvent);
      
      // 4. Return the final processed event
      return processedEvent;
    },

    /**
     * Subscribe to pipeline events
     * @param {string} eventName - Name of the event (e.g., 'stepAdded', 'eventProcessed')
     * @param {Function} callback - Function to call when the event occurs
     */
    subscribe(eventName, callback) {
      // Create a new array for this event type if it doesn't exist
      if (!observers.has(eventName)) {
        observers.set(eventName, []);
      }
      // Add this callback to the subscribers list
      observers.get(eventName).push(callback);
    },
  };

  // === PROXY PROTECTION ===
  // Wrap the pipeline in a proxy to intercept property access and modification
  const proxy = new Proxy(pipeline, {
    // Intercept when someone tries to GET a property/method
    get(target, prop) {
      console.log(`[Pipeline] Accessing method: ${prop}`);
      return Reflect.get(target, prop);
    },
    
    // Intercept when someone tries to SET a property/method
    set(target, prop, value) {
      console.warn(`[Pipeline] 🛑 Security warning: Modifying the pipeline API is not allowed.`);
      return false; // Prevent the modification
    }
  });

  // Return the protected proxy instead of the raw pipeline
  return proxy;
}

// =================================================================
// 🧪 EXAMPLE USAGE (UNCOMMENT TO TEST YOUR IMPLEMENTATION)
// =================================================================

/*
// 1. Create a new pipeline
const analyticsPipeline = createPipeline();

// 2. Subscribe to pipeline events
analyticsPipeline.subscribe('stepAdded', (fn) => {
  console.log(`🔔 Pipeline notification: A new processing step was added: ${fn.name}`);
});

analyticsPipeline.subscribe('eventProcessed', (event) => {
  console.log(`🔔 Pipeline notification: Event processed successfully:`);
  console.log(JSON.stringify(event, null, 2));
});

// 3. Create processing steps

// Clean event data by removing null/undefined properties
function cleanEvent(event) {
  const cleaned = { ...event };
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === null || cleaned[key] === undefined) {
      delete cleaned[key];
    }
  });
  return cleaned;
}

// Add user agent info
function addUserAgentInfo(event) {
  return {
    ...event,
    userAgent: {
      browser: 'Chrome',  // In a real app, we'd detect this
      version: '91.0.4472.124',
      mobile: false
    }
  };
}

// Add geographic location
function addGeoData(event) {
  return {
    ...event,
    geo: {
      country: 'United States',
      city: 'San Francisco',
      timezone: 'America/Los_Angeles'
    }
  };
}

// Add these steps to our pipeline
analyticsPipeline.addStep(cleanEvent);
analyticsPipeline.addStep(addUserAgentInfo);
analyticsPipeline.addStep(addGeoData);

// 4. Process some events
console.log('\n--- Processing pageview event ---');
analyticsPipeline.process({ 
  type: 'pageview',
  page: '/products',
  referrer: null,
  sessionId: 'abc123'
});

console.log('\n--- Processing click event ---');
analyticsPipeline.process({ 
  type: 'click', 
  target: '#signup-button',
  position: { x: 250, y: 300 } 
});

// 5. Try to modify the pipeline (should be blocked by proxy)
console.log('\n--- Attempting to modify pipeline API ---');
try {
  analyticsPipeline.newMethod = function() { console.log('This should not work'); };
  analyticsPipeline.process = null; // Try to break the pipeline
} catch (e) {
  console.log('Error caught:', e.message);
}
*/

// =================================================================
// 🏆 BONUS CHALLENGES
// =================================================================

/*
Ready for more? Try extending your pipeline with these features:

1. 🔄 PIPELINE BRANCHING
   - Add conditional processing based on event type
   - Example: analyticsPipeline.addConditionalStep(condition, fn)

2. 🔒 ERROR HANDLING
   - Add try/catch inside the process method
   - Notify observers of processing errors
   - Allow defining fallback/recovery steps

3. 📊 PERFORMANCE MONITORING
   - Track how long each processing step takes
   - Report slow steps to observers
   - Optionally skip slow steps after a timeout

4. 🧠 STEP PRIORITIZATION
   - Allow steps to be added with priority levels
   - Process high-priority steps first
   - Example: analyticsPipeline.addStep(fn, {priority: 'high'})

5. 💾 PERSISTENCE
   - Add methods to serialize/deserialize the pipeline configuration
   - Allow saving steps to localStorage and restoring them later
*/
