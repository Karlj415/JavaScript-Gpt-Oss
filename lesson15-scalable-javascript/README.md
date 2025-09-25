# Lesson 15 · Scalable JavaScript

Today I’ll teach you strategies for building large, maintainable JavaScript applications. We’ll cover modular architecture, predictable state management, dependency injection, and the professional workflows that enable teams to collaborate effectively.

## Objectives
- Design a scalable, feature-based folder structure.
- Implement a simple pub/sub state store from scratch.
- Apply Dependency Injection (DI) to decouple modules.
- Manage environment-specific configuration safely.
- Introduce static typing with TypeScript or JSDoc for enhanced safety.
- Establish professional team workflows for commits, code reviews, and CI.

## Lesson Narrative

### 1. Architecture: From Folders to Boundaries
A scalable architecture is about clear boundaries. Instead of organizing by file type (e.g., `controllers/`, `views/`), organize by **feature**. This co-locates related code and makes it easier to find and modify.

```
src/
  features/
    enrollment/         # Feature 1
      index.js            # Public API for this feature
      enrollment-api.js
      enrollment-view.js
    progress/           # Feature 2
  shared/
    components/         # Reusable UI components
    utils/              # Generic helper functions
    config.js           # App configuration
  services/
    api-client.js
    logger.js
```
Each feature should have a clear entry point (`index.js`) that exports only what other parts of the application need to know. This is its public API.

### 2. Predictable State Management
As an app grows, managing shared state (`isLoggedIn`, `currentUser`, etc.) becomes complex. A centralized **store** brings predictability.

#### A Simple Pub/Sub Store
This pattern has three parts:
1.  A private state object.
2.  A way to get the state (`getState`).
3.  A way to update the state (`dispatch`).
4.  A way to listen for changes (`subscribe`).

```javascript
// state/store.js
function createStore(initialState) {
  let state = initialState;
  const subscribers = new Set();

  return {
    getState: () => state,
    dispatch: (action) => {
      // In a real app, you'd use a reducer here
      state = { ...state, ...action };
      subscribers.forEach(cb => cb());
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback); // Return an unsubscribe function
    },
  };
}

export const store = createStore({ user: null, theme: 'light' });
```

### 3. Decoupling with Dependency Injection (DI)
Modules should not create their own dependencies (like loggers, API clients, or configuration). They should be "injected" from the outside. This makes modules easier to test and reuse.

```javascript
// BAD: Hard-coded dependency
// function createReport() {
//   const logger = new PinoLogger(); // Tightly coupled to PinoLogger
//   logger.info("Creating report...");
// }

// GOOD: Dependency is injected
function createReport(logger) {
  logger.info("Creating report...");
}

// In your main application file, you create the dependencies and inject them.
const myLogger = new PinoLogger();
createReport(myLogger);
```

### 4. Static Typing for Safety

#### TypeScript Interfaces
While JSDoc is great, TypeScript provides more powerful tools for defining the "shape" of your data, like interfaces.

```typescript
// types.ts
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function deactivateUser(user: User): User {
  return { ...user, isActive: false };
}
```

### 5. Managing Configuration
Never hard-code API keys, secrets, or environment-specific settings in your code. Use environment variables.

1.  Create a `.env` file in your project root (and add `.env` to `.gitignore`!).
    `.env` -> `API_KEY="your_secret_key_here"`
2.  Install `dotenv`: `npm install dotenv`
3.  Load the variables early in your application's startup process.

    ```javascript
    // config.js
    import 'dotenv/config'; // Load .env variables

    export const config = {
      apiKey: process.env.API_KEY,
      environment: process.env.NODE_ENV || 'development',
    };
    ```

### 6. Professional Collaboration Workflow

- **Git Flow:** Use feature branches, create Pull Requests (PRs) for review, and merge into a main branch (`main` or `develop`).
- **Commit Messages:** Use the [Conventional Commits](https://www.conventionalcommits.org/) standard (e.g., `feat: add user login`, `fix: correct validation logic`).
- **Linting on Commit:** Use a tool like `husky` to run `npm run lint` automatically before any code can be committed.
- **Architecture Decision Records (ADRs):** For significant decisions, create a short markdown file.

    **ADR Template:**
    - **Title:** e.g., "Adopt Vite for Frontend Tooling"
    - **Context:** What is the problem or decision to be made?
    - **Decision:** What is the change we are making?
    - **Consequences:** What are the positive and negative results of this decision?

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Nicholas Zakas: Scalable JavaScript Application Architecture (YUI Library)](https://www.youtube.com/watch?v=vXjVFPosQHw)
- [Adopting Typescript at Scale - Brie Bunge | JSConf Hawaii 2019 (JSConf)](https://www.youtube.com/watch?v=P-J9Eg7hJwE)

## References
- "Clean Architecture" by Robert C. Martin
- Microsoft Docs: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Dependency Injection principles, practices, and patterns](https://www.manning.com/books/dependency-injection-principles-practices-patterns)

## Reflection
- How does Dependency Injection make your code easier to test?
- What is the first thing you would add to the simple pub/sub store to make it more robust?
- Why is it important to keep configuration separate from code?

We now pivot to the backend. Lesson 16 introduces Node.js fundamentals.