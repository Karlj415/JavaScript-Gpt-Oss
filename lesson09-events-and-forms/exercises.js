/*
## Practice Drills
1. Build a button group where each button logs its label using event delegation.
2. Create a form that validates password strength in real-time (length, numbers, symbols).
3. Implement a keyboard shortcut (`Alt + N`) that focuses the name input field.
*/

/*
## Project: Enrollment Form Experience

**Objective:** Develop `enrollment.js` for a course enrollment page that provides a complete, accessible, and performant form experience.

**Instructions:**
1.  **HTML Setup:** Create an `index.html` with a form containing fields for `name`, `email`, and `course_track` (a `<select>` element). Include empty `<div>` elements next to each field for error messages and an `<div id="summary" role="status" aria-live="polite"></div>` for success messages.
2.  **Real-time Validation:**
    -   Add an `input` event listener to the email field.
    -   **Debounce** the event handler function. Inside the handler, check if the email is valid. If not, display an error message in the corresponding error `div`.
3.  **Form Submission:**
    -   Add a `submit` event listener to the form.
    -   Call `event.preventDefault()`.
    -   Perform final validation on all fields.
    -   If there are errors, display them and stop.
    -   If validation passes, clear any existing errors, display a success message in the `#summary` div, and reset the form.
4.  **Event Delegation for FAQ:**
    -   Add a simple FAQ section to your HTML with several question/answer pairs (e.g., using `<details>` and `<summary>` or simple `divs`).
    -   Add a single `click` listener to the parent container of the FAQs.
    -   When a question is clicked, toggle the visibility of its answer.
5.  **Accessibility:**
    -   Ensure all form fields have associated `<label>`s.
    -   When a validation error appears, make sure it is programmatically associated with the input (e.g., using `aria-describedby`).
    -   Ensure the success message is announced by screen readers by using the `aria-live` region.
*/

// --- Starter HTML (index.html) ---
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enrollment Form</title>
</head>
<body>
  <h1>Course Enrollment</h1>
  <form id="enrollment-form" novalidate>
    <div>
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required>
      <div class="error-message"></div>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <div class="error-message"></div>
    </div>
    <div>
      <label for="course_track">Select Track:</label>
      <select id="course_track" name="course_track">
        <option value="frontend">Frontend Development</option>
        <option value="backend">Backend Development</option>
        <option value="fullstack">Full-Stack Development</option>
      </select>
    </div>
    <button type="submit">Enroll</button>
  </form>
  <div id="summary" role="status" aria-live="polite"></div>

  <h2>Frequently Asked Questions</h2>
  <div id="faq-section">
    <div class="faq-item">
      <h4>What are the prerequisites?</h4>
      <p style="display: none;">Basic HTML and CSS knowledge is recommended.</p>
    </div>
    <div class="faq-item">
      <h4>Can I switch tracks later?</h4>
      <p style="display: none;">Yes, you can switch tracks within the first two weeks.</p>
    </div>
  </div>

  <script src="enrollment.js"></script>
</body>
</html>
*/

// --- Starter JavaScript (enrollment.js) ---

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#enrollment-form');
  const faqSection = document.querySelector('#faq-section');

  // TODO: Implement debounced real-time validation for the email field.

  // TODO: Implement form submission handling.
  form.addEventListener('submit', event => {
    event.preventDefault();
    // 1. Clear all previous errors.
    // 2. Validate name (e.g., not empty).
    // 3. Validate email (e.g., includes '@').
    // 4. If errors, display them.
    // 5. If no errors, show success message and reset form.
  });

  // TODO: Implement event delegation for the FAQ section.
  faqSection.addEventListener('click', event => {
    // Check if a question (e.g., an h4) was clicked.
    // If so, find the corresponding answer (<p>) and toggle its display style.
  });
});
