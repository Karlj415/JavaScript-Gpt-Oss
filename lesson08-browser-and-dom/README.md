# Lesson 08 · Browser and DOM 🌐

> "The DOM is like a live blueprint of your house—JavaScript is the contractor who can renovate it in real-time while you're living in it!"

Welcome to the bridge between JavaScript and the web page! Today you'll learn how JavaScript brings HTML to life. Think of HTML as the skeleton, CSS as the skin and clothes, and JavaScript as the brain that makes everything move and respond.

## 🎯 What You'll Learn

### Core Concepts
- **The DOM Tree** - How browsers turn HTML into objects JavaScript can manipulate
- **Element Selection** - Finding specific parts of your page (like finding a book in a library)
- **DOM Traversal** - Moving between related elements (parent, children, siblings)
- **Content Manipulation** - Safely changing text and HTML content
- **Performance Optimization** - Making changes efficiently without slowing down the page
- **The Event Loop** - How browsers juggle multiple tasks without freezing

### Practical Skills
- Build dynamic interfaces that update without page reloads
- Create, modify, and delete elements on the fly
- Work with CSS classes and data attributes
- Optimize DOM operations for smooth performance
- Debug DOM issues using browser DevTools

## 🌟 Why This Matters

**Real-World Applications:**
- 🛒 **Shopping Carts** - Adding/removing items dynamically
- 📝 **Todo Lists** - Creating, checking off, deleting tasks
- 🎮 **Games** - Moving characters, updating scores
- 💬 **Chat Apps** - Displaying new messages in real-time
- 📊 **Dashboards** - Updating charts and stats without refresh

**Career Impact:**
- Foundation for all frontend frameworks (React, Vue, Angular)
- Essential for web animations and interactions
- Required knowledge for frontend interviews
- Basis for understanding virtual DOM concepts

## 📚 Deep Dive Into Concepts

### 1. The DOM: Your Page as a Living Tree 🌳

**Analogy:** Imagine your HTML page is like a family tree. The `<html>` tag is the great-grandparent, `<body>` and `<head>` are grandparents, and all other elements are children, grandchildren, etc. The DOM lets JavaScript talk to any family member!

```html
<!-- Your HTML -->
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1 id="title">Welcome</h1>
    <div class="container">
      <p>Hello World</p>
    </div>
  </body>
</html>
```

```javascript
// How JavaScript sees it (simplified)
const DOM = {
  document: {
    html: {
      head: {
        title: { text: "My Page" }
      },
      body: {
        h1: { id: "title", text: "Welcome" },
        div: {
          className: "container",
          p: { text: "Hello World" }
        }
      }
    }
  }
};

// The 'document' object is your gateway
console.log(document); // The entire DOM
console.log(document.body); // Just the body element
console.log(document.title); // "My Page"
```

**Key Terms:**
- **Node**: Any single item in the DOM tree (elements, text, comments)
- **Element**: HTML tags that became objects (`<div>`, `<p>`, etc.)
- **Parent/Child**: Relationships between nested elements
- **Siblings**: Elements at the same level with same parent

### 2. Finding Elements: Your DOM Detective Toolkit 🔍

**Analogy:** Selecting DOM elements is like being a detective with different search tools. Sometimes you need to find one specific person (querySelector), sometimes a group (querySelectorAll), and sometimes you need to ask "who's your parent?" (traversal).

#### Modern Selection Methods

```javascript
// dom-selection-complete.js

// 1. querySelector - Find ONE element (first match)
const hero = document.querySelector('.hero'); // By class
const header = document.querySelector('#header'); // By ID
const firstButton = document.querySelector('button'); // By tag
const submitBtn = document.querySelector('button[type="submit"]'); // By attribute
const nestedElement = document.querySelector('nav ul li a'); // Nested

// 2. querySelectorAll - Find ALL matching elements
const allButtons = document.querySelectorAll('button');
const menuItems = document.querySelectorAll('.menu-item');
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

// NodeList vs Array - Important difference!
console.log(allButtons); // NodeList(3) - Not a real array!

// NodeList has forEach
allButtons.forEach(btn => {
    console.log(btn.textContent);
});

// But not map, filter, reduce - Convert to array first!
const buttonTexts = Array.from(allButtons).map(btn => btn.textContent);
const activeButtons = [...allButtons].filter(btn => btn.classList.contains('active'));

// 3. Other selection methods (older but still useful)
const mainDiv = document.getElementById('main'); // Fastest for IDs
const allDivs = document.getElementsByTagName('div'); // Returns live HTMLCollection
const cards = document.getElementsByClassName('card'); // Returns live HTMLCollection

// Live vs Static collections - IMPORTANT!
const staticList = document.querySelectorAll('.item'); // Static - snapshot
const liveList = document.getElementsByClassName('item'); // Live - updates automatically

console.log('Static:', staticList.length); // e.g., 3
console.log('Live:', liveList.length); // e.g., 3

// Add a new item
const newItem = document.createElement('div');
newItem.className = 'item';
document.body.appendChild(newItem);

console.log('Static after add:', staticList.length); // Still 3!
console.log('Live after add:', liveList.length); // Now 4!
```

#### DOM Traversal: Navigating the Family Tree

```javascript
// dom-traversal-mastery.js

// Sample HTML structure for reference:
/*
<article class="post" data-id="123">
  <header>
    <h2>Post Title</h2>
    <span class="author">John Doe</span>
  </header>
  <div class="content">
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <p>Third paragraph</p>
  </div>
  <footer>
    <button class="like">Like</button>
    <button class="share">Share</button>
  </footer>
</article>
*/

const post = document.querySelector('.post');

// GOING UP - Parents and Ancestors
const directParent = post.parentElement; // Direct parent
const directParentNode = post.parentNode; // Same, but includes non-element nodes

// Find specific ancestor
const section = post.closest('section'); // Nearest section ancestor
const body = post.closest('body'); // Goes all the way up if needed
const matchingSelf = post.closest('.post'); // Can match the element itself!

// GOING DOWN - Children and Descendants
const allChildren = post.children; // HTMLCollection of direct children
const firstChild = post.firstElementChild; // First child element
const lastChild = post.lastElementChild; // Last child element

// Find descendants (not just direct children)
const allParagraphs = post.querySelectorAll('p'); // All p tags inside
const likeButton = post.querySelector('.like'); // First .like inside

// GOING SIDEWAYS - Siblings
const content = post.querySelector('.content');
const nextSibling = content.nextElementSibling; // footer
const prevSibling = content.previousElementSibling; // header

// Get all siblings (a bit tricky)
function getAllSiblings(element) {
    const siblings = [];
    let sibling = element.parentElement.firstElementChild;
    
    while (sibling) {
        if (sibling !== element) {
            siblings.push(sibling);
        }
        sibling = sibling.nextElementSibling;
    }
    
    return siblings;
}

const contentSiblings = getAllSiblings(content);
console.log('Siblings of content:', contentSiblings); // [header, footer]

// PRACTICAL EXAMPLE: Navigate from clicked button to post data
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like')) {
        // From button, go up to find the post
        const post = e.target.closest('.post');
        const postId = post.dataset.id;
        const author = post.querySelector('.author').textContent;
        
        console.log(`Liked post ${postId} by ${author}`);
    }
});
```

### 3. Creating and Modifying Elements: Building Your DOM Lego Set 🧱

**Analogy:** Creating DOM elements is like playing with LEGO. You create pieces, customize them, then attach them where you want. You can also take pieces apart or modify them after they're built.

#### Creating Elements from Scratch

```javascript
// dom-creation-complete.js

// 1. Basic Element Creation
const card = document.createElement('div');
card.className = 'user-card';
card.id = 'user-123';

// 2. Building Complex Structures
function createUserCard(user) {
    // Create container
    const card = document.createElement('article');
    card.className = 'user-card';
    card.dataset.userId = user.id; // data-user-id attribute
    
    // Create header
    const header = document.createElement('header');
    
    // Create and add avatar
    const avatar = document.createElement('img');
    avatar.src = user.avatar;
    avatar.alt = `${user.name}'s avatar`;
    avatar.className = 'avatar';
    
    // Create and add name
    const name = document.createElement('h3');
    name.textContent = user.name; // Safe for user content!
    
    // Create bio
    const bio = document.createElement('p');
    bio.textContent = user.bio;
    
    // Create actions
    const actions = document.createElement('div');
    actions.className = 'actions';
    
    const followBtn = document.createElement('button');
    followBtn.textContent = 'Follow';
    followBtn.className = 'btn btn-primary';
    followBtn.onclick = () => handleFollow(user.id);
    
    // Assemble the pieces
    header.appendChild(avatar);
    header.appendChild(name);
    actions.appendChild(followBtn);
    
    card.appendChild(header);
    card.appendChild(bio);
    card.appendChild(actions);
    
    return card;
}

// 3. Adding Elements to the Page
const user = {
    id: 1,
    name: 'Alice Johnson',
    avatar: '/images/alice.jpg',
    bio: 'Web developer who loves JavaScript'
};

const userCard = createUserCard(user);

// Different insertion methods
const container = document.querySelector('#users');

// Add to end
container.appendChild(userCard);

// Add to beginning
container.prepend(userCard);

// Add before/after specific element
const referenceCard = container.querySelector('.user-card');
container.insertBefore(userCard, referenceCard);
referenceCard.after(userCard); // Modern method
referenceCard.before(userCard); // Modern method

// Replace existing element
const oldCard = container.querySelector('#old-card');
oldCard.replaceWith(userCard);

// 4. Cloning Elements (useful for templates)
const template = document.querySelector('#card-template');
const clone = template.cloneNode(true); // true = deep clone (with children)
clone.querySelector('.name').textContent = 'New Name';
container.appendChild(clone);
```

#### Content Methods: The Safety Guide 🛡️

```javascript
// content-methods-safety.js

const element = document.querySelector('.content');

// 1. textContent - SAFEST, FASTEST
// - Gets/sets plain text only
// - Escapes HTML tags (shows them as text)
// - Includes hidden element text
element.textContent = 'Hello <b>World</b>'; 
// Result: "Hello <b>World</b>" (tags visible as text)

const allText = element.textContent; // Gets ALL text, even hidden

// 2. innerText - STYLE-AWARE
// - Respects styling (skips hidden elements)
// - Triggers reflow (slower)
// - Good for getting "visible" text
element.innerText = 'Hello World';

const visibleText = element.innerText; // Only visible text

// Hidden element example
const hidden = document.createElement('span');
hidden.style.display = 'none';
hidden.textContent = 'Secret';
element.appendChild(hidden);

console.log(element.textContent); // Includes "Secret"
console.log(element.innerText);   // Doesn't include "Secret"

// 3. innerHTML - POWERFUL BUT DANGEROUS! ⚠️
// - Parses and renders HTML
// - Can execute scripts (XSS risk)
// - Slower than textContent

// SAFE: Hard-coded HTML
element.innerHTML = '<strong>Bold</strong> and <em>italic</em>';

// DANGEROUS: User input
const userInput = '<img src=x onerror="alert(\'Hacked!\')">';
// element.innerHTML = userInput; // DON'T DO THIS!

// SAFE Alternative: Create elements
const strong = document.createElement('strong');
strong.textContent = userInput; // Safe - treats as text
element.appendChild(strong);

// 4. insertAdjacentHTML - Precise HTML insertion
// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
const list = document.querySelector('ul');

// Add to specific position
list.insertAdjacentHTML('afterbegin', '<li>First Item</li>');
list.insertAdjacentHTML('beforeend', '<li>Last Item</li>');

// Visual guide for positions:
/* 
<!-- beforebegin -->
<ul>
  <!-- afterbegin -->
  <li>Existing Item</li>
  <!-- beforeend -->
</ul>
<!-- afterend -->
*/

// 5. Remove Methods
const itemToRemove = document.querySelector('.remove-me');

// Modern way (best)
itemToRemove.remove();

// Old way (still works)
itemToRemove.parentElement.removeChild(itemToRemove);

// Remove all children
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
// Or simply:
container.innerHTML = ''; // Fast but destroys event listeners
container.textContent = ''; // Also clears, preserves listeners
```

#### Performance: DocumentFragment for Bulk Operations ⚡

**Analogy:** Imagine you're moving furniture into a house. You could carry each piece one at a time (slow), or load everything onto a truck and make one trip (fast). DocumentFragment is your truck!

```javascript
// performance-documentfragment.js

// BAD: Multiple DOM updates (causes reflows)
function addItemsSlow(items) {
    const list = document.querySelector('#list');
    const startTime = performance.now();
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li); // DOM update on EACH iteration!
    });
    
    console.log(`Slow method: ${performance.now() - startTime}ms`);
}

// GOOD: Single DOM update with DocumentFragment
function addItemsFast(items) {
    const list = document.querySelector('#list');
    const startTime = performance.now();
    
    // Create fragment (virtual container)
    const fragment = document.createDocumentFragment();
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li); // Add to fragment (in memory)
    });
    
    // Single DOM update!
    list.appendChild(fragment);
    
    console.log(`Fast method: ${performance.now() - startTime}ms`);
}

// Test with many items
const manyItems = Array.from({length: 1000}, (_, i) => `Item ${i + 1}`);

// Compare performance
addItemsSlow(manyItems); // e.g., 50ms
addItemsFast(manyItems); // e.g., 10ms - 5x faster!

// REAL-WORLD EXAMPLE: Building a table
function createLargeTable(data) {
    const table = document.querySelector('#data-table');
    const tbody = table.querySelector('tbody');
    const fragment = document.createDocumentFragment();
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        
        // Add cells
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        
        fragment.appendChild(tr);
    });
    
    // Clear existing rows and add new ones in one go
    tbody.innerHTML = '';
    tbody.appendChild(fragment);
}

// Alternative: Build HTML string (also fast, but be careful with user data)
function createLargeTableAlt(data) {
    const tbody = document.querySelector('#data-table tbody');
    
    const html = data.map(row => `
        <tr>
            ${Object.values(row).map(value => 
                `<td>${escapeHtml(value)}</td>`
            ).join('')}
        </tr>
    `).join('');
    
    tbody.innerHTML = html; // Single update
}

// Helper to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```

### 4. Attributes, Classes, and Styles: Dressing Up Your Elements 🎨

**Analogy:** Working with element attributes is like managing a person's outfit and accessories. Classes are like complete outfits, inline styles are like individual clothing items, and data attributes are like name tags with information.

```javascript
// attributes-classes-styles-complete.js

// 1. CLASS MANIPULATION with classList API
const element = document.querySelector('.card');

// Add classes
element.classList.add('active');
element.classList.add('highlighted', 'featured'); // Multiple at once

// Remove classes
element.classList.remove('highlighted');

// Toggle (add if missing, remove if present)
element.classList.toggle('expanded'); // Returns true if added, false if removed

// Conditional toggle
const shouldExpand = true;
element.classList.toggle('expanded', shouldExpand); // Force true/false

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');

// Get all classes
console.log(element.classList); // DOMTokenList
console.log(element.className); // String of all classes

// Real-world: Theme switcher
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 2. DATA ATTRIBUTES - Custom data storage
const product = document.querySelector('.product');

// HTML: <div class="product" data-product-id="123" data-price="99.99" data-in-stock="true">

// Reading data attributes
const productId = product.dataset.productId; // "123"
const price = parseFloat(product.dataset.price); // 99.99
const inStock = product.dataset.inStock === 'true'; // boolean

// Setting data attributes
product.dataset.quantity = '5';
product.dataset.lastUpdated = Date.now();

// Camel case conversion
product.dataset.userName = 'Alice'; // Creates data-user-name="Alice"
const name = product.dataset.userName; // Reads data-user-name

// Remove data attribute
delete product.dataset.temporary;

// Real-world: Interactive gallery
function setupGallery() {
    const images = document.querySelectorAll('.gallery-image');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const fullSizeUrl = this.dataset.fullSize;
            const caption = this.dataset.caption;
            showLightbox(fullSizeUrl, caption);
        });
    });
}

// 3. INLINE STYLES - Dynamic styling
const box = document.querySelector('.box');

// Set individual properties
box.style.backgroundColor = 'blue';
box.style.width = '200px';
box.style.transform = 'rotate(45deg)';

// Use camelCase for CSS properties
box.style.borderRadius = '10px'; // border-radius
box.style.fontSize = '16px'; // font-size

// Set multiple styles at once
Object.assign(box.style, {
    position: 'absolute',
    top: '50px',
    left: '100px',
    zIndex: '10'
});

// Or use cssText (replaces all inline styles)
box.style.cssText = 'color: red; font-size: 20px; margin: 10px;';

// Get computed styles (including CSS rules)
const computedStyles = window.getComputedStyle(box);
console.log(computedStyles.width); // e.g., "200px"
console.log(computedStyles.color); // e.g., "rgb(255, 0, 0)"

// Remove inline style
box.style.backgroundColor = ''; // Reverts to CSS rule
box.style.removeProperty('background-color'); // Alternative

// 4. OTHER ATTRIBUTES
const link = document.querySelector('a');
const input = document.querySelector('input');
const img = document.querySelector('img');

// Get/Set standard attributes
link.href = 'https://example.com';
link.target = '_blank';
link.title = 'Visit Example';

input.type = 'email';
input.required = true;
input.placeholder = 'Enter your email';
input.disabled = false;

img.src = '/images/photo.jpg';
img.alt = 'Description of photo';
img.loading = 'lazy'; // Lazy loading

// Generic attribute methods
element.setAttribute('aria-label', 'Close button');
const label = element.getAttribute('aria-label');
element.removeAttribute('aria-label');
const hasLabel = element.hasAttribute('aria-label');

// 5. BEST PRACTICES EXAMPLE
class InteractiveCard {
    constructor(element) {
        this.element = element;
        this.isExpanded = false;
        this.setup();
    }
    
    setup() {
        // Use data attributes for configuration
        this.animationDuration = parseInt(
            this.element.dataset.animationDuration || '300'
        );
        
        // Use classes for states
        this.element.classList.add('interactive-card');
        
        // Bind events
        this.element.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        this.isExpanded = !this.isExpanded;
        
        // Use classes for visual states
        this.element.classList.toggle('expanded', this.isExpanded);
        
        // Use inline styles only for dynamic values
        if (this.isExpanded) {
            const content = this.element.querySelector('.content');
            const height = content.scrollHeight;
            content.style.maxHeight = `${height}px`;
        } else {
            this.element.querySelector('.content').style.maxHeight = '0';
        }
        
        // Update data attribute for state tracking
        this.element.dataset.expanded = this.isExpanded;
    }
}

// Initialize all cards
document.querySelectorAll('[data-component="card"]').forEach(el => {
    new InteractiveCard(el);
});
```

### 5. The Event Loop: JavaScript's Traffic Controller 🚦

**Analogy:** The Event Loop is like a restaurant with one chef (JavaScript engine). Orders (code) come in, the chef handles them one at a time (call stack), but can delegate tasks like baking (setTimeout) to the oven (Web APIs). When the oven beeps (callback ready), it goes to the pickup counter (callback queue) and waits for the chef to be free.

```javascript
// event-loop-visualization.js

console.log('🍳 Chef starts cooking');

// This goes to the oven (Web API)
setTimeout(() => {
    console.log('🍞 Bread is ready (from oven)');
}, 2000);

// This also goes to the oven, but with 0 delay
setTimeout(() => {
    console.log('🧈 Butter melted (quick task)');
}, 0);

// Chef continues with immediate tasks
console.log('🥚 Cracking eggs');
console.log('🥓 Frying bacon');

// Even with 0 delay, setTimeout waits for stack to clear
// Output order:
// 🍳 Chef starts cooking
// 🥚 Cracking eggs
// 🥓 Frying bacon
// 🧈 Butter melted (quick task)
// 🍞 Bread is ready (from oven)

// DETAILED EXAMPLE: Understanding the flow
function demonstrateEventLoop() {
    console.log('1. Start');
    
    // Goes to Web API, then callback queue
    setTimeout(() => {
        console.log('2. Timeout 1');
    }, 0);
    
    // Promise callbacks go to microtask queue (higher priority)
    Promise.resolve().then(() => {
        console.log('3. Promise');
    });
    
    // Another timeout
    setTimeout(() => {
        console.log('4. Timeout 2');
    }, 0);
    
    // Synchronous - runs immediately
    console.log('5. End');
}

demonstrateEventLoop();
// Output:
// 1. Start
// 5. End
// 3. Promise (microtasks run first)
// 2. Timeout 1
// 4. Timeout 2

// PRACTICAL EXAMPLE: Non-blocking UI updates
function processLargeArray(array) {
    const chunkSize = 100;
    let index = 0;
    
    function processChunk() {
        const endIndex = Math.min(index + chunkSize, array.length);
        
        // Process a chunk
        for (let i = index; i < endIndex; i++) {
            // Do work on array[i]
            updateUI(array[i]);
        }
        
        index = endIndex;
        
        // If more to process, yield control back to browser
        if (index < array.length) {
            // Update progress
            updateProgress(index, array.length);
            
            // Schedule next chunk (lets browser handle other events)
            setTimeout(processChunk, 0);
        } else {
            console.log('Processing complete!');
        }
    }
    
    processChunk();
}

// WHY THIS MATTERS: Avoiding UI freezing
button.addEventListener('click', () => {
    // BAD: Blocks everything
    // for (let i = 0; i < 1000000; i++) {
    //     doSomething();
    // }
    
    // GOOD: Breaks work into chunks
    processLargeArray(bigArray);
});

// VISUAL REPRESENTATION
/*
┌─────────────┐
│  Call Stack │ ← Currently executing
├─────────────┤
│ console.log │
└─────────────┘
      ↑
┌─────────────┐
│ Event Loop  │ ← Checks if stack is empty
└─────────────┘
      ↑
┌─────────────────────────┐
│   Callback Queue        │ ← Waiting callbacks
├─────────────────────────┤
│ setTimeout callback     │
│ click event handler     │
└─────────────────────────┘
      ↑
┌─────────────────────────┐
│   Web APIs              │ ← Browser handles these
├─────────────────────────┤
│ Timer (2000ms)          │
│ DOM Events              │
│ fetch() requests        │
└─────────────────────────┘
*/
```

## 🛠️ Debugging DOM Issues

```javascript
// dom-debugging-tips.js

// 1. Check if element exists before using it
const element = document.querySelector('.maybe-exists');
if (element) {
    element.textContent = 'Found it!';
} else {
    console.warn('Element .maybe-exists not found');
}

// 2. Use console methods effectively
const elements = document.querySelectorAll('.item');
console.table(Array.from(elements).map(el => ({
    text: el.textContent,
    classes: el.className,
    id: el.id
})));

// 3. Visualize element in DevTools
console.log(element); // Shows element in console
console.dir(element); // Shows element as object with properties

// 4. Monitor element changes
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        console.log('DOM changed:', mutation);
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

// 5. Performance monitoring
console.time('DOM Operation');
// ... your DOM manipulation code ...
console.timeEnd('DOM Operation');
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [DOM Manipulation Crash Course (Traversy Media)](https://www.youtube.com/watch?v=0ik6X4DJKCc)
- [Chrome DevTools Tips (Google Chrome Developers)](https://www.youtube.com/watch?v=H0XScE08hy8)
- [What the heck is the event loop anyway? (Philip Roberts)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

## References
- MDN: [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- MDN: [Manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- MDN: [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
- MDN: [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Reflection
- How did using a `DocumentFragment` change your approach to rendering lists?
- What's a scenario where you'd need to use `.closest()`?
- How would you explain the danger of `innerHTML` to a teammate?
- When would you choose `textContent` over `innerHTML`?
- How does understanding the Event Loop help you write better code?

Next, Lesson 09 will deepen our interaction with the browser by handling events.
