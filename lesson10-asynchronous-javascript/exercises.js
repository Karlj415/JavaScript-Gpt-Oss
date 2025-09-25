/*
## Practice Drills
1.  Convert a callback-based function (e.g., `fs.readFile` in Node.js or a mock function) into a promise-based one.
2.  Fetch data from two different API endpoints in parallel using `Promise.all` and log the combined results.
3.  Use `Promise.allSettled` to fetch from three endpoints, where one is intentionally a bad URL. Log the status of each request (`fulfilled` or `rejected`).
*/

/*
## Project: Lesson Scheduler API Client

**Objective:** Create `scheduler.js` that fetches data from multiple mock API endpoints, handles loading and error states, and allows for request cancellation.

**Instructions:**
1.  **Mock API Setup:** You can use a local JSON server or just create local `.json` files (`lessons.json`, `instructors.json`) to be served.
2.  **Fetch Data:**
    -   Write an async function `fetchScheduleData()`.
    -   Inside, use `Promise.allSettled` to fetch both the lessons and instructors data in parallel.
    -   Check the `status` of each result from `allSettled`. If a request failed, log an error. If it succeeded, store its `value`.
3.  **Merge Data:**
    -   Once both requests have settled, if both were successful, write a function to merge the two datasets. For example, add the instructor's name to each lesson object based on `instructorId`.
4.  **Display States:**
    -   Before you start fetching, display a "Loading..." message on the page.
    -   If any fetch fails, display an appropriate error message.
    -   On success, render the merged schedule data to the DOM.
5.  **Abort Controller:**
    -   Create an `AbortController` instance before you start the fetches.
    -   Pass its `signal` to the `fetch` options: `fetch(url, { signal })`.
    -   Create a button on the page that, when clicked, calls `controller.abort()`.
    -   In your `catch` blocks, check for the `AbortError` so you can handle cancellation differently from other network errors.
*/

// --- Starter Code for the Project ---

// scheduler.js

document.addEventListener('DOMContentLoaded', () => {
  const statusDiv = document.querySelector('#status');
  const scheduleContainer = document.querySelector('#schedule');
  const abortButton = document.querySelector('#abort-btn');

  // 1. Create an AbortController
  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchScheduleData() {
    statusDiv.textContent = 'Loading...';
    try {
      // 2. Use Promise.allSettled to fetch from two endpoints
      // Example endpoints: './lessons.json', './instructors.json'
      const [lessonsResult, instructorsResult] = await Promise.allSettled([
        fetch('./lessons.json', { signal }),
        fetch('./instructors.json', { signal })
      ]);

      // 3. Check the results
      if (lessonsResult.status === 'rejected' || instructorsResult.status === 'rejected') {
        throw new Error('Failed to load schedule data.');
      }

      // 4. If successful, get the JSON data
      const lessons = await lessonsResult.value.json();
      const instructors = await instructorsResult.value.json();

      // 5. Merge the data
      const schedule = mergeData(lessons, instructors);

      // 6. Render the final schedule
      renderSchedule(schedule);
      statusDiv.textContent = 'Load complete.';

    } catch (error) {
      if (error.name === 'AbortError') {
        statusDiv.textContent = 'Fetch aborted by user.';
        console.log('Fetch aborted');
      } else {
        statusDiv.textContent = 'Error loading schedule.';
        console.error(error);
      }
    }
  }

  function mergeData(lessons, instructors) {
    // TODO: Create a map of instructors by their ID for easy lookup.
    // TODO: Use `.map()` on the lessons array. For each lesson, find the matching
    // instructor and return a new object with the lesson and instructor info combined.
    return lessons; // Placeholder
  }

  function renderSchedule(schedule) {
    // TODO: Render the schedule to the `scheduleContainer`.
    // You can create a list or a table.
    scheduleContainer.innerHTML = `<pre>${JSON.stringify(schedule, null, 2)}</pre>`; // Simple display
  }

  // 7. Add event listener for the abort button
  abortButton.addEventListener('click', () => {
    console.log('Aborting fetch...');
    controller.abort();
  });

  fetchScheduleData();
});
