# Lesson 08 · Browser and DOM

Today I’ll teach you how JavaScript interacts with the browser. We’ll explore the Document Object Model (DOM), learn to manipulate it efficiently, and build a mental model for how the browser renders your changes.

## Objectives
- Understand the DOM tree and how it represents an HTML document.
- Select, traverse, create, and remove DOM elements.
- Understand the critical differences between `textContent`, `innerText`, and `innerHTML`.
- Manage CSS classes and `data-*` attributes.
- Efficiently add multiple elements using a `DocumentFragment`.
- Gain a basic understanding of the browser's Event Loop.

## Lesson Narrative

### 1. The DOM: Your Page as an Object
When the browser loads HTML, it parses it into a tree of nodes called the **D**ocument **O**bject **M**odel. JavaScript can read and manipulate this tree. The `document` object is your entry point.

### 2. Selecting and Traversing Elements

#### Selecting Elements
Use modern methods with CSS selectors. These are powerful and concise.
- `document.querySelector()`: Returns the **first** matching element.
- `document.querySelectorAll()`: Returns a **static NodeList** of all matching elements.

```javascript
// script.js
const mainTitle = document.querySelector("#main-title");
const allCards = document.querySelectorAll(".course-card");

// A NodeList is not an array, but you can loop over it.
allCards.forEach(card => console.log(card));

// To use array methods like .map(), convert it first.
const cardArray = Array.from(allCards);
```

#### Traversing from an Element
Once you have an element, you can navigate from it.
- `.parentElement`: The direct parent node.
- `.children`: An HTMLCollection of child elements.
- `.closest(selector)`: Finds the nearest ancestor that matches the CSS selector.
- `.nextElementSibling`, `.previousElementSibling`: The adjacent siblings.

```javascript
// traversal.js
const card = document.querySelector(".course-card");
const cardContainer = card.parentElement;
const specificSection = card.closest("section.featured");
```

### 3. Modifying the DOM

#### Creating and Removing Elements
```javascript
// create-remove.js
const newCard = document.createElement("article");
newCard.className = "course-card highlight";

// Add it to the end of the body
document.body.appendChild(newCard);

// To remove an element, simply call .remove() on it
// For example, to remove the card after 2 seconds:
setTimeout(() => {
  newCard.remove();
}, 2000);
```

#### Content: `textContent` vs. `innerText` vs. `innerHTML`
- `textContent`: The safest and fastest. It returns all text, including that from hidden elements. When setting, it replaces all children with a single text node.
- `innerText`: Slower. It is "CSS-aware" and will not return text from hidden elements. It also triggers a reflow.
- `innerHTML`: **Potentially dangerous.** It parses and renders the string as HTML. Never use `innerHTML` with user-provided content, as it exposes you to Cross-Site Scripting (XSS) attacks.

```javascript
const banner = document.querySelector("#banner");
banner.textContent = "Welcome, User!"; // SAFE
// banner.innerHTML = "<img src=x onerror=alert('Hacked!')>"; // DANGEROUS
```

#### Efficiently Adding Multiple Elements
Modifying the DOM is expensive. If you add 100 elements one by one, you cause 100 "reflows." To be efficient, build them in memory first using a `DocumentFragment`.

```javascript
// fragments.js
const lessonTitles = ["Basics", "Functions", "DOM" /* ... */];
const list = document.querySelector("#lesson-list");

// Create a fragment to hold our new elements
const fragment = document.createDocumentFragment();

for (const title of lessonTitles) {
  const li = document.createElement("li");
  li.textContent = title;
  fragment.appendChild(li); // Add to the fragment (in memory)
}

// Append the entire fragment to the DOM in one operation
list.appendChild(fragment);
```

### 4. Working with Attributes, Classes, and Styles
- **Classes:** Use the `classList` API (`.add()`, `.remove()`, `.toggle()`).
- **Data Attributes:** Use the `dataset` property for `data-*` attributes.
- **Styles:** Modify `style` for dynamic properties, but prefer CSS classes for static states.

```javascript
// attributes.js
const card = document.querySelector(".course-card");

card.classList.add("is-active");

// For an attribute data-course-id="js101"
card.dataset.courseId = "js101"; // Set
const id = card.dataset.courseId; // Get

card.style.transform = `rotate(5deg)`;
```

### 5. The Browser's Event Loop (A Quick Intro)
The browser can only do one thing at a time on its main thread. The Event Loop is the mechanism that lets it handle asynchronous events without freezing.

1.  **Call Stack:** Where your synchronous JavaScript code is executed line by line.
2.  **Web APIs:** Asynchronous operations (`setTimeout`, `fetch`, DOM events) are handed off to the browser to manage.
3.  **Callback Queue:** When an async operation finishes, its callback function is placed in this queue.
4.  **Event Loop:** Its only job is to ask: "Is the Call Stack empty?" If it is, it takes the first item from the Callback Queue and pushes it onto the stack to be executed.

This is why `setTimeout(fn, 0)` doesn't run immediately—it has to wait for the stack to clear first.

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [DOM Manipulation Crash Course (Traversy Media)](https://www.youtube.com/watch?v=0ik6X4DJKCc)
- [Chrome DevTools Tips (Google Chrome Developers)](https://www.youtube.com/watch?v=H0XScE08hy8)

## References
- MDN: [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- MDN: [Manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- MDN: [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
- YouTube: [What the heck is the event loop anyway? (Philip Roberts)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

## Reflection
- How did using a `DocumentFragment` change your approach to rendering lists?
- What’s a scenario where you’d need to use `.closest()`?
- How would you explain the danger of `innerHTML` to a teammate?

Next, Lesson 09 will deepen our interaction with the browser by handling events.