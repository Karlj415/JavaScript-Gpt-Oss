/*
## Practice Drills
1. Convert a small script into ES modules with separate files for utilities and main logic.
2. Install a third-party library (e.g., `date-fns`) and write a script that uses one of its functions to format a date.
3. Create npm scripts in your `package.json` for linting (`npm run lint`) and auto-formatting (`npm run format`). You'll need to install `eslint` and `prettier` as dev dependencies.
*/

/*
## Project: Tooling-Ready Starter Kit

**Objective:** Set up a complete project from scratch that uses modern tooling and best practices.

**Instructions:**
1.  **Initialize Project:**
    -   Create a new directory for this project.
    -   Run `npm init -y` to create a `package.json` file.
    -   Set `"type": "module"` in `package.json` to enable ES Modules.

2.  **Install Dependencies:**
    -   Install `vite` as a development dependency: `npm install --save-dev vite`
    -   Install `date-fns` as a regular dependency: `npm install date-fns`

3.  **Folder Structure:**
    -   Create a `src/` directory.
    -   Inside `src/`, create `main.js` and a `utils/` folder.
    -   Inside `utils/`, create `formatter.js`.

4.  **Implement Logic:**
    -   In `formatter.js`, export a function that uses the `format` function from `date-fns` to return a nicely formatted date string (e.g., "MMMM d, yyyy").
    -   In `main.js`, set up a button in your `index.html`. When the button is clicked, use a **dynamic import** to lazy-load your `formatter.js` module. Then, call the formatting function and display the current date on the page.

5.  **Configure npm Scripts:**
    -   In `package.json`, add the following scripts:
        -   `"dev": "vite"` (to run the development server)
        -   `"build": "vite build"` (to create a production build)

6.  **Documentation:**
    -   Create a `README.md` in the root of your project.
    -   Explain what the project is, its folder structure, and how to run it (`npm install`, `npm run dev`, `npm run build`).

This project simulates setting up a new application, a common task for any developer.
*/

// --- Starter HTML (index.html) ---
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tooling Starter Kit</title>
</head>
<body>
  <h1>Modern Tooling</h1>
  <button id="show-date-btn">Show Current Date</button>
  <p id="date-display"></p>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
*/

// --- Starter JavaScript (src/formatter.js) ---
/*
import { format } from 'date-fns';

export function formatCurrentDate() {
  // TODO: Use the `format` function to return the current date
  // Example format: 'MMMM d, yyyy HH:mm:ss'
  return format(new Date(), 'MMMM d, yyyy HH:mm:ss');
}
*/

// --- Starter JavaScript (src/main.js) ---
/*
const showDateBtn = document.getElementById('show-date-btn');
const dateDisplay = document.getElementById('date-display');

showDateBtn.addEventListener('click', async () => {
  try {
    // TODO: Use a dynamic import to load the formatter.js module.
    const { formatCurrentDate } = await import('./utils/formatter.js');
    
    // TODO: Call the imported function and display the result in the `dateDisplay` paragraph.
    dateDisplay.textContent = formatCurrentDate();
    
  } catch (error) {
    console.error("Failed to load date formatter:", error);
    dateDisplay.textContent = "Could not load date.";
  }
});
*/
