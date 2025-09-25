# Lesson 12 · Testing and Debugging

Today I’ll show you how professionals build confidence in their code. We’ll write automated tests to verify behavior, leverage debugging tools to diagnose issues, and adopt a disciplined workflow to catch bugs early.

## Objectives
- Structure tests using the Arrange-Act-Assert pattern.
- Write unit tests for synchronous and asynchronous code.
- Isolate code for testing by mocking dependencies.
- Use a debugger effectively in both VS Code and the browser.
- Understand and generate code coverage reports.

## Lesson Narrative

### 1. The Testing Mindset
Testing is a design activity, not an afterthought. While you write code, ask, “How will I prove this works?” Good tests serve as living documentation, prevent regressions (bugs in existing features), and give you the confidence to refactor and improve your code.

### 2. Unit Testing with Vitest
We’ll use Vitest, a modern test framework with a Jest-compatible API.

#### Setup
```bash
npm install --save-dev vitest @vitest/ui
```
Add to `package.json`:
```json
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:ui": "vitest --ui",
  "coverage": "vitest run --coverage"
}
```

#### The Anatomy of a Test: Arrange-Act-Assert
This pattern makes tests readable and predictable.
`math.test.js`
```javascript
import { describe, it, expect } from "vitest";
import { add } from "./math.js";

describe("add function", () => {
  it("should add two positive numbers correctly", () => {
    // 1. Arrange: Set up your variables and inputs
    const a = 2;
    const b = 3;

    // 2. Act: Call the function you are testing
    const result = add(a, b);

    // 3. Assert: Check if the result is what you expect
    expect(result).toBe(5);
  });
});
```

#### Common Matchers
- `.toBe(value)`: For strict equality (`===`) with primitive values.
- `.toEqual(object)`: To deeply compare objects and arrays.
- `.toBeTruthy() / .toBeFalsy()`: To check for truthiness/falsiness.
- `.toContain(item)`: To check if an array or string contains a value.
- `.toThrow()`: To check if a function throws an error.

### 3. Testing Asynchronous Code
To test promises or `async` functions, make your test function `async` and use `await`.

```javascript
// api.js
export async function fetchUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) throw new Error("User not found");
  return response.json();
}

// api.test.js
import { describe, it, expect, vi } from "vitest";
// ... (Assume fetchUser is imported)

it("should return a user object on successful fetch", async () => {
  // For async tests, you can use .resolves
  await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: "Leanne Graham" });
});
```

### 4. Isolating Code with Mocks
What if you don't want to make a real API call in your test? You **mock** the dependency. Mocking replaces a real module or function with a fake version that you control.

```javascript
// api.test.js (continued)

// Mock the global fetch function for this test file
vi.mock('node-fetch', () => ({
    default: vi.fn()
}));

it("should call the fetch API with the correct URL", async () => {
    const fetch = (await import('node-fetch')).default;
    // Arrange: Tell the mock what to return
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 1 }) });

    // Act
    await fetchUser(1);

    // Assert: Check if the mock was called correctly
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
});
```

### 5. Code Coverage
Code coverage tells you what percentage of your code is executed by your tests. It’s a great tool for finding untested parts of your application.

Run `npm run coverage`. This will generate a report in your terminal and in a `coverage/` directory.

**Warning:** 100% coverage does not mean your code is bug-free. It only means the code was *run*. It doesn't check if your assertions are meaningful.

### 6. Debugging Techniques

#### The `debugger` Statement
Place the `debugger;` statement in your code. If you run it with the browser DevTools open, execution will pause at that line automatically.

```javascript
function buggyFunction(data) {
  console.log("Processing data...");
  debugger; // Execution will pause here
  const result = data.property.nested; // Fails if data.property is undefined
  // ...
}
```

#### Breakpoints and the Call Stack
- **Breakpoints:** Click on a line number in VS Code (in the Debug panel) or Chrome DevTools to set a breakpoint. Code execution will pause there.
- **Watch Expressions:** Monitor variables as you step through code.
- **Call Stack:** See the chain of function calls that led to the current point.

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Vitest Simplified (LearnVue)](https://www.youtube.com/watch?v=snCLQmINqCU)
- [21+ Browser Dev Tools & Tips You Need To Know (Fireship)](https://www.youtube.com/watch?v=TcTSqhpm80Y)

## References
- Vitest Docs: [Getting Started](https://vitest.dev/guide/)
- MDN: [Debugging JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Debugging)
- Martin Fowler: [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

## Reflection
- How did mocking change how you think about testing dependencies?
- After generating a coverage report, what was one surprising line of code that wasn't being tested?
- What is the difference between `.toBe()` and `.toEqual()`?

Lesson 13 pushes into advanced patterns, combining everything you’ve learned.