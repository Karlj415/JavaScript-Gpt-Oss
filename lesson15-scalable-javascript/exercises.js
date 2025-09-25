/*
## Practice Drills
1. Refactor a previous project (like the To-Do list or Course Catalog) into a feature-based folder structure (`src/features/todos`, `src/shared/utils`).
2. Add `// @ts-check` to the top of a JavaScript file from a previous lesson and use JSDoc comments (`/** ... */`) to define the types for a function and its parameters. Fix any errors that VS Code reports.
3. Create a `CONTRIBUTING.md` file for a project. In it, outline how a new contributor should create a feature branch, run tests, and submit a pull request. Include your project's commit message convention.
*/

/*
## Project: Cohort Dashboard Architecture

**Objective:** Architect a small but scalable application from scratch, focusing on structure, state management, and dependency injection rather than UI.

**Instructions:**
1.  **Folder Structure:** Create the full folder structure as outlined in the README, including `src/features/`, `src/services/`, `src/state/`, and `docs/adr/`.

2.  **Configuration (`src/config.js`):**
    -   Set up a `.env` file with a `LOG_LEVEL` (e.g., `info`).
    -   Create a `config.js` file that loads this variable using `dotenv`.

3.  **Services (`src/services/`):**
    -   Create a `logger.js` service. It should be a simple object or factory function that exposes `log`, `warn`, and `error` methods. It should respect the `LOG_LEVEL` from the configuration.

4.  **State (`src/state/store.js`):**
    -   Implement the simple `createStore` pub/sub pattern from the README.
    -   Initialize a store with a structure like `{ students: [], announcements: [] }`.

5.  **Features (`src/features/`):**
    -   Create an `enrollment` feature.
    -   Its main function, `enrollStudent(studentName)`, should **not** create its own dependencies. Instead, it should accept the `store` and `logger` as arguments (Dependency Injection).
    -   The function should dispatch an action to the store to add the new student and use the logger to log the action.

6.  **Main Entry Point (`src/main.js`):**
    -   This file is the heart of your application where everything is wired together.
    -   Import the `store`, the `logger`, and the `enrollStudent` function.
    -   Instantiate your services (the logger).
    -   Subscribe to store updates to log the new state whenever it changes.
    -   Call `enrollStudent`, passing in the `store` and `logger` instances.

7.  **Documentation:**
    -   Write an ADR in `docs/adr/001-state-management-choice.md` explaining why you chose a simple pub/sub store instead of a more complex library like Redux for this project.
*/

// --- Starter Code (src/main.js) ---
/*
import { store } from './state/store.js';
import { createLogger } from './services/logger.js';
import { enrollStudent } from './features/enrollment/enrollment.js';
import { config } from './config.js';

// 1. Instantiate services (dependencies)
const logger = createLogger(config.logLevel);

// 2. Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log("State updated!", store.getState());
});

// 3. Run application logic, injecting dependencies
logger.log("Application starting...");
enrollStudent("Alice", { store, logger });
enrollStudent("Bob", { store, logger });

// 4. Clean up subscription if the app were to shut down
// unsubscribe();
*/
