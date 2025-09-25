# Lesson 01 · Welcome to JavaScript

Hello, I’m your instructor and guide on this journey. In this opening lesson I will set the tone, define what JavaScript really is, and show you how to build the learning habits that will carry you from novice to professional.

## What You Will Learn Today
- The origin story of JavaScript and why it dominates modern development.
- The mindset and workflow that successful engineers rely on.
- How programs execute, even before we write actual code.
- How to install the essential tools we’ll use throughout the course.
- How to run your first line of JavaScript directly in the browser.

## Why This Matters
Before we ever touch syntax, you need context and purpose. JavaScript powers interactions on billions of devices, from browsers to servers to IoT. Understanding why the language exists gives you confidence, and establishing disciplined learning habits will save you months of frustration down the road.

## Lesson Narrative

### 1. JavaScript in Plain Language
JavaScript is the language that breathes life into the web. Whereas HTML defines structure and CSS handles presentation, JavaScript reacts to user events, manipulates data, and talks to servers. Think of it as the **behavior layer** in the web stack.

Here is a simple, complete example. Don't worry about understanding every piece yet—just observe the separation of roles:
```html
<!-- index.html -->

<!-- 1. HTML provides the raw structure -->
<button id="myButton">Click Me</button>

<!-- 2. CSS adds styling to the structure -->
<style>
  #myButton {
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>

<!-- 3. JavaScript adds behavior and interactivity -->
<script>
  const button = document.getElementById('myButton');
  button.addEventListener('click', () => {
    alert('Hello from JavaScript!');
  });
</script>
```

Unlike many languages, JavaScript runs almost everywhere: browsers, Node.js on servers, serverless platforms, desktop apps through Electron, mobile via React Native, and even hardware controllers. This ubiquity is why investing in JavaScript pays dividends across your entire career.

### 2. A Brief History (Because Context Builds Intuition)
- **1995:** Brendan Eich created JavaScript in 10 intense days to provide scripting inside Netscape Navigator. It was originally called Mocha, then LiveScript, before finally landing on JavaScript.
- **1997-2015:** The language was standardized under the ECMAScript specification. ES5 (2009) solidified the language, and ES6 (2015) modernized it dramatically.
- **Today:** Annual ECMAScript releases keep the language evolving. Modern JavaScript is a professional-grade language with functional programming features, classes, modules, and robust tooling.

Knowing this evolution matters because you’ll see legacy patterns in the wild. You must be able to read older code and still write modern, elegant solutions.

### 3. How Computers Think (Conceptual Primer)
Code is nothing more than a set of instructions. A computer executes those instructions line by line, manages values in memory, and branches based on decisions. Our job is to translate human intent into these precise instructions.

To succeed, practice **algorithmic thinking**:
1. **Observe:** Understand the problem thoroughly.
2. **Plan:** Break it into logical steps.
3. **Translate:** Express those steps in code.
4. **Review:** Verify the computer actually did what you expected.

You’ll see me follow that workflow constantly. Internalize it now—it’s the backbone of every lesson.

### 4. Install the Toolbox
We will use the following essentials throughout the course:
- **Visual Studio Code** – Our editor. Install from [https://code.visualstudio.com](https://code.visualstudio.com).
- **Node.js (LTS version)** – Gives us the JavaScript runtime outside the browser plus npm. Grab it from [https://nodejs.org/en](https://nodejs.org/en).
- **Git** – Version control keeps your history tidy. Install from [https://git-scm.com/downloads](https://git-scm.com/downloads).
- **Google Chrome** – Chrome DevTools are indispensable for debugging.

Once installed, open your Terminal (or PowerShell on Windows) and verify:
```bash
node -v
npm -v
git --version
```
You should see version numbers for each command. If not, revisit the installation instructions.

**Recommended VS Code Extensions:**
After installing VS Code, open it, go to the Extensions view (Ctrl+Shift+X), and install these:
- **Prettier - Code formatter:** Automatically formats your code to keep it consistent and readable.
- **ESLint:** Finds and fixes problems in your JavaScript code.
- **Live Server:** Launches a local development server with live reload feature for static & dynamic pages.

### 5. Your First Line of Code (The "Hello, World!" Moment)
Every developer's journey starts with a "Hello, World!". We'll run ours directly in the browser console.

1. Open Google Chrome.
2. Right-click anywhere on the page and select **"Inspect"**. This will open the Chrome DevTools.
3. Click on the **"Console"** tab at the top of the DevTools panel.
4. Click next to the blue chevron (`>`) prompt.
5. Type the following code and press **Enter**:
   ```javascript
   console.log('Hello, JavaScript World!');
   ```
6. You should see your message printed out in the console. Congratulations! You've just executed your first piece of JavaScript.

Now, try one more for fun. Type this and press **Enter**:
```javascript
alert('This is an alert box!');
```
This demonstrates how JavaScript can directly interact with the browser UI.

### 6. Your Learning Environment
Create a dedicated workspace directory. Within it, make a folder for each lesson’s practice code. Use version control from day one:
```bash
mkdir javascript-course-work
cd javascript-course-work
git init
```
Commit early and often. This habit builds muscle memory you’ll need on real projects.

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Recommended Videos
- [Map of Computer Science (Domain of Science)](https://www.youtube.com/watch?v=SzJ46YA_RaA)
- [Brendan Eich: The future of Javascript | JSConf.ar 2014 (JSConf)](https://www.youtube.com/watch?v=l-15sDweT30)

Watch them after you digest this lesson. Pay attention to the problem-solving mindset discussed.

## References & Further Reading
- MDN Web Docs: [JavaScript First Steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)
- "The Pragmatic Programmer" by Hunt & Thomas, Chapter 1 (for professional habits).

## Your Reflection
Write a short reflection addressing:
- What excited you the most today?
- Which habit will be the hardest to stick with?
- One question you’re curious about right now.

When you’re ready, move to Lesson 02 where we’ll get our hands dirty with practical tooling and your first executable JS programs.
