/*
## Practice Drills
1.  Implement `repeat(fn, times)` that calls a function `fn` a certain number of `times`. `fn` should be a callback.
2.  Write `makeMultiplier(factor)` that uses closure to return a new function. The new function should take a number and multiply it by the original `factor`.
3.  Refactor a block of code that uses `if/else` to set a variable into a single line using a ternary operator and an arrow function.
*/

/*
## Project: Habit Tracker Engine
Build `habit-tracker.js` that:
- Exposes a function `createHabitTracker(habitName)` which returns an object of functions (an API): `{ logEntry, getStreak, reset }`.
- Uses **closure** to protect the internal state (e.g., an array of entry timestamps) inside `createHabitTracker`. This state should not be accessible from the outside.
- Use **arrow functions** for any internal callbacks you might need.
- Prints a summary when `getStreak` is called.
*/

// --- Starter Code for the Project ---

function createHabitTracker(habitName) {
  // Private state protected by the closure
  const entries = [];

  console.log(`Habit tracker for "${habitName}" created.`);

  const tracker = {
    logEntry: () => {
      // TODO: Add a new timestamp to the `entries` array.
      // A simple way is `entries.push(new Date());`
      console.log(`Entry logged for "${habitName}".`);
    },

    getStreak: () => {
      // TODO: Implement the logic to calculate the current streak.
      // This is the most challenging part!
      // You'll need to loop through the `entries` array and check if the dates are consecutive.
      // For now, you can just return the total number of entries.
      const streak = entries.length; // Placeholder
      console.log(`Current streak for "${habitName}": ${streak} days.`);
      return streak;
    },

    reset: () => {
      // TODO: Clear the `entries` array.
      entries.length = 0; // A simple way to clear the array
      console.log(`Habit "${habitName}" reset.`);
    },

    getEntries: () => {
      // Helper to see the internal state for debugging
      return [...entries];
    }
  };

  return tracker;
}

// --- Example Usage ---
const runningTracker = createHabitTracker("Morning Run");

runningTracker.logEntry();
runningTracker.logEntry();
runningTracker.getStreak(); // Should show a streak of 2

console.log("Entries:", runningTracker.getEntries());

runningTracker.reset();
runningTracker.getStreak(); // Should show a streak of 0
