// ===================================================================
// 🧪 TESTING & DEBUGGING PRACTICE EXERCISES
// ===================================================================

/*
🎯 WARM-UP DRILLS (Start Here!)

These exercises will build your testing and debugging confidence step by step.
Don't skip these - they're designed to build muscle memory!

⏰ Time Estimate: 45-60 minutes
🎮 Difficulty: Beginner → Intermediate

📝 Instructions:
1. Read each exercise completely before starting
2. Follow the AAA pattern (Arrange, Act, Assert)
3. Make sure tests fail first, then make them pass
4. Use console.log liberally while learning
5. Don't worry about perfect code - focus on learning!
*/

// ===================================================================
// 🥇 EXERCISE 1: Testing a Slugify Function (20 minutes)
// ===================================================================

/*
🎯 GOAL: Master basic testing patterns with a real-world utility function

A "slug" is a URL-friendly version of a string:
"Hello World!" → "hello-world"
"My Awesome Post #1" → "my-awesome-post-1"

📋 YOUR TASKS:
1. Create slugify.js with the function
2. Create slugify.test.js with comprehensive tests
3. Test normal cases, edge cases, and error cases
4. Run tests and make them pass!

💡 HINTS:
- Start with the simplest test case
- Think about what could go wrong
- What happens with empty strings? Numbers? Special characters?
*/

// 🏁 STARTER CODE for slugify.js:
/*
export function slugify(text) {
  // TODO: Implement this function
  // Convert "Hello World!" to "hello-world"
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric except spaces
    .replace(/\s+/g, '-')         // Replace spaces with dashes
    .replace(/^-+|-+$/g, '');     // Remove leading/trailing dashes
}
*/

// 🧪 EXAMPLE TESTS to get you started:
/*
import { describe, it, expect } from 'vitest';
import { slugify } from './slugify.js';

describe('slugify function', () => {
  it('should convert simple text to lowercase with dashes', () => {
    // 🥘 Arrange
    const input = 'Hello World';
    const expected = 'hello-world';
    
    // 👩‍🍳 Act
    const result = slugify(input);
    
    // 👩‍⚖️ Assert
    expect(result).toBe(expected);
  });
  
  it('should handle extra spaces correctly', () => {
    expect(slugify('  Hello    World  ')).toBe('hello-world');
  });
  
  it('should remove special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
  
  it('should handle empty strings', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });
  
  it('should throw error for non-string input', () => {
    expect(() => slugify(123)).toThrow('Input must be a string');
    expect(() => slugify(null)).toThrow('Input must be a string');
    expect(() => slugify(undefined)).toThrow('Input must be a string');
  });
  
  // 💪 CHALLENGE: Add more test cases!
  // - What about numbers mixed with text?
  // - Unicode characters?
  // - Very long strings?
  // - Strings with only special characters?
});
*/

// ===================================================================
// 🔍 EXERCISE 2: Debugging Detective Work (25 minutes)
// ===================================================================

/*
🎯 GOAL: Practice systematic debugging with a broken function

🐛 THE MYSTERY: The calculateGrade function below has several bugs!
Your job is to find and fix them using proper debugging techniques.

📋 YOUR DETECTIVE PROCESS:
1. Read the function and try to understand what it should do
2. Run it with different inputs and observe the problems
3. Use console.log to trace the execution
4. Set breakpoints (or use debugger;) to inspect variables
5. Form theories about what's wrong
6. Fix one bug at a time
7. Test your fixes

💡 DEBUGGING TIPS:
- Don't change multiple things at once
- Add console.log statements to see variable values
- Test edge cases (0, negative numbers, very high scores)
- Read error messages carefully
*/

// 🐛 BROKEN FUNCTION (copy this to a new file to debug):
/*
function calculateGrade(scores) {
  console.log('🚀 Starting calculateGrade with:', scores);
  
  // Calculate average
  let total = 0;
  for (let i = 0; i <= scores.length; i++) { // 🐛 Bug #1: Off-by-one error
    console.log('Adding score at index', i, ':', scores[i]);
    total += scores[i];
  }
  
  let average = total / scores.length;
  console.log('📊 Average calculated:', average);
  
  // Determine letter grade
  let grade;
  if (average >= 90) {
    grade = 'A';
  } else if (average >= 80) {
    grade = 'B';
  } else if (average >= 70) {
    grade = 'C';
  } else if (average >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }
  
  console.log('📝 Final grade:', grade);
  
  return {
    average: average,
    grade: grade,
    total: total,
    count: scores.length
  };
}

// 🧪 Test cases to help you debug:
console.log('Test 1:', calculateGrade([90, 85, 95])); // Should be A
console.log('Test 2:', calculateGrade([70, 75, 72])); // Should be C  
console.log('Test 3:', calculateGrade([100]));        // Should be A
console.log('Test 4:', calculateGrade([]));           // What should happen here?
*/

// ===================================================================
// 🔄 EXERCISE 3: Test-Driven Development Practice (20 minutes)
// ===================================================================

/*
🎯 GOAL: Experience the TDD (Test-Driven Development) workflow

TDD Process (Red-Green-Refactor):
🔴 RED: Write a failing test first
🟢 GREEN: Write minimal code to make it pass
🔵 REFACTOR: Clean up the code while keeping tests passing

📋 YOUR TDD MISSION:
Build a simple password validator using TDD

Password Requirements:
- At least 8 characters long
- Contains at least one uppercase letter
- Contains at least one lowercase letter  
- Contains at least one number
- Contains at least one special character (!@#$%^&*)

🏁 TDD WORKFLOW:
1. Write ONE failing test
2. Run the test (should fail)
3. Write minimal code to pass that test
4. Run the test (should pass)
5. Repeat for next requirement
*/

// 🧪 EXAMPLE TDD PROGRESSION:
/*
// Step 1: First failing test
import { describe, it, expect } from 'vitest';
import { isValidPassword } from './password-validator.js';

describe('Password Validator TDD', () => {
  it('should return false for passwords shorter than 8 characters', () => {
    expect(isValidPassword('short')).toBe(false);
  });
});

// Step 2: Minimal implementation to pass
export function isValidPassword(password) {
  return password.length >= 8;
}

// Step 3: Add next failing test
it('should return false for passwords without uppercase letter', () => {
  expect(isValidPassword('alllowercase123!')).toBe(false);
});

// Step 4: Update implementation
export function isValidPassword(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  return true;
}

// Continue this process for all requirements!
*/


// ===================================================================
// 🏗️ MAIN PROJECT: Statistics Calculator with TDD
// ===================================================================

/*
🎯 PROJECT GOAL: Build a professional statistics library using Test-Driven Development

🌟 WHY THIS PROJECT ROCKS:
- Learn TDD the right way (tests first!)
- Practice async testing with mocks
- Build something actually useful
- Experience real-world development workflow

⏰ Time Estimate: 2-3 hours (take breaks!)
🎮 Difficulty: Intermediate
🏆 Success Criteria: All tests pass, code is clean, functions handle edge cases

📋 FUNCTIONS TO BUILD:
1. mean(numbers) - Calculate average
2. median(numbers) - Find middle value
3. mode(numbers) - Find most frequent value(s)
4. fetchAnalyticsConfig() - Async function with API call

🔄 TDD PROCESS FOR EACH FUNCTION:
🔴 RED: Write a failing test
🟢 GREEN: Write minimal code to pass
🔵 REFACTOR: Clean up while keeping tests green
🔁 REPEAT: Add more complex test cases

💡 PRO TIPS:
- Start with the simplest possible test case
- Don't overthink the first implementation
- Focus on making tests pass, then improve
- Edge cases: empty arrays, single values, negative numbers
- Use descriptive test names that explain the behavior
*/

// ===================================================================
// 📁 FILE STRUCTURE YOU'LL CREATE
// ===================================================================

/*
Your project should have these files:

📁 analytics-project/
├── 📄 analytics.js         (your main functions)
├── 📄 analytics.test.js    (your tests) 
├── 📄 package.json         (with vitest scripts)
└── 📁 coverage/            (generated by npm run coverage)

🚀 QUICK SETUP:
1. mkdir analytics-project
2. cd analytics-project  
3. npm init -y
4. npm install --save-dev vitest @vitest/ui
5. Add test scripts to package.json
6. Create analytics.js and analytics.test.js
*/

// ===================================================================
// 📋 STARTER CODE: analytics.js
// ===================================================================

/*
🚀 COPY THIS to create your analytics.js file:

// analytics.js
export function mean(numbers) {
  // TODO: Calculate the average of an array of numbers
  // Example: mean([1, 2, 3, 4, 5]) should return 3
  // Edge cases to consider:
  // - Empty array: should throw error or return null?
  // - Single number: should return that number
  // - Negative numbers: should work normally
  // - Non-numbers in array: should throw error?
  
  return 0; // Start with this failing implementation
}

export function median(numbers) {
  // TODO: Find the middle value when numbers are sorted
  // Examples:
  // - median([1, 2, 3]) should return 2
  // - median([1, 2, 3, 4]) should return 2.5 (average of 2 and 3)
  // - median([3, 1, 2]) should return 2 (after sorting)
  // Edge cases:
  // - Empty array: should throw error or return null?
  // - Single number: should return that number
  
  return 0; // Start with this failing implementation
}

export function mode(numbers) {
  // TODO: Find the most frequently occurring number(s)
  // Examples:
  // - mode([1, 2, 2, 3]) should return [2]
  // - mode([1, 1, 2, 2, 3]) should return [1, 2] (tie)
  // - mode([1, 2, 3]) should return [] or [1,2,3]? (no mode)
  // Edge cases:
  // - Empty array: should return []
  // - All numbers appear once: what to return?
  
  return []; // Start with this failing implementation
}

export async function fetchAnalyticsConfig() {
  // TODO: Fetch configuration from an API
  // This function should:
  // 1. Make a GET request to 'https://api.analytics.com/config'
  // 2. Return the JSON response
  // 3. Handle errors appropriately
  // 4. Be testable with mocks!
  
  const response = await fetch('https://api.analytics.com/config');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}
*/

// ===================================================================
// 🧪 STARTER CODE: analytics.test.js  
// ===================================================================

/*
🚀 COPY THIS to create your analytics.test.js file:

// analytics.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mean, median, mode, fetchAnalyticsConfig } from './analytics.js';

// ===================================================================
// 🧮 MEAN FUNCTION TESTS
// ===================================================================

describe('Analytics Library', () => {
  describe('mean function', () => {
    // 🔴 RED: Start with this failing test
    it('should calculate the mean of positive numbers', () => {
      // 🥘 Arrange
      const numbers = [1, 2, 3, 4, 5];
      const expected = 3;
      
      // 👩‍🍳 Act
      const result = mean(numbers);
      
      // 👩‍⚖️ Assert
      expect(result).toBe(expected);
    });
    
    // 💪 Add these tests one by one (TDD style!):
    
    // it('should handle decimal numbers', () => {
    //   expect(mean([1.5, 2.5, 3.5])).toBe(2.5);
    // });
    
    // it('should handle negative numbers', () => {
    //   expect(mean([-1, 0, 1])).toBe(0);
    // });
    
    // it('should handle single number', () => {
    //   expect(mean([42])).toBe(42);
    // });
    
    // it('should throw error for empty array', () => {
    //   expect(() => mean([])).toThrow('Cannot calculate mean of empty array');
    // });
    
    // it('should throw error for non-array input', () => {
    //   expect(() => mean('not an array')).toThrow('Input must be an array');
    // });
  });
  
  // ===================================================================
  // 📊 MEDIAN FUNCTION TESTS
  // ===================================================================
  
  describe('median function', () => {
    // 🔴 RED: Write your first failing test here!
    
    // 💡 HINTS for test cases to add:
    // - Odd number of elements: [1, 2, 3] → 2
    // - Even number of elements: [1, 2, 3, 4] → 2.5
    // - Unsorted array: [3, 1, 2] → 2 (after sorting)
    // - Single element: [5] → 5
    // - Empty array: [] → should throw error
    // - Negative numbers: [-3, -1, -2] → -2
    
    // Example first test:
    // it('should find median of odd-length array', () => {
    //   expect(median([1, 2, 3])).toBe(2);
    // });
  });
  
  // ===================================================================
  // 📈 MODE FUNCTION TESTS
  // ===================================================================
  
  describe('mode function', () => {
    // 🔴 RED: Write your first failing test here!
    
    // 💡 HINTS for test cases to add:
    // - Single mode: [1, 2, 2, 3] → [2]
    // - Multiple modes: [1, 1, 2, 2, 3] → [1, 2]
    // - No clear mode: [1, 2, 3] → [] or [1,2,3]?
    // - Single element: [5] → [5]
    // - Empty array: [] → []
    
    // Example first test:
    // it('should find single mode', () => {
    //   expect(mode([1, 2, 2, 3])).toEqual([2]);
    // });
  });
  
  // ===================================================================
  // 🌐 ASYNC FUNCTION TESTS (with mocking!)
  // ===================================================================
  
  describe('fetchAnalyticsConfig function', () => {
    // 🎭 Set up mocking
    beforeEach(() => {
      // Reset mocks before each test
      vi.clearAllMocks();
    });
    
    // 🔴 RED: Start with this failing test
    it('should fetch and return config data', async () => {
      // 🥘 Arrange - Create fake fetch function
      const mockConfigData = {
        apiVersion: '1.0',
        maxDataPoints: 1000,
        defaultTimeRange: '30d'
      };
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockConfigData
      });
      
      // 👩‍🍳 Act
      const result = await fetchAnalyticsConfig();
      
      // 👩‍⚖️ Assert
      expect(result).toEqual(mockConfigData);
      expect(fetch).toHaveBeenCalledWith('https://api.analytics.com/config');
    });
    
    // 💪 Add these tests after the first one passes:
    
    // it('should handle API errors gracefully', async () => {
    //   global.fetch = vi.fn().mockResolvedValue({
    //     ok: false,
    //     status: 404
    //   });
    //   
    //   await expect(fetchAnalyticsConfig())
    //     .rejects.toThrow('HTTP error! status: 404');
    // });
    
    // it('should handle network errors', async () => {
    //   global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    //   
    //   await expect(fetchAnalyticsConfig())
    //     .rejects.toThrow('Network error');
    // });
  });
});

// ===================================================================
// 🎯 TDD WORKFLOW REMINDER:
// ===================================================================

/*
For each function, follow this process:

1. 🔴 RED Phase:
   - Write ONE failing test
   - Run: npm test
   - Verify it fails (and why)

2. 🟢 GREEN Phase:
   - Write MINIMAL code to make test pass
   - Run: npm test 
   - Verify it passes

3. 🔵 REFACTOR Phase:
   - Clean up code while keeping tests green
   - Run tests frequently
   - Don't break existing functionality

4. 🔁 REPEAT:
   - Add next test case
   - Follow RED-GREEN-REFACTOR again

💡 REMEMBER:
- Make tests fail first!
- Write minimal implementation
- Don't skip the refactor step
- Celebrate small wins! 🎉
*/

// ===================================================================
// 🏆 COMPLETION CHECKLIST
// ===================================================================

/*
✅ Check off each item as you complete it:

📊 MEAN FUNCTION:
- [ ] Basic calculation test (positive numbers)
- [ ] Decimal numbers test
- [ ] Negative numbers test
- [ ] Single number test
- [ ] Empty array error test
- [ ] Non-array input error test
- [ ] Implementation handles all test cases

📈 MEDIAN FUNCTION:
- [ ] Odd-length array test
- [ ] Even-length array test
- [ ] Unsorted array test
- [ ] Single element test
- [ ] Empty array error test
- [ ] Implementation handles all test cases

📊 MODE FUNCTION:
- [ ] Single mode test
- [ ] Multiple modes test
- [ ] No clear mode test
- [ ] Single element test
- [ ] Empty array test
- [ ] Implementation handles all test cases

🌐 ASYNC FUNCTION:
- [ ] Successful API call test
- [ ] API error handling test
- [ ] Network error handling test
- [ ] Proper mocking setup
- [ ] Implementation handles all test cases

🎯 OVERALL:
- [ ] All tests pass
- [ ] Code coverage > 80%
- [ ] No console.log statements left in final code
- [ ] Functions have proper error handling
- [ ] Code is clean and readable

🎉 BONUS CHALLENGES:
- [ ] Add JSDoc comments to functions
- [ ] Add input validation for all functions
- [ ] Write tests for invalid input types
- [ ] Achieve 100% code coverage
- [ ] Add performance tests for large arrays
*/
