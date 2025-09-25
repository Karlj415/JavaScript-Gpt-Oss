# Lesson 09 · Events and Forms

Today I’ll teach you how to make web pages respond to users. We’ll wire up event listeners, manage forms, explore the event lifecycle, and learn performance patterns for building resilient, accessible interactivity.

## Objectives
- Attach and remove event listeners to prevent memory leaks.
- Understand the event propagation phases (capturing and bubbling) and how to control them.
- Use event delegation for better performance and scalability.
- Validate and submit forms, providing accessible user feedback.
- Recognize when to use throttling and debouncing for performance.

## Lesson Narrative

### 1. Listening for Events

#### Adding and Removing Listeners
The modern standard is `addEventListener`. To prevent memory leaks, always clean up a listener when it's no longer needed by using `removeEventListener`. **This requires a named function.**

```javascript
// listeners.js
const button = document.querySelector("#action-button");

// 1. Define a named function for the handler
function handleAction() {
  console.log("Action executed!");
  // 3. Once the action is done, clean up the listener
  button.removeEventListener("click", handleAction);
  console.log("Listener removed.");
}

// 2. Add the listener
button.addEventListener("click", handleAction);

// You CANNOT remove an anonymous function like this:
// button.addEventListener('click', () => console.log('hi'));
```

#### The Event Object
Every listener receives an `event` object with valuable information. Key properties include:
- `event.target`: The element that originally triggered the event.
- `event.currentTarget`: The element the listener is attached to.
- `event.preventDefault()`: Stops the browser's default behavior (e.g., a form submitting and reloading the page).
- `event.stopPropagation()`: Stops the event from moving to the next phase (e.g., stops bubbling).

### 2. Event Propagation: Capture and Bubble
When an event occurs, it travels through the DOM in two phases:
1.  **Capture Phase:** Travels from the `window` down to the `event.target`.
2.  **Bubble Phase:** Travels from the `event.target` back up to the `window`.

By default, listeners are attached to the **bubble** phase. You can attach to the capture phase by passing a third argument.

```javascript
// propagation.js
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

// Listen during the CAPTURE phase
parent.addEventListener('click', () => console.log('Parent (Capture)'), { capture: true });

// Listen during the BUBBLE phase (default)
parent.addEventListener('click', () => console.log('Parent (Bubble)'));
child.addEventListener('click', () => console.log('Child (Bubble)'));

// Clicking the child will log: Parent (Capture) -> Child (Bubble) -> Parent (Bubble)
```

### 3. A Catalog of Common Events
- **Mouse:** `click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mouseout`, `mousemove`
- **Keyboard:** `keydown`, `keyup`
- **Form:** `submit`, `input` (fires on any value change), `change` (fires when element loses focus), `focus`, `blur`
- **Document:** `DOMContentLoaded` (HTML parsed), `load` (all resources loaded)

### 4. Event Delegation: The Smartest Pattern
Instead of adding many listeners to child elements, add a single listener to a common parent. This is more performant and works automatically for dynamically added elements.

```javascript
// delegation.js
const list = document.querySelector(".lesson-list");

list.addEventListener("click", event => {
  // Use .closest() to find the button that was clicked, even if an inner element was the target
  const button = event.target.closest("button[data-lesson-id]");

  if (button) {
    console.log(`Opening lesson ${button.dataset.lessonId}`);
  }
});
```

### 5. Form Handling

#### Using `FormData`
This is the modern, easy way to get all form values.
```javascript
// form-handling.js
const form = document.querySelector("#signup-form");

form.addEventListener("submit", event => {
  event.preventDefault(); // Stop the page from reloading

  const formData = new FormData(form);
  const email = formData.get("email");

  if (!email.includes("@")) {
    // Provide user feedback
    console.error("Invalid email!");
    return;
  }
  console.log("Form submitted successfully with email:", email);
});
```

#### Manual Data Collection
Sometimes you need more control.
```javascript
const data = {};
for (const element of form.elements) {
  if (element.name) {
    data[element.name] = element.value;
  }
}
console.log("Manual data:", data);
```

### 6. Performance: Throttling and Debouncing
For frequent events like `scroll`, `resize`, or `mousemove`, you must control how often your handler runs.

- **Throttling:** Guarantees execution at a regular interval. (e.g., "Run this function at most once every 200ms"). Use for continuous actions like tracking scroll position.
- **Debouncing:** Resets a timer on every event. The function only runs after a period of inactivity. (e.g., "Run this function only after the user has stopped typing for 300ms"). Use for discrete actions like API calls from a search bar.

```javascript
// conceptual debounce
let timeoutId;
document.querySelector('#search').addEventListener('input', (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        console.log(`Searching for: ${event.target.value}`);
    }, 300);
});
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [JavaScript Event Loop & Events (Philip Roberts)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Designing Accessible Forms for Everyone (Aquent Gymnasium)](https://www.youtube.com/watch?v=72nrJJAf_Ak)

## References
- MDN: [Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- MDN: [Event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
- CSS-Tricks: [The Difference Between Throttling and Debouncing](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)

## Reflection
- When would you need to use `{ capture: true }`?
- Explain why you need a named function to use `removeEventListener`.
- Would you use throttling or debouncing for a "drag" event? Why?

Next, Lesson 10 unlocks asynchronous JavaScript so you can handle timers, promises, and data fetching.