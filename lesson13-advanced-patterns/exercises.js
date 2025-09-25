/*
## Practice Drills
1. Implement a function composition utility and use it to build a text-processing pipeline (trim, lowercase, replace spaces with hyphens).
2. Create a simple EventEmitter class implementing the Observer pattern from scratch.
3. Build a factory that returns different storage adapters (`localStorage`, in-memory) sharing the same API (`getItem`, `setItem`).
*/

/*
## Project: Analytics Pipeline Library

**Objective:** Develop `analytics-pipeline.js`, a library for processing analytics events, combining multiple advanced patterns.

**Instructions:**
1.  **`createPipeline()` Factory:**
    -   Export a factory function `createPipeline()`.
    -   This function should encapsulate all the state and logic within a closure.

2.  **State and Processing Steps:**
    -   Inside the factory, maintain a private array of processing functions (the "steps").

3.  **Observer Pattern for Events:**
    -   Implement a simple observer system (`subscribe`, `notify`) within the closure.
    -   It should allow listeners to subscribe to events like `"stepAdded"` or `"eventProcessed"`.

4.  **Generator for Event IDs:**
    -   Use a generator function to produce a unique, incrementing ID for every event that passes through the pipeline.

5.  **Proxy for Logging:**
    -   The object returned by `createPipeline` should be wrapped in a `Proxy`.
    -   The proxy's `set` handler should intercept attempts to add new methods (e.g., `pipeline.addStep = ...`) and log a warning.
    -   The proxy's `get` handler can log when methods like `addStep` or `process` are accessed.

6.  **Public API:**
    -   `addStep(fn)`: A method to add a new function to the processing pipeline. It should notify observers.
    -   `process(event)`: This method takes an event object. It assigns it a unique ID from the generator, runs it through all the functions in the pipeline (using composition), and notifies observers with the final, processed event.
    -   `subscribe(eventName, callback)`: The method for the observer pattern.
*/

// --- Starter Code for the Project ---

export function createPipeline() {
  // --- Private State ---
  let steps = [];
  const observers = new Map();

  // TODO: 2. Implement a generator function for unique IDs.
  function* createEventIdGenerator() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }
  const eventIdGenerator = createEventIdGenerator();

  // --- Private Methods ---
  // TODO: 3. Implement a `notify` function for the observer pattern.
  function notify(eventName, data) {
    if (observers.has(eventName)) {
      observers.get(eventName).forEach(callback => callback(data));
    }
  }

  // --- Public API ---
  const pipeline = {
    addStep(fn) {
      // TODO: Add the function to the `steps` array.
      // TODO: Notify observers that a step was added.
      steps.push(fn);
      notify('stepAdded', fn);
    },

    process(event) {
      // TODO: 4. Use the generator to get a unique ID.
      const eventWithId = { ...event, id: eventIdGenerator.next().value };

      // TODO: 5. Use reduce (composition) to run the event through all steps.
      const processedEvent = steps.reduce((acc, fn) => fn(acc), eventWithId);

      // TODO: 6. Notify observers that the event was processed.
      notify('eventProcessed', processedEvent);
      return processedEvent;
    },

    subscribe(eventName, callback) {
      // TODO: 3. Implement the subscribe logic.
      if (!observers.has(eventName)) {
        observers.set(eventName, []);
      }
      observers.get(eventName).push(callback);
    },
  };

  // TODO: 1. Wrap the public API in a Proxy for logging.
  const proxy = new Proxy(pipeline, {
    get(target, prop) {
      console.log(`[Proxy] Accessing method: ${prop}`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      console.warn(`[Proxy] Modifying the pipeline API is not allowed.`);
      return false;
    }
  });

  return proxy;
}

// --- Example Usage ---
/*
const myPipeline = createPipeline();

myPipeline.subscribe('stepAdded', (fn) => {
  console.log(`Observer: A new step was added: ${fn.name}`);
});

myPipeline.subscribe('eventProcessed', (event) => {
  console.log(`Observer: Event processed ->`, event);
});

const addTimestamp = (event) => ({ ...event, timestamp: new Date() });
const enrichWithUserData = (event) => ({ ...event, user: { id: 'user-123' } });

myPipeline.addStep(addTimestamp);
myPipeline.addStep(enrichWithUserData);

myPipeline.process({ type: 'click', target: '#buy-button' });
myPipeline.process({ type: 'login', user: 'test@example.com' });
*/
