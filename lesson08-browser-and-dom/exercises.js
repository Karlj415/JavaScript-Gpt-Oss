/*
## Practice Drills
1.  Build a mini dashboard (HTML + JS) that dynamically renders a list of lessons from an array of objects.
2.  Implement tabbed navigation: clicking a tab shows its associated content and hides others.
3.  Create a "To-Do" list. Use a `DocumentFragment` to add multiple initial to-do items at once.
*/

/*
## Project: Interactive Course Catalog

**Objective:** Construct an HTML page with `catalog.js` that fetches course data and renders it dynamically, allowing for filtering and interaction.

**Instructions:**
1.  **HTML Setup:** Create an `index.html` file with a basic structure. Include a `<div id="catalog-container"></div>` where the course cards will be rendered, and a `<div id="filter-controls"></div>` for filter buttons.
2.  **Data:** Create a `courses.json` file with an array of course objects. Each object should have properties like `title`, `difficulty` (e.g., 'Beginner', 'Advanced'), and `description`.
3.  **JavaScript (`catalog.js`):
    -   **Fetch Data:** Use the `fetch` API with `async/await` to load the `courses.json` file.
    -   **Render Cards:** Write a function `renderCourses(courses)` that takes an array of course objects.
        -   Inside, loop through the courses.
        -   For each course, create a DOM element (e.g., an `<article>`) and populate it with the course data.
        -   **Performance:** Use a `DocumentFragment` to build all the card elements in memory before appending the fragment to the `#catalog-container` in a single DOM operation.
    -   **Filtering:**
        -   Create filter buttons dynamically based on the course difficulties (e.g., 'All', 'Beginner', 'Advanced').
        -   Add an event listener to the `#filter-controls` container (using event delegation).
        -   When a filter button is clicked, filter the original course data and call `renderCourses` with the filtered list.
    -   **Favorites:**
        -   Add a "Favorite" button to each course card.
        -   Use a `data-course-id` attribute on the card or button.
        -   When the button is clicked, toggle a `.is-favorite` class on the card element to change its appearance (e.g., add a border or a star icon).
*/

// --- Starter HTML (index.html) ---
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Catalog</title>
  <style>
    .course-card { border: 1px solid #ccc; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .course-card.is-favorite { border-color: gold; border-width: 2px; }
  </style>
</head>
<body>
  <h1>Course Catalog</h1>
  <div id="filter-controls"></div>
  <main id="catalog-container"></main>
  <script src="catalog.js"></script>
</body>
</html>
*/

// --- Starter JSON (courses.json) ---
/*
[
  {
    "id": 1,
    "title": "JavaScript Basics",
    "difficulty": "Beginner",
    "description": "A great starting point for your JavaScript journey."
  },
  {
    "id": 2,
    "title": "Advanced CSS",
    "difficulty": "Intermediate",
    "description": "Master selectors, layouts, and animations."
  },
  {
    "id": 3,
    "title": "Node.js for Experts",
    "difficulty": "Advanced",
    "description": "Build scalable, high-performance backend services."
  }
]
*/

// --- Starter JavaScript (catalog.js) ---

document.addEventListener('DOMContentLoaded', () => {
  const catalogContainer = document.querySelector('#catalog-container');
  const filterControls = document.querySelector('#filter-controls');
  let allCourses = []; // To store the original full list of courses

  async function fetchCourses() {
    try {
      // TODO: Fetch the courses.json file
      // TODO: Parse the response as JSON
      // TODO: Store the courses in the `allCourses` variable
      // TODO: Call renderCourses with the full list
      // TODO: Call createFilterControls
    } catch (error) {
      console.error("Failed to load courses:", error);
      catalogContainer.textContent = "Failed to load courses.";
    }
  }

  function renderCourses(courses) {
    catalogContainer.innerHTML = ''; // Clear existing courses
    // TODO: Create a DocumentFragment
    // TODO: Loop over the `courses` array
    // TODO: For each course, create a card element and populate it
    // TODO: Append the fragment to the catalogContainer
  }

  function createFilterControls() {
    // TODO: Get unique difficulties from the `allCourses` array
    // TODO: Create an 'All' button plus a button for each unique difficulty
    // TODO: Append the buttons to the `filterControls` div
  }

  // TODO: Add a click event listener to `filterControls` using event delegation
  // When a button is clicked, get its text content (e.g., 'Beginner')
  // Filter the `allCourses` array based on the difficulty
  // Call `renderCourses` with the filtered list

  fetchCourses();
});
