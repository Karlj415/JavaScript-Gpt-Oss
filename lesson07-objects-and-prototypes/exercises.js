/*
## Practice Drills
1.  Create a `Timer` class with a private `#startTime` field. Add `start()` and `stop()` methods. Include a getter `get duration()` that calculates the elapsed time.
2.  Create two classes, `User` and `Admin`, where `Admin` extends `User`. The `Admin` class should have an extra method like `deleteUser()`. Practice calling `super()` in the `Admin` constructor.
3.  Take the `introduce` function from the `bind`/`call` example in the README and use `.bind()` to create a specific `sayHelloToBob` function where the greeting is always "Hello" and the context is always `{ name: "Bob" }`.
*/

/*
## Project: Course Management Library
Develop `course-manager.js` exporting a `Course` class and a `Cohort` class.
- `Course` should use a **private field (`#`)** to store a list of cohorts.
- `Cohort` should track students, start date, and capacity. Use a **getter** `isFull` that returns `true` if the number of students has reached capacity.
- `Course` should have a **static method** `Course.fromTemplate(templateName)` that creates a pre-configured course (e.g., `"bootcamp"` or `"workshop"`).
- Demonstrate inheritance by creating a `PremiumCohort` that extends `Cohort` and includes a `mentor` property.
*/

// --- Starter Code for the Project ---

class Cohort {
  // TODO: Add a constructor to initialize students (as an array), startDate, and capacity.

  // TODO: Add a getter `isFull` that returns true if the number of students has reached capacity.

  // TODO: Add a method to add a student.

  // TODO: Add a method to remove a student.
}

class PremiumCohort extends Cohort {
  // TODO: Add a constructor that takes a mentor name in addition to the regular Cohort properties.
  // Use `super()` to call the parent constructor.
}

export class Course {
  // TODO: Use a private field for the cohorts array.

  // TODO: Add a constructor to initialize title and description.

  // TODO: Add a static method `fromTemplate` that returns a new Course instance based on a template name.

  // TODO: Add a method to add a cohort.

  // TODO: Add a method to get all cohorts.
}

// --- Example Usage ---
/*
const webDev = Course.fromTemplate("bootcamp");
const fallCohort = new Cohort([], new Date('2025-09-01'), 20);
const premiumFallCohort = new PremiumCohort([], new Date('2025-09-01'), 15, "Alice");

webDev.addCohort(fallCohort);
webDev.addCohort(premiumFallCohort);

console.log(webDev.getCohorts());
*/
