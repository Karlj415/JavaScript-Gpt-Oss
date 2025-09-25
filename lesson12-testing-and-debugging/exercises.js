/*
## Practice Drills
1. Write tests for a `slugify` utility that converts a string like "Hello World" into "hello-world". Test edge cases like extra spaces, and non-alphanumeric characters.
2. Use the debugger to trace a recursive function (like factorial or fibonacci). Set a breakpoint and watch how the call stack grows and shrinks.
3. Set up a watch mode test run (`npm run test:watch`) and practice test-driven development on a small function of your choice.
*/

/*
## Project: Analytics Calculator with TDD

**Objective:** Develop a utility library `analytics.js` for calculating common statistics, using a strict Test-Driven Development (TDD) workflow.

**Instructions:**
For each function (`mean`, `median`, `mode`), follow the Red-Green-Refactor cycle:
1.  **Red:** Write a test for a simple case. Run `npm test` and watch it fail.
2.  **Green:** Write the absolute minimum amount of code in `analytics.js` to make the test pass.
3.  **Refactor:** Clean up your implementation code without breaking the test.
4.  **Repeat:** Add more tests for edge cases (empty arrays, arrays with one element, arrays with even/odd numbers of elements, negative values) and repeat the cycle.

**Functions to Implement:**
- `mean(numbers)`: Calculates the average.
- `median(numbers)`: Finds the middle value. For an even number of elements, it should be the average of the two middle elements.
- `mode(numbers)`: Finds the most frequent value. Can return an array if there are multiple modes.
- `fetchAnalyticsConfig()`: An **asynchronous** function that fetches a configuration object. You will need to **mock** the `fetch` call for this test.
*/

// --- Starter File (analytics.js) ---
/*
export function mean(numbers) {
  // TODO: Implement
  return 0;
}

export function median(numbers) {
  // TODO: Implement
  return 0;
}

export function mode(numbers) {
  // TODO: Implement
  return [];
}

export async function fetchAnalyticsConfig() {
  // TODO: Implement
  const response = await fetch('https://api.example.com/config');
  return response.json();
}
*/

// --- Starter Test File (analytics.test.js) ---
/*
import { describe, it, expect, vi } from 'vitest';
import { mean, median, mode, fetchAnalyticsConfig } from './analytics.js';

describe('Analytics Library', () => {
  describe('mean', () => {
    it('should calculate the mean of an array of numbers', () => {
      // Red: This test will fail initially
      expect(mean([1, 2, 3, 4, 5])).toBe(3);
    });

    // TODO: Add tests for edge cases (empty array, etc.)
  });

  describe('median', () => {
    // TODO: Write a failing test for median
  });

  describe('mode', () => {
    // TODO: Write a failing test for mode
  });

  describe('fetchAnalyticsConfig', () => {
    // TODO: Write a test for the async function.
    // 1. Mock the global `fetch` function using `vi.fn()`.
    // 2. Use `.mockResolvedValue()` to simulate a successful API response.
    // 3. `await` the call to `fetchAnalyticsConfig()`.
    // 4. Assert that the result equals your mocked data.
  });
});
*/
