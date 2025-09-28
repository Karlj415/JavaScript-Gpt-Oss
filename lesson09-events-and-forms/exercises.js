/*
====================================
LESSON 09: PRACTICE DRILLS
====================================

Time: 60 minutes
Goal: Master event handling and form validation

------------------------------------
DRILL 1: Button Group with Event Delegation
------------------------------------
Challenge: Handle multiple buttons efficiently
Why This Matters: Performance optimization for dynamic UI elements
*/

function createButtonGroup() {
    // Create container and buttons
    const container = document.createElement('div');
    container.className = 'button-group';
    container.innerHTML = `
        <h3>🎛️ Action Panel</h3>
        <div class="buttons">
            <button class="action-btn" data-action="save" data-label="Save Document">💾 Save</button>
            <button class="action-btn" data-action="load" data-label="Load Document">📂 Load</button>
            <button class="action-btn" data-action="print" data-label="Print Document">🖨️ Print</button>
            <button class="action-btn" data-action="export" data-label="Export PDF">📄 Export</button>
            <button class="action-btn" data-action="share" data-label="Share Document">🔗 Share</button>
        </div>
        <div class="log"></div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .button-group {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: system-ui;
        }
        .buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        .action-btn {
            padding: 10px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .action-btn:hover {
            background: #0056b3;
            transform: translateY(-1px);
        }
        .action-btn:active {
            transform: translateY(0);
        }
        .log {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            min-height: 100px;
            font-family: monospace;
            font-size: 14px;
            overflow-y: auto;
            max-height: 200px;
        }
        .log-entry {
            margin-bottom: 5px;
            padding: 2px 0;
        }
        .log-entry.new {
            background: #fff3cd;
            animation: highlight 0.5s ease;
        }
        @keyframes highlight {
            from { background: #ffeaa7; }
            to { background: transparent; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);
    
    const buttonsContainer = container.querySelector('.buttons');
    const log = container.querySelector('.log');
    
    // Single event listener handles ALL buttons (Event Delegation)
    buttonsContainer.addEventListener('click', (event) => {
        // Check if clicked element is an action button
        if (event.target.matches('.action-btn')) {
            const button = event.target;
            const action = button.dataset.action;
            const label = button.dataset.label;
            const timestamp = new Date().toLocaleTimeString();
            
            // Log the action
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry new';
            logEntry.textContent = `[${timestamp}] ${label} (${action})`;
            log.appendChild(logEntry);
            
            // Remove highlight after animation
            setTimeout(() => {
                logEntry.classList.remove('new');
            }, 500);
            
            // Simulate action
            performAction(action, label);
            
            // Visual feedback
            button.style.background = '#28a745';
            setTimeout(() => {
                button.style.background = '#007bff';
            }, 200);
        }
    });
    
    // Add dynamic button to test event delegation
    const addButton = document.createElement('button');
    addButton.textContent = '➕ Add New Button';
    addButton.style.cssText = 'margin-top: 10px; padding: 8px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;';
    
    addButton.addEventListener('click', () => {
        const newButton = document.createElement('button');
        newButton.className = 'action-btn';
        newButton.dataset.action = 'dynamic';
        newButton.dataset.label = 'Dynamic Action';
        newButton.textContent = '✨ Dynamic';
        buttonsContainer.appendChild(newButton);
    });
    
    container.appendChild(addButton);
    
    // Simulate different actions
    function performAction(action, label) {
        const actions = {
            save: () => console.log('💾 Document saved to localStorage'),
            load: () => console.log('📂 Loading document...'),
            print: () => console.log('🖨️ Sending to printer...'),
            export: () => console.log('📄 Generating PDF...'),
            share: () => console.log('🔗 Creating share link...'),
            dynamic: () => console.log('✨ Dynamic action executed!')
        };
        
        const actionFn = actions[action];
        if (actionFn) {
            actionFn();
        }
    }
}

/*
------------------------------------
DRILL 2: Real-time Password Strength Validator
------------------------------------
Challenge: Validate password strength as user types
Why This Matters: Immediate feedback improves user experience
*/

function createPasswordValidator() {
    const container = document.createElement('div');
    container.className = 'password-validator';
    container.innerHTML = `
        <h3>🔐 Password Strength Validator</h3>
        <div class="input-group">
            <label for="password-input">Enter Password:</label>
            <input type="password" id="password-input" placeholder="Type your password...">
            <button type="button" id="toggle-visibility" title="Show/Hide Password">👁️</button>
        </div>
        <div class="strength-meter">
            <div class="strength-bar"></div>
        </div>
        <div class="strength-text">Password strength will appear here</div>
        <div class="requirements">
            <div class="requirement" data-rule="length">
                <span class="icon">❌</span>
                <span class="text">At least 8 characters</span>
            </div>
            <div class="requirement" data-rule="uppercase">
                <span class="icon">❌</span>
                <span class="text">At least one uppercase letter (A-Z)</span>
            </div>
            <div class="requirement" data-rule="lowercase">
                <span class="icon">❌</span>
                <span class="text">At least one lowercase letter (a-z)</span>
            </div>
            <div class="requirement" data-rule="numbers">
                <span class="icon">❌</span>
                <span class="text">At least one number (0-9)</span>
            </div>
            <div class="requirement" data-rule="symbols">
                <span class="icon">❌</span>
                <span class="text">At least one symbol (!@#$%^&*)</span>
            </div>
        </div>
        <div class="password-tips">
            <h4>💡 Tips for a strong password:</h4>
            <ul>
                <li>Mix upper and lowercase letters</li>
                <li>Include numbers and symbols</li>
                <li>Avoid common words or patterns</li>
                <li>Make it at least 12 characters long</li>
            </ul>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .password-validator {
            max-width: 500px;
            margin: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: system-ui;
        }
        .input-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        .input-group label {
            font-weight: 600;
            min-width: 120px;
        }
        #password-input {
            flex: 1;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        #password-input:focus {
            outline: none;
            border-color: #007bff;
        }
        #toggle-visibility {
            padding: 8px;
            background: none;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .strength-meter {
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .strength-bar {
            height: 100%;
            width: 0%;
            transition: width 0.3s, background-color 0.3s;
            border-radius: 4px;
        }
        .strength-text {
            text-align: center;
            font-weight: 600;
            margin-bottom: 20px;
            min-height: 24px;
        }
        .requirements {
            margin-bottom: 20px;
        }
        .requirement {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px 0;
            transition: all 0.3s;
        }
        .requirement .icon {
            width: 20px;
            text-align: center;
        }
        .requirement.met .icon {
            color: green;
        }
        .requirement.met .text {
            color: #28a745;
            text-decoration: line-through;
        }
        .password-tips {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .password-tips h4 {
            margin-top: 0;
            color: #495057;
        }
        .password-tips ul {
            margin-bottom: 0;
        }
        .password-tips li {
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);
    
    const passwordInput = container.querySelector('#password-input');
    const toggleBtn = container.querySelector('#toggle-visibility');
    const strengthBar = container.querySelector('.strength-bar');
    const strengthText = container.querySelector('.strength-text');
    const requirements = container.querySelectorAll('.requirement');
    
    // Password strength checker
    function checkPasswordStrength(password) {
        const rules = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };
        
        const metRequirements = Object.values(rules).filter(Boolean).length;
        const totalRequirements = Object.keys(rules).length;
        
        // Update requirement indicators
        requirements.forEach(req => {
            const rule = req.dataset.rule;
            const icon = req.querySelector('.icon');
            
            if (rules[rule]) {
                req.classList.add('met');
                icon.textContent = '✅';
            } else {
                req.classList.remove('met');
                icon.textContent = '❌';
            }
        });
        
        // Calculate strength
        let strength = 0;
        let strengthLabel = '';
        let barColor = '';
        
        if (password.length === 0) {
            strength = 0;
            strengthLabel = 'Enter a password';
            barColor = '#e0e0e0';
        } else if (metRequirements <= 1) {
            strength = 20;
            strengthLabel = 'Very Weak 😟';
            barColor = '#dc3545';
        } else if (metRequirements === 2) {
            strength = 40;
            strengthLabel = 'Weak 😐';
            barColor = '#fd7e14';
        } else if (metRequirements === 3) {
            strength = 60;
            strengthLabel = 'Fair 🙂';
            barColor = '#ffc107';
        } else if (metRequirements === 4) {
            strength = 80;
            strengthLabel = 'Strong 😊';
            barColor = '#28a745';
        } else if (metRequirements === 5) {
            strength = 100;
            strengthLabel = 'Very Strong 🔒';
            barColor = '#198754';
        }
        
        // Bonus points for length
        if (password.length >= 12) {
            strength = Math.min(100, strength + 10);
        }
        if (password.length >= 16) {
            strength = Math.min(100, strength + 10);
        }
        
        // Update UI
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = barColor;
        strengthText.textContent = strengthLabel;
        strengthText.style.color = barColor;
        
        return { strength, rules, metRequirements };
    }
    
    // Real-time validation with debouncing
    let validationTimeout;
    passwordInput.addEventListener('input', (event) => {
        clearTimeout(validationTimeout);
        validationTimeout = setTimeout(() => {
            checkPasswordStrength(event.target.value);
        }, 100); // Small delay for smooth experience
    });
    
    // Toggle password visibility
    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? '🙈' : '👁️';
        toggleBtn.title = isPassword ? 'Hide Password' : 'Show Password';
    });
    
    // Initial state
    checkPasswordStrength('');
}

/*
------------------------------------
DRILL 3: Keyboard Shortcuts
------------------------------------
Challenge: Implement global keyboard shortcuts
Why This Matters: Accessibility and power user features
*/

function setupKeyboardShortcuts() {
    // Create demo form
    const container = document.createElement('div');
    container.className = 'keyboard-demo';
    container.innerHTML = `
        <h3>⌨️ Keyboard Shortcuts Demo</h3>
        <div class="shortcuts-list">
            <div class="shortcut">
                <kbd>Alt + N</kbd>
                <span>Focus Name Input</span>
            </div>
            <div class="shortcut">
                <kbd>Alt + E</kbd>
                <span>Focus Email Input</span>
            </div>
            <div class="shortcut">
                <kbd>Ctrl + S</kbd>
                <span>Save Form</span>
            </div>
            <div class="shortcut">
                <kbd>Escape</kbd>
                <span>Clear All Fields</span>
            </div>
            <div class="shortcut">
                <kbd>Ctrl + /</kbd>
                <span>Show/Hide Shortcuts</span>
            </div>
        </div>
        <form class="demo-form">
            <div class="form-group">
                <label for="name-input">Name:</label>
                <input type="text" id="name-input" name="name" placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label for="email-input">Email:</label>
                <input type="email" id="email-input" name="email" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="message-input">Message:</label>
                <textarea id="message-input" name="message" rows="4" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit">Submit</button>
            <button type="button" id="clear-btn">Clear</button>
        </form>
        <div class="status" id="status">Ready. Try the keyboard shortcuts!</div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-demo {
            max-width: 600px;
            margin: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: system-ui;
        }
        .shortcuts-list {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .shortcut {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
        }
        kbd {
            background: #e9ecef;
            border: 1px solid #ced4da;
            border-radius: 3px;
            padding: 2px 6px;
            font-size: 12px;
            font-family: monospace;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        .demo-form button {
            padding: 10px 20px;
            margin-right: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .demo-form button[type="submit"] {
            background: #28a745;
            color: white;
        }
        .demo-form button[type="button"] {
            background: #6c757d;
            color: white;
        }
        .status {
            margin-top: 15px;
            padding: 10px;
            background: #d1ecf1;
            border-radius: 4px;
            border-left: 4px solid #bee5eb;
        }
        .status.success {
            background: #d4edda;
            border-left-color: #c3e6cb;
        }
        .status.error {
            background: #f8d7da;
            border-left-color: #f5c6cb;
        }
        .shortcuts-list.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);
    
    const nameInput = container.querySelector('#name-input');
    const emailInput = container.querySelector('#email-input');
    const messageInput = container.querySelector('#message-input');
    const form = container.querySelector('.demo-form');
    const status = container.querySelector('#status');
    const shortcutsList = container.querySelector('.shortcuts-list');
    const clearBtn = container.querySelector('#clear-btn');
    
    // Status update helper
    function updateStatus(message, type = 'info') {
        status.textContent = message;
        status.className = `status ${type}`;
    }
    
    // Global keyboard shortcut handler
    document.addEventListener('keydown', (event) => {
        // Alt + N: Focus name input
        if (event.altKey && event.key.toLowerCase() === 'n') {
            event.preventDefault();
            nameInput.focus();
            updateStatus('Name input focused (Alt + N)', 'success');
        }
        
        // Alt + E: Focus email input
        else if (event.altKey && event.key.toLowerCase() === 'e') {
            event.preventDefault();
            emailInput.focus();
            updateStatus('Email input focused (Alt + E)', 'success');
        }
        
        // Ctrl + S: Save form
        else if (event.ctrlKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem('formData', JSON.stringify(data));
            updateStatus('Form saved to localStorage (Ctrl + S)', 'success');
        }
        
        // Escape: Clear all fields
        else if (event.key === 'Escape') {
            form.reset();
            updateStatus('All fields cleared (Escape)', 'success');
        }
        
        // Ctrl + /: Toggle shortcuts help
        else if (event.ctrlKey && event.key === '/') {
            event.preventDefault();
            shortcutsList.classList.toggle('hidden');
            const isHidden = shortcutsList.classList.contains('hidden');
            updateStatus(`Shortcuts ${isHidden ? 'hidden' : 'shown'} (Ctrl + /)`, 'success');
        }
    });
    
    // Form submission handler
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateStatus('Form submitted successfully!', 'success');
    });
    
    // Clear button handler
    clearBtn.addEventListener('click', () => {
        form.reset();
        updateStatus('Form cleared manually', 'success');
    });
    
    // Load saved data on page load
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            nameInput.value = data.name || '';
            emailInput.value = data.email || '';
            messageInput.value = data.message || '';
            updateStatus('Previously saved data loaded', 'success');
        } catch (e) {
            updateStatus('Error loading saved data', 'error');
        }
    }
}

// Initialize all drills
document.addEventListener('DOMContentLoaded', () => {
    createButtonGroup();
    createPasswordValidator();
    setupKeyboardShortcuts();
});

/*
====================================
PROJECT: Complete Enrollment Form Experience
====================================

Time: 90 minutes
Difficulty: Advanced

Your Mission:
Build a production-ready enrollment form with real-time validation,
accessibility features, and smooth user interactions.

What You'll Practice:
- Debounced form validation
- Event delegation patterns
- Accessibility (ARIA, screen readers)
- Form data handling
- Error management
- User experience optimization
*/

function createEnrollmentForm() {
    // Create the complete form structure
    const container = document.createElement('div');
    container.className = 'enrollment-container';
    container.innerHTML = `
        <header class="enrollment-header">
            <h1>🎓 Course Enrollment Portal</h1>
            <p>Join thousands of students learning to code!</p>
        </header>
        
        <main class="enrollment-main">
            <form id="enrollment-form" class="enrollment-form" novalidate>
                <fieldset>
                    <legend>Personal Information</legend>
                    
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" name="name" required 
                               aria-describedby="name-error" 
                               placeholder="Enter your full name">
                        <div id="name-error" class="error-message" aria-live="polite"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required 
                               aria-describedby="email-error email-help"
                               placeholder="your.email@example.com">
                        <small id="email-help" class="help-text">
                            We'll use this to send course updates and materials
                        </small>
                        <div id="email-error" class="error-message" aria-live="polite"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" 
                               aria-describedby="phone-help"
                               placeholder="(555) 123-4567">
                        <small id="phone-help" class="help-text">
                            Optional - for important course notifications
                        </small>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>Course Selection</legend>
                    
                    <div class="form-group">
                        <label for="course_track">Development Track *</label>
                        <select id="course_track" name="course_track" required>
                            <option value="">Select your track...</option>
                            <option value="frontend">Frontend Development (React, Vue)</option>
                            <option value="backend">Backend Development (Node.js, Python)</option>
                            <option value="fullstack">Full-Stack Development (Complete program)</option>
                            <option value="mobile">Mobile Development (React Native)</option>
                            <option value="devops">DevOps & Cloud (AWS, Docker)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="experience">Programming Experience</label>
                        <select id="experience" name="experience">
                            <option value="beginner">Complete Beginner</option>
                            <option value="some">Some Experience (< 1 year)</option>
                            <option value="intermediate">Intermediate (1-3 years)</option>
                            <option value="advanced">Advanced (3+ years)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <fieldset class="checkbox-group">
                            <legend>Learning Goals (select all that apply)</legend>
                            <label class="checkbox-label">
                                <input type="checkbox" name="goals" value="career-change">
                                <span>Career Change</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="goals" value="skill-upgrade">
                                <span>Skill Upgrade</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="goals" value="freelance">
                                <span>Freelance/Consulting</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="goals" value="startup">
                                <span>Start My Own Company</span>
                            </label>
                        </fieldset>
                    </div>
                </fieldset>
                
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">🚀 Enroll Now</span>
                        <span class="btn-loader" style="display: none;">🔄 Processing...</span>
                    </button>
                    <button type="reset" class="reset-btn">Clear Form</button>
                </div>
            </form>
            
            <div id="summary" class="summary" role="status" aria-live="polite" aria-atomic="true"></div>
            
            <section class="faq-section">
                <h2>❓ Frequently Asked Questions</h2>
                <div id="faq-container" class="faq-container">
                    <div class="faq-item">
                        <h3 class="faq-question" tabindex="0" role="button" 
                            aria-expanded="false" aria-controls="faq-1">
                            What are the prerequisites for enrollment?
                            <span class="faq-icon">▼</span>
                        </h3>
                        <div id="faq-1" class="faq-answer">
                            <p>No prior programming experience is required for our beginner tracks. 
                            For intermediate tracks, basic HTML/CSS knowledge is recommended. 
                            All you need is enthusiasm to learn!</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <h3 class="faq-question" tabindex="0" role="button" 
                            aria-expanded="false" aria-controls="faq-2">
                            Can I switch tracks after enrollment?
                            <span class="faq-icon">▼</span>
                        </h3>
                        <div id="faq-2" class="faq-answer">
                            <p>Yes! You can switch tracks within the first two weeks of the program 
                            at no additional cost. After that, switching may require additional fees.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <h3 class="faq-question" tabindex="0" role="button" 
                            aria-expanded="false" aria-controls="faq-3">
                            What's the time commitment?
                            <span class="faq-icon">▼</span>
                        </h3>
                        <div id="faq-3" class="faq-answer">
                            <p>Our program is designed for busy professionals. Expect 10-15 hours per week, 
                            with flexible scheduling options including weekend intensives.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <h3 class="faq-question" tabindex="0" role="button" 
                            aria-expanded="false" aria-controls="faq-4">
                            Do you offer job placement assistance?
                            <span class="faq-icon">▼</span>
                        </h3>
                        <div id="faq-4" class="faq-answer">
                            <p>Absolutely! Our career services team provides resume reviews, 
                            interview preparation, and connections to our network of 500+ hiring partners.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    // Add comprehensive styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
        }
        
        .enrollment-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .enrollment-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
        }
        
        .enrollment-header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5rem;
        }
        
        .enrollment-header p {
            margin: 0;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .enrollment-form {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        fieldset {
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        
        legend {
            font-weight: 600;
            font-size: 1.1rem;
            color: #495057;
            padding: 0 10px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #495057;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #dee2e6;
            border-radius: 6px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-group input.error,
        .form-group select.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .help-text {
            display: block;
            margin-top: 4px;
            font-size: 0.875rem;
            color: #6c757d;
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 4px;
            min-height: 20px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .error-message:not(:empty)::before {
            content: '⚠️';
        }
        
        .checkbox-group {
            border: none;
            padding: 0;
            margin: 0;
        }
        
        .checkbox-group legend {
            font-size: 1rem;
            margin-bottom: 10px;
        }
        
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .checkbox-label:hover {
            background-color: #f8f9fa;
        }
        
        .checkbox-label input[type="checkbox"] {
            width: auto;
            margin: 0;
        }
        
        .form-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }
        
        .submit-btn,
        .reset-btn {
            padding: 14px 28px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .reset-btn {
            background: #6c757d;
            color: white;
        }
        
        .reset-btn:hover {
            background: #5a6268;
        }
        
        .summary {
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            min-height: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
        }
        
        .summary.success {
            background: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }
        
        .summary.error {
            background: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }
        
        .summary:empty {
            display: none;
        }
        
        .faq-section {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .faq-section h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #495057;
        }
        
        .faq-item {
            border-bottom: 1px solid #e1e5e9;
            margin-bottom: 15px;
        }
        
        .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            margin: 0;
            cursor: pointer;
            color: #495057;
            font-size: 1.1rem;
            font-weight: 600;
            transition: color 0.3s;
        }
        
        .faq-question:hover,
        .faq-question:focus {
            color: #667eea;
            outline: none;
        }
        
        .faq-icon {
            transition: transform 0.3s;
            font-size: 0.8rem;
        }
        
        .faq-question[aria-expanded="true"] .faq-icon {
            transform: rotate(180deg);
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
            padding: 0 0;
        }
        
        .faq-answer.open {
            max-height: 200px;
            padding: 0 0 15px 0;
        }
        
        .faq-answer p {
            margin: 0;
            color: #6c757d;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .enrollment-container {
                padding: 15px;
            }
            
            .enrollment-form {
                padding: 20px;
            }
            
            .form-actions {
                flex-direction: column;
            }
            
            .submit-btn,
            .reset-btn {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(container);
    
    // Initialize form functionality
    const form = container.querySelector('#enrollment-form');
    const summary = container.querySelector('#summary');
    const faqContainer = container.querySelector('#faq-container');
    
    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Please enter a valid name (letters, spaces, hyphens, apostrophes only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            pattern: /^[\d\s\(\)\+\-\.]+$/,
            message: 'Please enter a valid phone number'
        },
        course_track: {
            required: true,
            message: 'Please select a development track'
        }
    };
    
    // Debounce helper function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Validation functions
    function validateField(field) {
        const { name, value } = field;
        const rules = validationRules[name];
        const errorElement = document.querySelector(`#${name}-error`);
        
        if (!rules) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value.trim()) {
            isValid = false;
            errorMessage = `${getFieldLabel(name)} is required`;
        }
        // Pattern validation
        else if (value.trim() && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }
        // Length validation
        else if (value.trim() && rules.minLength && value.trim().length < rules.minLength) {
            isValid = false;
            errorMessage = `${getFieldLabel(name)} must be at least ${rules.minLength} characters`;
        }
        
        // Update UI
        if (isValid) {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
        } else {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    function getFieldLabel(fieldName) {
        const field = document.querySelector(`#${fieldName}`);
        const label = document.querySelector(`label[for="${fieldName}"]`);
        return label ? label.textContent.replace(' *', '') : fieldName;
    }
    
    function showSummary(message, type = 'success') {
        summary.textContent = message;
        summary.className = `summary ${type}`;
        summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function setSubmitButtonState(isSubmitting) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        submitBtn.disabled = isSubmitting;
        btnText.style.display = isSubmitting ? 'none' : 'inline';
        btnLoader.style.display = isSubmitting ? 'inline' : 'none';
    }
    
    // Event listeners
    
    // Real-time email validation (debounced)
    const emailField = form.querySelector('#email');
    const debouncedEmailValidation = debounce((field) => {
        validateField(field);
    }, 300);
    
    emailField.addEventListener('input', (event) => {
        debouncedEmailValidation(event.target);
    });
    
    // Validate other fields on blur
    form.addEventListener('blur', (event) => {
        if (event.target.matches('input, select')) {
            validateField(event.target);
        }
    }, true);
    
    // Form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Clear previous summary
        summary.textContent = '';
        summary.className = 'summary';
        
        // Validate all fields
        const fields = form.querySelectorAll('input[name], select[name]');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showSummary('Please correct the errors below and try again.', 'error');
            // Focus first error field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        setSubmitButtonState(true);
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Handle multiple checkbox values
            const goals = formData.getAll('goals');
            data.goals = goals;
            
            // Simulate successful enrollment
            console.log('Enrollment data:', data);
            
            // Show success message
            showSummary(`🎉 Welcome to the ${data.course_track} track, ${data.name}! Check your email for next steps.`, 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            showSummary('Enrollment failed. Please try again later.', 'error');
        } finally {
            setSubmitButtonState(false);
        }
    });
    
    // FAQ section - Event Delegation
    faqContainer.addEventListener('click', (event) => {
        const question = event.target.closest('.faq-question');
        if (question) {
            toggleFAQ(question);
        }
    });
    
    // FAQ keyboard support
    faqContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const question = event.target.closest('.faq-question');
            if (question) {
                event.preventDefault();
                toggleFAQ(question);
            }
        }
    });
    
    function toggleFAQ(question) {
        const answer = question.nextElementSibling;
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQs
        faqContainer.querySelectorAll('.faq-question').forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            }
        });
        
        // Toggle current FAQ
        question.setAttribute('aria-expanded', !isExpanded);
        answer.classList.toggle('open', !isExpanded);
    }
    
    // Form reset handling
    form.addEventListener('reset', () => {
        // Clear all errors
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        });
        
        form.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Clear summary
        summary.textContent = '';
        summary.className = 'summary';
        
        showSummary('Form cleared successfully!', 'success');
        setTimeout(() => {
            summary.textContent = '';
            summary.className = 'summary';
        }, 3000);
    });
}

// Initialize the complete enrollment experience
document.addEventListener('DOMContentLoaded', () => {
    createEnrollmentForm();
});
