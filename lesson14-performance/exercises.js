/*
## Practice Drills
1. Analyze the Big-O complexity of the following functions:
   - A function that finds a user in an array of objects by their ID.
   - A function that checks if any two numbers in an array sum to zero (using a nested loop).
   - Can you optimize the second function to be better than O(n^2)? (Hint: Use a Set for O(1) lookups).

2. Profile a sample app that renders thousands of DOM nodes (you can create one with a simple loop). Use the DevTools Performance tab to identify the bottleneck and then refactor it to use a `DocumentFragment` to see the improvement.

3. Run `npm run build` on a Vite project and inspect the bundle output. If you have a large library, try using a dynamic `import()` to split it into a separate chunk and observe the change in the build output.
*/

/*
## Project: Performance Audit Report

**Objective:** Pick an existing project (the Interactive Course Catalog from Lesson 08 is a good candidate) and perform a thorough performance audit, implementing and measuring several optimizations.

**Instructions:**
1.  **Establish a Baseline:**
    -   Before making any changes, measure the current performance. Use the DevTools Performance and Network tabs.
    -   **Measure:** Time to Interactive (TTI), Largest Contentful Paint (LCP), total bundle size, and number of network requests.
    -   Use `performance.now()` to measure the execution time of your main `renderCourses` function.
    -   Record these baseline metrics in a new `performance-report.md` file.

2.  **Implement Optimizations (Choose at least 3):**
    -   **Algorithmic:** If you have any `O(n^2)` loops (like finding related data), refactor them to be more efficient, perhaps by creating a `Map` for `O(1)` lookups first.
    -   **Rendering:** If your project renders a long list, replace the simple loop with a virtualization library like [TanStack Virtual](https://tanstack.com/virtual/v3). This is a major but highly impactful change.
    -   **Network:** If your project has images, convert them to a modern format like WebP, use `loading="lazy"`, and implement responsive sizes with `srcset`.
    -   **Computation:** If you have a complex data-processing step (e.g., calculating statistics across all courses), offload it to a **Web Worker** so it doesn't block the main thread.
    -   **Code Splitting:** If you have a large dependency that's only used for a specific feature (e.g., a charting library for a stats modal), load it on demand with a dynamic `import()`.

3.  **Measure After Optimizations:**
    -   Re-run all your measurements from Step 1.
    -   Update your `performance-report.md` with a "before" and "after" comparison table.
    -   In the report, write a summary explaining *why* each optimization worked and which one had the most significant impact.

This project mirrors the real-world workflow of a performance-focused engineer: establish a baseline, form a hypothesis, implement a change, and measure the result.
*/
