# Lesson 11 · Modules and Tooling

Today I’ll teach you how to structure JavaScript across files, manage dependencies, and leverage the modern tooling ecosystem. You’ll learn about module systems, npm, and the build tools that power professional development.

## Objectives
- Use ES Modules (`import`/`export`) for static and dynamic loading.
- Understand the basics of Node.js's CommonJS modules (`require`/`module.exports`).
- Grasp the roles of `package.json`, `package-lock.json`, and `node_modules`.
- Read and understand Semantic Versioning (SemVer) for dependencies.
- Use `npm` to manage packages and `npx` to run package binaries.
- Understand the purpose of bundlers (Vite) and transpilers (Babel).

## Lesson Narrative

### 1. Why Modules Exist
As applications grow, placing all your code in one file becomes unmanageable. Modules allow you to split your code into smaller, reusable, and encapsulated files. This improves organization, prevents naming conflicts in the global scope, and makes your code easier to reason about.

### 2. ES Modules (ESM): The Modern Standard
ESM is the official module system for JavaScript. It is supported in all modern browsers and in Node.js.

`utils.js`
```javascript
// Named export
export function add(a, b) {
  return a + b;
}

// Named export
export const PI = 3.14159;

// Default export (use sparingly)
export default function sayHello() {
  console.log("Hello, world!");
}
```
`main.js`
```javascript
// Import named exports by name, and the default export with any name you choose
import sayHello, { add, PI } from "./utils.js";

console.log(add(2, PI));
sayHello();
```

#### Dynamic Imports
For performance, you can load modules on demand. The dynamic `import()` function returns a promise, making it perfect for code-splitting.

```javascript
// lazy-load.js
document.getElementById('load-chart-btn').addEventListener('click', async () => {
  // Load the charting library only when the user clicks the button
  const { Chart } = await import('./chart-library.js');
  const chart = new Chart();
  chart.render();
});
```

### 3. CommonJS (CJS): The Node.js Legacy
Before ESM was standardized, Node.js created its own module system, CommonJS. You will see it everywhere in older Node projects and packages.

`math.cjs`
```javascript
function add(a, b) { return a + b; }

module.exports = {
  add: add,
};
```
`main.cjs`
```javascript
const { add } = require("./math.cjs");
```

### 4. Dependency Management with npm

#### `package.json` vs. `package-lock.json` vs. `node_modules`
- `package.json`: Your project's manifest. It lists the dependencies you *want* and their allowed version ranges (e.g., `^4.17.0`).
- `package-lock.json`: **The source of truth.** It is auto-generated and records the *exact* versions of every dependency that was installed. This file ensures that every developer on your team gets the exact same setup (`npm ci` uses this).
- `node_modules/`: The physical folder where all the code for your dependencies is downloaded.

**You commit `package.json` and `package-lock.json`. You NEVER commit `node_modules`.**

#### Understanding Semantic Versioning (SemVer)
A version `Major.Minor.Patch` (e.g., `4.17.21`) communicates the type of change:
- **PATCH:** Bug fixes. Backwards compatible.
- **MINOR:** New features. Backwards compatible.
- **MAJOR:** Breaking changes.

In `package.json`, prefixes control updates:
- `~1.2.3` allows patch updates (e.g., `1.2.4`, but not `1.3.0`).
- `^1.2.3` allows minor and patch updates (e.g., `1.3.0`, but not `2.0.0`). This is the default.

#### `npm install` vs. `npx`
- `npm install <package>`: Downloads a package and saves it to `node_modules` and your `package.json`.
- `npx <package-command>`: **Executes** a package's command-line tool *without* permanently installing it. It’s a secure and convenient way to run tools.
  `npx eslint --init` // Runs the ESLint initialization script.

### 5. Build Tooling: Bundlers and Transpilers
- **Bundler (e.g., Vite, Webpack):** Follows all your `import` statements across files and merges them into one or more optimized JavaScript files for the browser.
- **Transpiler (e.g., Babel):** Converts modern or non-standard JavaScript (like JSX or TypeScript) into older JavaScript code that can run in a wider range of browsers.

Modern tools like Vite handle both bundling and transpiling for you with minimal configuration.

### 6. Module Resolution
How does `import 'lodash'` work without a path?
1.  Node.js first checks if it's a core module (e.g., `fs`, `path`).
2.  If not, it starts in the current directory and looks for a `node_modules/lodash` folder.
3.  If not found, it moves to the parent directory and repeats the search, all the way up to the root of the file system.

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [ES Modules vs CommonJS (Fireship)](https://www.youtube.com/watch?v=cRHQNNcYf6s)
- [Modern JavaScript Tooling (Vite Intro by Evan You)](https://www.youtube.com/watch?v=xXrhg26VCSc)

## References
- MDN: [Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- npm Docs: [`package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)
- Node.js Docs: [Modules: CommonJS modules](https://nodejs.org/api/modules.html)
- Vite Docs: [Getting Started](https://vitejs.dev/guide/)

## Reflection
- Why is `package-lock.json` so important for team collaboration?
- Describe a scenario where dynamic `import()` would be a critical performance optimization.
- What is the difference between a dependency and a dev dependency?

Lesson 12 focuses on testing and debugging so you can verify correctness and diagnose issues quickly.