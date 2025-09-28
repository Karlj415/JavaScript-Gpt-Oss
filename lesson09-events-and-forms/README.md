# Lesson 09 · Events and Forms 🖱️

> "Events are like conversations between your webpage and your users—JavaScript helps translate what users do into what the page should respond with."

Welcome to the world of interactive web development! Today you'll learn how to make your pages come alive by responding to user actions. Think of events as the nervous system of your webpage—every click, keystroke, and mouse movement sends signals that JavaScript can intercept and respond to.

## 🎯 What You'll Learn

### Core Concepts
- **Event Listeners** - How to "listen" for user actions (clicks, typing, scrolling)
- **Event Propagation** - How events travel through the DOM tree
- **Event Delegation** - One listener to rule them all (performance optimization)
- **Form Handling** - Collecting and validating user input safely
- **Performance Patterns** - Throttling and debouncing for smooth interactions
- **Accessibility** - Making interactions work for everyone

### Practical Skills
- Build responsive, interactive user interfaces
- Create smooth, performant interactions
- Handle forms with real-time validation
- Implement keyboard shortcuts and accessibility features
- Debug event-related issues

## 🌟 Why This Matters

**Real-World Applications:**
- 🛒 **E-commerce** - Add to cart, product filters, checkout flows
- 📝 **Forms** - Contact forms, surveys, user registration
- 🎮 **Games** - Keyboard controls, mouse interactions, touch gestures
- 📱 **Mobile Apps** - Touch events, swipe gestures, responsive interactions
- ⚙️ **Admin Dashboards** - Drag & drop, inline editing, bulk actions

**Career Impact:**
- Foundation for all interactive web applications
- Essential for modern frontend frameworks (React, Vue, Angular)
- Required for mobile-first, accessible development
- Key skill for UX/UI implementation

## 📚 Deep Dive Into Concepts

### 1. Event Listeners: Your Page's Ears 👂

**Analogy:** Event listeners are like having a personal assistant who pays attention to everything happening around you and reports back. "The user clicked this button," "Someone typed in that input," "The page finished loading."

#### Adding and Removing Listeners

```javascript
// event-listeners-complete.js

// BASIC EVENT LISTENING
const button = document.querySelector('#my-button');
const output = document.querySelector('#output');

// Method 1: addEventListener (RECOMMENDED)
function handleButtonClick(event) {
    output.textContent = `Button clicked at ${new Date().toLocaleTimeString()}`;
    console.log('Event details:', event);
}

button.addEventListener('click', handleButtonClick);

// Method 2: Property assignment (older, limited)
button.onclick = handleButtonClick; // Can only have ONE handler

// Method 3: Inline HTML (AVOID)
// <button onclick="handleButtonClick()">Click</button>

// REMOVING EVENT LISTENERS (prevents memory leaks)
function oneTimeHandler() {
    console.log('This will only run once!');
    // Remove itself after running
    button.removeEventListener('click', oneTimeHandler);
}

button.addEventListener('click', oneTimeHandler);

// IMPORTANT: You need the SAME function reference to remove!
// This WON'T work:
// button.addEventListener('click', () => console.log('hi'));
// button.removeEventListener('click', () => console.log('hi')); // Different function!

// REAL-WORLD EXAMPLE: Modal management
class Modal {
    constructor(element) {
        this.element = element;
        this.closeBtn = element.querySelector('.close-btn');
        this.overlay = element.querySelector('.overlay');
        
        // Bind methods to preserve 'this'
        this.handleClose = this.handleClose.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
    }
    
    show() {
        this.element.classList.add('active');
        
        // Add multiple ways to close
        this.closeBtn.addEventListener('click', this.handleClose);
        this.overlay.addEventListener('click', this.handleOverlayClick);
        document.addEventListener('keydown', this.handleEscapeKey);
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
    
    hide() {
        this.element.classList.remove('active');
        
        // CRITICAL: Remove listeners to prevent memory leaks
        this.closeBtn.removeEventListener('click', this.handleClose);
        this.overlay.removeEventListener('click', this.handleOverlayClick);
        document.removeEventListener('keydown', this.handleEscapeKey);
        
        // Restore scrolling
        document.body.style.overflow = '';
    }
    
    handleClose() {
        this.hide();
    }
    
    handleEscapeKey(event) {
        if (event.key === 'Escape') {
            this.hide();
        }
    }
    
    handleOverlayClick(event) {
        if (event.target === this.overlay) {
            this.hide();
        }
    }
}
```

#### The Event Object: Your Information Goldmine 💰

```javascript
// event-object-deep-dive.js

// Every event handler receives an event object
function exploreEventObject(event) {
    console.log('Event Type:', event.type); // 'click', 'keydown', etc.
    console.log('Target Element:', event.target); // What was clicked
    console.log('Current Target:', event.currentTarget); // What the listener is on
    console.log('Timestamp:', event.timeStamp);
    console.log('Mouse Position:', event.clientX, event.clientY);
    
    // Prevent default browser behavior
    // event.preventDefault(); // Stop form submission, link navigation, etc.
    
    // Stop event propagation
    // event.stopPropagation(); // Stop bubbling up to parent elements
}

// MOUSE EVENTS - Rich information
document.addEventListener('click', (event) => {
    console.log('Click details:', {
        x: event.clientX, // Mouse X relative to viewport
        y: event.clientY, // Mouse Y relative to viewport
        pageX: event.pageX, // X relative to document
        pageY: event.pageY, // Y relative to document
        button: event.button, // 0=left, 1=middle, 2=right
        ctrlKey: event.ctrlKey, // Was Ctrl held?
        shiftKey: event.shiftKey, // Was Shift held?
        altKey: event.altKey // Was Alt held?
    });
});

// KEYBOARD EVENTS - Key information
document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', {
        key: event.key, // 'a', 'Enter', 'ArrowUp'
        code: event.code, // 'KeyA', 'Enter', 'ArrowUp'
        keyCode: event.keyCode, // Deprecated but still used
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey // Cmd on Mac, Windows key on PC
    });
    
    // Common keyboard shortcuts
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Stop browser save dialog
        console.log('Custom save triggered!');
    }
    
    if (event.key === 'Escape') {
        console.log('User wants to cancel/close something');
    }
});

// FORM EVENTS - Input tracking
const input = document.querySelector('#username');

input.addEventListener('input', (event) => {
    console.log('User is typing:', event.target.value);
    console.log('Input type:', event.inputType); // 'insertText', 'deleteContentBackward'
});

input.addEventListener('change', (event) => {
    console.log('Input lost focus, final value:', event.target.value);
});

input.addEventListener('focus', () => {
    console.log('Input gained focus');
});

input.addEventListener('blur', () => {
    console.log('Input lost focus');
});
```

### 2. Event Propagation: The Journey of an Event 🏃‍♂️

**Analogy:** Imagine a stone thrown into a pond. First, it travels down through the water layers to the bottom (capture phase), then the ripples travel back up to the surface (bubble phase). That's exactly how events move through the DOM tree!

```javascript
// event-propagation-complete.js

// HTML Structure we're working with:
/*
<div id="grandparent" class="box">
  <div id="parent" class="box">
    <div id="child" class="box">
      <button id="target">Click Me!</button>
    </div>
  </div>
</div>
*/

const grandparent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');
const target = document.querySelector('#target');

// PHASE 1: CAPTURE (top-down)
// Events travel FROM window TO target
grandparent.addEventListener('click', () => {
    console.log('1. Grandparent (CAPTURE)');
}, { capture: true });

parent.addEventListener('click', () => {
    console.log('2. Parent (CAPTURE)');
}, { capture: true });

child.addEventListener('click', () => {
    console.log('3. Child (CAPTURE)');
}, { capture: true });

// PHASE 2: TARGET
// Event reaches the actual element that was clicked
target.addEventListener('click', (event) => {
    console.log('4. TARGET: Button clicked!');
    console.log('   target === currentTarget:', event.target === event.currentTarget);
});

// PHASE 3: BUBBLE (bottom-up) - DEFAULT BEHAVIOR
// Events travel FROM target BACK TO window
child.addEventListener('click', () => {
    console.log('5. Child (BUBBLE)');
}); // No { capture: true }, so defaults to bubble

parent.addEventListener('click', () => {
    console.log('6. Parent (BUBBLE)');
});

grandparent.addEventListener('click', () => {
    console.log('7. Grandparent (BUBBLE)');
});

// CONTROLLING PROPAGATION
const stopButton = document.querySelector('#stop-propagation');
stopButton.addEventListener('click', (event) => {
    console.log('Stop button clicked!');
    event.stopPropagation(); // Stops the event from continuing
    // Neither capture nor bubble phases will continue
});

// REAL-WORLD EXAMPLE: Dropdown menu
class Dropdown {
    constructor(element) {
        this.element = element;
        this.trigger = element.querySelector('.dropdown-trigger');
        this.menu = element.querySelector('.dropdown-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Open/close on trigger click
        this.trigger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing
            this.toggle();
        });
        
        // Prevent menu clicks from closing dropdown
        this.menu.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        
        // Close when clicking outside (document level)
        document.addEventListener('click', () => {
            if (this.isOpen) {
                this.close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.element.classList.add('open');
        this.isOpen = true;
    }
    
    close() {
        this.element.classList.remove('open');
        this.isOpen = false;
    }
}

// EVENT TARGET vs CURRENT TARGET - Important distinction!
document.querySelector('.card').addEventListener('click', (event) => {
    console.log('target:', event.target); // What was actually clicked
    console.log('currentTarget:', event.currentTarget); // What the listener is on
    
    // If you click on a span inside the card:
    // target = span element
    // currentTarget = card element
});
```

### 3. Event Types: The Complete Catalog 📋

**Analogy:** Events are like different types of notifications on your phone. Some are immediate (click), some happen continuously (mousemove), and some mark important milestones (page loaded).

```javascript
// event-types-comprehensive.js

// MOUSE EVENTS - User pointer interactions
const button = document.querySelector('#interactive-button');

button.addEventListener('click', () => console.log('👆 Clicked!'));
button.addEventListener('dblclick', () => console.log('👆👆 Double-clicked!'));
button.addEventListener('mousedown', () => console.log('⬇️ Mouse pressed'));
button.addEventListener('mouseup', () => console.log('⬆️ Mouse released'));
button.addEventListener('mouseenter', () => console.log('➡️ Mouse entered'));
button.addEventListener('mouseleave', () => console.log('⬅️ Mouse left'));
button.addEventListener('mouseover', () => console.log('🎨 Mouse over (bubbles)'));
button.addEventListener('mouseout', () => console.log('🎨 Mouse out (bubbles)'));
button.addEventListener('mousemove', (e) => {
    console.log(`📍 Mouse at ${e.clientX}, ${e.clientY}`);
});
button.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent right-click menu
    console.log('📜 Right-click detected!');
});

// KEYBOARD EVENTS - Key interactions
const input = document.querySelector('#text-input');

input.addEventListener('keydown', (e) => {
    console.log(`⬇️ Key down: ${e.key}`);
    
    // Special key combinations
    if (e.ctrlKey && e.key === 'a') {
        console.log('Select All shortcut!');
    }
    
    if (e.key === 'Enter') {
        console.log('Enter key pressed!');
    }
    
    if (e.key === 'Tab') {
        console.log('Tab navigation');
    }
});

input.addEventListener('keyup', (e) => {
    console.log(`⬆️ Key up: ${e.key}`);
});

input.addEventListener('keypress', (e) => {
    // Deprecated, but still sometimes used
    console.log(`⌨️ Key press: ${e.key}`);
});

// FORM EVENTS - Input and form interactions
const form = document.querySelector('#sample-form');
const emailInput = document.querySelector('#email');
const selectElement = document.querySelector('#country');

// Input events fire on every character change
emailInput.addEventListener('input', (e) => {
    console.log(`✏️ Input value: ${e.target.value}`);
});

// Change events fire when element loses focus AND value has changed
emailInput.addEventListener('change', (e) => {
    console.log(`✅ Changed to: ${e.target.value}`);
});

// Focus and blur for UX feedback
emailInput.addEventListener('focus', () => {
    console.log('🎯 Email input focused');
    emailInput.style.borderColor = '#007bff';
});

emailInput.addEventListener('blur', () => {
    console.log('🎯 Email input blurred');
    emailInput.style.borderColor = '';
});

// Select-specific events
selectElement.addEventListener('change', (e) => {
    console.log(`🎭 Selected: ${e.target.value}`);
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('📤 Form submitted!');
    
    const formData = new FormData(form);
    console.log('Form data:', Object.fromEntries(formData));
});

// DOCUMENT/WINDOW EVENTS - Page lifecycle
window.addEventListener('load', () => {
    console.log('🎉 Page fully loaded (images, CSS, JS)');
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 DOM ready (HTML parsed)');
});

window.addEventListener('resize', () => {
    console.log(`📄 Window resized: ${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener('scroll', () => {
    console.log(`📋 Scrolled to: ${window.scrollY}`);
});

// VISIBILITY EVENTS - Page tab switching
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('😴 Page hidden (user switched tabs)');
    } else {
        console.log('😁 Page visible (user came back)');
    }
});

// TOUCH EVENTS - Mobile interactions
const touchArea = document.querySelector('#touch-area');

touchArea.addEventListener('touchstart', (e) => {
    console.log(`👆 Touch started: ${e.touches.length} fingers`);
});

touchArea.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling
    console.log('👆 Touch moving');
});

touchArea.addEventListener('touchend', () => {
    console.log('👆 Touch ended');
});

// DRAG AND DROP EVENTS
const draggableItem = document.querySelector('#draggable');
const dropZone = document.querySelector('#drop-zone');

draggableItem.addEventListener('dragstart', (e) => {
    console.log('🏃 Drag started');
    e.dataTransfer.setData('text/plain', e.target.id);
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow drop
    console.log('🎨 Dragging over drop zone');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    console.log(`🎯 Dropped: ${draggedId}`);
});

// CUSTOM EVENTS - Create your own!
const customButton = document.querySelector('#custom-event-btn');

customButton.addEventListener('click', () => {
    // Dispatch custom event
    const customEvent = new CustomEvent('userAction', {
        detail: {
            timestamp: Date.now(),
            action: 'button_clicked'
        },
        bubbles: true
    });
    
    customButton.dispatchEvent(customEvent);
});

// Listen for custom event
document.addEventListener('userAction', (e) => {
    console.log('✨ Custom event received:', e.detail);
});
```

### 4. Event Delegation: One Listener to Rule Them All 👑

**Analogy:** Event delegation is like having one security guard at the entrance of a building instead of posting a guard at every single room. The entrance guard checks who's coming and going, and directs them appropriately.

```javascript
// event-delegation-mastery.js

// PROBLEM: Adding listeners to many elements (inefficient)
// BAD APPROACH:
const buttons = document.querySelectorAll('.product-btn');
buttons.forEach(button => {
    button.addEventListener('click', handleProductClick); // Many listeners!
});
// What happens when we add new products dynamically? They won't have listeners!

// SOLUTION: Event Delegation (efficient)
// GOOD APPROACH:
const productContainer = document.querySelector('.product-container');

productContainer.addEventListener('click', (event) => {
    // Check if the clicked element (or its parent) matches what we want
    const productBtn = event.target.closest('.product-btn');
    
    if (productBtn) {
        const productId = productBtn.dataset.productId;
        console.log(`Product ${productId} clicked!`);
        
        // Handle different button types within products
        if (productBtn.classList.contains('add-to-cart')) {
            addToCart(productId);
        } else if (productBtn.classList.contains('quick-view')) {
            showQuickView(productId);
        } else if (productBtn.classList.contains('favorite')) {
            toggleFavorite(productId);
        }
    }
});

// REAL-WORLD EXAMPLE: Dynamic Todo List
class TodoList {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.todos = [];
        this.nextId = 1;
        
        this.init();
    }
    
    init() {
        // ONE event listener handles ALL todo interactions
        this.container.addEventListener('click', (event) => {
            const todoItem = event.target.closest('.todo-item');
            if (!todoItem) return;
            
            const todoId = parseInt(todoItem.dataset.todoId);
            
            // Handle different button clicks
            if (event.target.matches('.complete-btn')) {
                this.toggleComplete(todoId);
            } else if (event.target.matches('.edit-btn')) {
                this.editTodo(todoId);
            } else if (event.target.matches('.delete-btn')) {
                this.deleteTodo(todoId);
            } else if (event.target.matches('.save-btn')) {
                this.saveTodo(todoId);
            } else if (event.target.matches('.cancel-btn')) {
                this.cancelEdit(todoId);
            }
        });
        
        // Handle Enter key in edit mode
        this.container.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const saveBtn = event.target.parentElement.querySelector('.save-btn');
                if (saveBtn) {
                    saveBtn.click();
                }
            }
            
            if (event.key === 'Escape') {
                const cancelBtn = event.target.parentElement.querySelector('.cancel-btn');
                if (cancelBtn) {
                    cancelBtn.click();
                }
            }
        });
    }
    
    addTodo(text) {
        const todo = {
            id: this.nextId++,
            text: text,
            completed: false,
            editing: false
        };
        
        this.todos.push(todo);
        this.render();
    }
    
    toggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }
    
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.editing = true;
            this.render();
            
            // Focus the edit input
            const editInput = this.container.querySelector(`[data-todo-id="${id}"] .edit-input`);
            editInput.focus();
            editInput.select();
        }
    }
    
    saveTodo(id) {
        const todoItem = this.container.querySelector(`[data-todo-id="${id}"]`);
        const editInput = todoItem.querySelector('.edit-input');
        const newText = editInput.value.trim();
        
        if (newText) {
            const todo = this.todos.find(t => t.id === id);
            todo.text = newText;
            todo.editing = false;
            this.render();
        }
    }
    
    cancelEdit(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.editing = false;
            this.render();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
    }
    
    render() {
        const html = this.todos.map(todo => {
            if (todo.editing) {
                return `
                    <div class="todo-item editing" data-todo-id="${todo.id}">
                        <input type="text" class="edit-input" value="${todo.text}">
                        <button class="save-btn">Save</button>
                        <button class="cancel-btn">Cancel</button>
                    </div>
                `;
            } else {
                return `
                    <div class="todo-item ${todo.completed ? 'completed' : ''}" data-todo-id="${todo.id}">
                        <span class="todo-text">${todo.text}</span>
                        <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
            }
        }).join('');
        
        this.container.innerHTML = html;
    }
}

// ADVANCED DELEGATION: Table interactions
const dataTable = document.querySelector('#data-table');

dataTable.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if (!row) return;
    
    const userId = row.dataset.userId;
    
    // Handle different column clicks
    if (event.target.matches('.edit-user')) {
        editUser(userId);
    } else if (event.target.matches('.delete-user')) {
        if (confirm('Delete this user?')) {
            deleteUser(userId);
        }
    } else if (event.target.matches('.toggle-status')) {
        toggleUserStatus(userId);
    } else if (event.target.matches('td:not(.actions)')) {
        // Click on any cell except actions - show user details
        showUserDetails(userId);
    }
});

// Benefits of Event Delegation:
// 1. Performance - Fewer event listeners
// 2. Memory efficiency - Less memory usage
// 3. Dynamic content - Works with new elements automatically
// 4. Easier cleanup - Remove one listener vs many
```

### 5. Form Handling: Collecting User Data Like a Pro 📝

**Analogy:** Form handling is like being a careful waiter taking an order. You need to listen carefully, write down what the customer wants, double-check for mistakes, and deliver exactly what was requested.

```javascript
// form-handling-complete.js

// MODERN FORM HANDLING WITH FormData
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.errors = {};
        this.init();
    }
    
    init() {
        // Handle form submission
        this.form.addEventListener('submit', (event) => {
            event.preventDefault(); // Always prevent default submission
            this.handleSubmit();
        });
        
        // Real-time validation on input
        this.form.addEventListener('input', (event) => {
            if (event.target.matches('input, textarea, select')) {
                this.validateField(event.target);
            }
        });
        
        // Validation on blur (when user leaves field)
        this.form.addEventListener('blur', (event) => {
            if (event.target.matches('input, textarea, select')) {
                this.validateField(event.target);
            }
        }, true); // Use capture phase for blur events
    }
    
    async handleSubmit() {
        // Clear previous errors
        this.clearErrors();
        
        // Get form data the modern way
        const formData = new FormData(this.form);
        
        // Validate all fields
        const isValid = this.validateAll();
        
        if (!isValid) {
            this.displayErrors();
            this.focusFirstError();
            return;
        }
        
        // Show loading state
        this.setSubmitting(true);
        
        try {
            // Convert FormData to regular object if needed
            const data = Object.fromEntries(formData);
            
            // Add any additional data
            data.timestamp = new Date().toISOString();
            data.userAgent = navigator.userAgent;
            
            // Submit to server
            const response = await this.submitData(data);
            
            if (response.ok) {
                this.handleSuccess();
            } else {
                this.handleServerError(await response.json());
            }
        } catch (error) {
            this.handleNetworkError(error);
        } finally {
            this.setSubmitting(false);
        }
    }
    
    validateField(field) {
        const { name, value, type } = field;
        const rules = this.getValidationRules(name);
        const errors = [];
        
        // Required validation
        if (rules.required && !value.trim()) {
            errors.push(`${this.getFieldLabel(name)} is required`);
        }
        
        // Type-specific validation
        if (value.trim() && type === 'email') {
            if (!this.isValidEmail(value)) {
                errors.push('Please enter a valid email address');
            }
        }
        
        if (value.trim() && type === 'tel') {
            if (!this.isValidPhone(value)) {
                errors.push('Please enter a valid phone number');
            }
        }
        
        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            errors.push(`Must be at least ${rules.minLength} characters`);
        }
        
        if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`Must be no more than ${rules.maxLength} characters`);
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(rules.patternMessage || 'Invalid format');
        }
        
        // Password confirmation
        if (name === 'confirmPassword') {
            const password = this.form.querySelector('[name="password"]').value;
            if (value !== password) {
                errors.push('Passwords do not match');
            }
        }
        
        // Update error state
        if (errors.length > 0) {
            this.errors[name] = errors;
            this.showFieldError(field, errors[0]);
        } else {
            delete this.errors[name];
            this.clearFieldError(field);
        }
        
        return errors.length === 0;
    }
    
    getValidationRules(fieldName) {
        const rules = {
            email: { required: true },
            password: { required: true, minLength: 8 },
            confirmPassword: { required: true },
            firstName: { required: true, maxLength: 50 },
            lastName: { required: true, maxLength: 50 },
            phone: { 
                required: true,
                pattern: /^[\d\s\(\)\+\-\.]+$/,
                patternMessage: 'Please enter a valid phone number'
            }
        };
        
        return rules[fieldName] || {};
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.setAttribute('aria-live', 'polite');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.setAttribute('aria-describedby', errorElement.id || 'error-' + field.name);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    async submitData(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ok: true, json: () => ({ success: true }) });
            }, 1000);
        });
    }
    
    handleSuccess() {
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Form submitted successfully!';
        successDiv.setAttribute('role', 'alert');
        
        this.form.parentNode.insertBefore(successDiv, this.form);
        
        // Reset form
        this.form.reset();
        this.clearErrors();
        
        // Remove success message after 5 seconds
        setTimeout(() => successDiv.remove(), 5000);
    }
    
    setSubmitting(isSubmitting) {
        const submitBtn = this.form.querySelector('[type="submit"]');
        if (isSubmitting) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    }
    
    validateAll() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    clearErrors() {
        this.errors = {};
        this.form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        this.form.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
    }
    
    focusFirstError() {
        const firstErrorField = this.form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }
    
    getFieldLabel(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const label = this.form.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent : fieldName;
    }
}

// ALTERNATIVE: Manual form handling for complex cases
function getFormDataManually(form) {
    const data = {};
    
    // Regular form fields
    for (const element of form.elements) {
        if (!element.name) continue;
        
        if (element.type === 'checkbox') {
            if (element.checked) {
                if (data[element.name]) {
                    // Multiple checkboxes with same name
                    if (!Array.isArray(data[element.name])) {
                        data[element.name] = [data[element.name]];
                    }
                    data[element.name].push(element.value);
                } else {
                    data[element.name] = element.value;
                }
            }
        } else if (element.type === 'radio') {
            if (element.checked) {
                data[element.name] = element.value;
            }
        } else if (element.tagName === 'SELECT' && element.multiple) {
            data[element.name] = Array.from(element.selectedOptions).map(opt => opt.value);
        } else {
            data[element.name] = element.value;
        }
    }
    
    return data;
}

// Usage
const validator = new FormValidator('#registration-form');
```

### 6. Performance: Throttling and Debouncing ⚡

**Analogy:** 
- **Debouncing** is like waiting for an elevator. It keeps resetting the timer every time someone new presses the button, only moving when everyone stops pressing.
- **Throttling** is like a traffic light that changes every 30 seconds, no matter how many cars are waiting.

```javascript
// throttling-debouncing-complete.js

// DEBOUNCING - Wait for quiet period
function debounce(func, delay) {
    let timeoutId;
    
    return function debounced(...args) {
        // Clear previous timeout
        clearTimeout(timeoutId);
        
        // Set new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// THROTTLING - Limit execution rate
function throttle(func, limit) {
    let inThrottle;
    
    return function throttled(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// REAL-WORLD APPLICATIONS

// 1. SEARCH AUTOCOMPLETE (Debounce)
const searchInput = document.querySelector('#search');
const searchResults = document.querySelector('#search-results');

const performSearch = debounce(async (query) => {
    if (query.trim().length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    console.log(`Searching for: ${query}`);
    searchResults.innerHTML = 'Searching...';
    
    try {
        // Simulate API call
        const results = await fakeSearchAPI(query);
        displaySearchResults(results);
    } catch (error) {
        searchResults.innerHTML = 'Search failed. Please try again.';
    }
}, 300);

searchInput.addEventListener('input', (event) => {
    performSearch(event.target.value);
});

// 2. SCROLL PROGRESS INDICATOR (Throttle)
const progressBar = document.querySelector('#scroll-progress');

const updateScrollProgress = throttle(() => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;
    
    progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
}, 16); // ~60fps

window.addEventListener('scroll', updateScrollProgress);

// 3. RESIZE HANDLER (Debounce)
const handleResize = debounce(() => {
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    
    // Update layout calculations
    updateLayout();
    
    // Update charts or graphs
    redrawCharts();
}, 250);

window.addEventListener('resize', handleResize);

// 4. SAVE DRAFT (Debounce)
const textEditor = document.querySelector('#editor');
const saveStatus = document.querySelector('#save-status');

const saveDraft = debounce(async (content) => {
    saveStatus.textContent = 'Saving...';
    saveStatus.className = 'saving';
    
    try {
        await fakeAutoSave(content);
        saveStatus.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
        saveStatus.className = 'saved';
    } catch (error) {
        saveStatus.textContent = 'Save failed';
        saveStatus.className = 'error';
    }
}, 1000);

textEditor.addEventListener('input', (event) => {
    saveStatus.textContent = 'Unsaved changes';
    saveStatus.className = 'unsaved';
    saveDraft(event.target.value);
});

// 5. BUTTON CLICK PROTECTION (Throttle)
const likeButton = document.querySelector('#like-btn');
let likeCount = 0;

const handleLike = throttle(() => {
    likeCount++;
    likeButton.textContent = `❤️ ${likeCount}`;
    console.log('Like registered!');
}, 1000); // Prevent spam clicking

likeButton.addEventListener('click', handleLike);

// ADVANCED: Debounce with immediate execution option
function debounceImmediate(func, delay, immediate = false) {
    let timeoutId;
    
    return function debounced(...args) {
        const callNow = immediate && !timeoutId;
        
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) func.apply(this, args);
        }, delay);
        
        if (callNow) func.apply(this, args);
    };
}

// ADVANCED: Throttle with leading and trailing options
function throttleAdvanced(func, limit, { leading = true, trailing = true } = {}) {
    let timeoutId;
    let lastRan;
    
    return function throttled(...args) {
        if (!lastRan) {
            if (leading) func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    if (trailing) func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// PERFORMANCE MONITORING
function measurePerformance(name, func) {
    return function measured(...args) {
        const start = performance.now();
        const result = func.apply(this, args);
        const end = performance.now();
        console.log(`${name} took ${(end - start).toFixed(2)}ms`);
        return result;
    };
}

// Apply performance monitoring
const monitoredSearch = measurePerformance('Search', performSearch);

// Helper functions (simulated)
async function fakeSearchAPI(query) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`
    ];
}

function displaySearchResults(results) {
    searchResults.innerHTML = results.map(result => 
        `<div class="result">${result}</div>`
    ).join('');
}

async function fakeAutoSave(content) {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('draft', content);
}

function updateLayout() {
    // Recalculate responsive layout
    console.log('Layout updated');
}

function redrawCharts() {
    // Redraw charts with new dimensions
    console.log('Charts redrawn');
}
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