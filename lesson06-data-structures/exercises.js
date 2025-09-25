/*
## Practice Drills
1.  Given an array of user objects, use chaining to first `filter` for users who are active, then `map` to get an array of just their names.
2.  Use `Object.entries` and `reduce` to convert an object into a `Map`.
3.  Write a function that takes a user object. Use optional chaining (`?.`) to safely return the user's zip code (`user.address.zipCode`) or `undefined` if it doesn't exist.
4.  Use a `Set` to find the number of unique characters in a string.
*/

/*
## Project: Student Progress Dashboard
Create `student-dashboard.js` that:
- Maintains an array of student objects. Ensure some students are missing data (e.g., no `scores` array) to practice safe access.
- Provides functions to calculate class average, top performers, etc. **Use immutable patterns**—these functions should return new data, not modify the original array.
- Use `map`, `filter`, and `reduce` (chained where possible).
- Use `??` to provide default values for missing student properties (e.g., `student.name ?? 'Unknown Student'`).
- The final output should be a summary object, which you then `JSON.stringify` to simulate sending a report to a server.
*/

// --- Starter Data for the Project ---

const students = [
  {
    id: 1,
    name: "Alice",
    modulesCompleted: ["Basics", "Control Flow"],
    scores: [85, 92, 88],
    isActive: true,
  },
  {
    id: 2,
    name: "Bob",
    modulesCompleted: ["Basics"],
    scores: [70, 81],
    isActive: false,
  },
  {
    id: 3,
    name: null, // Missing name
    modulesCompleted: ["Basics", "Control Flow", "Functions"],
    scores: [95, 98, 100],
    isActive: true,
  },
  {
    id: 4,
    name: "Charlie",
    modulesCompleted: ["Basics", "Control Flow", "Functions", "DOM"],
    // Missing scores array
    isActive: true,
  },
];

// --- Functions to Implement ---

function getClassAverage(studentList) {
  // TODO: Calculate the average score of all students combined.
  // Hint: You'll need to handle students with no scores.
  // Use reduce to flatten all scores into a single array, then calculate the average.
  return 0; // Placeholder
}

function getTopPerformers(studentList, threshold) {
  // TODO: Return an array of names of students whose average score is above a certain threshold.
  // Hint: You'll need a helper function to calculate a single student's average.
  return []; // Placeholder
}

function getStudentsNeedingSupport(studentList, threshold) {
  // TODO: Return an array of names of students whose average score is below a certain threshold.
  return []; // Placeholder
}

function generateDashboardReport(studentList) {
  // TODO: Use the functions above to generate a summary object.
  const report = {
    classAverage: getClassAverage(studentList),
    topPerformers: getTopPerformers(studentList, 90),
    needsSupport: getStudentsNeedingSupport(studentList, 75),
    // Add more stats as you see fit!
  };

  // TODO: Convert the report object to a JSON string.
  return JSON.stringify(report, null, 2); // The `null, 2` part formats the JSON nicely.
}

// --- Running the code ---

const reportJSON = generateDashboardReport(students);
console.log("--- Student Dashboard Report ---");
console.log(reportJSON);
console.log("--------------------------------");
