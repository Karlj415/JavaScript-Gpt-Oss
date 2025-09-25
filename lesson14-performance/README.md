# Lesson 14 · Performance

Today I’ll teach you how to measure, analyze, and optimize JavaScript performance. We’ll explore algorithmic complexity, browser profiling, memory management, and the modern patterns and APIs for shipping fast, responsive experiences.

## Objectives
- Analyze algorithmic complexity using Big-O notation.
- Profile CPU and memory usage in Chrome DevTools.
- Apply advanced rendering optimizations like virtualization and offloading work to Web Workers.
- Implement modern image optimization and caching strategies.
- Use the Performance API for high-precision measurements.

## Lesson Narrative

### 1. Algorithmic Performance (Big-O Notation)
Before optimizing code, analyze your algorithm. Big-O notation describes how runtime scales with input size (`n`).
- `O(1)` (Constant): Accessing an array element by index.
- `O(log n)` (Logarithmic): Binary search.
- `O(n)` (Linear): Looping through an array once.
- `O(n^2)` (Quadratic): A nested loop over the same collection.

Choosing a `Map` (`O(1)` lookup) over an `Array.find()` (`O(n)`) for frequent lookups is a classic algorithmic optimization.

### 2. Browser Rendering Performance

#### The Rendering Pipeline
Understand the steps: **JavaScript → Style → Layout → Paint → Composite**. Your goal is to avoid triggering this pipeline unnecessarily.

- **Layout Thrashing:** A common performance killer. It happens when you alternate between writing to the DOM (e.g., changing a style) and reading from it (e.g., getting `element.offsetHeight`). This forces the browser to recalculate the layout repeatedly.
- **Solution:** Batch your DOM reads first, then batch your DOM writes.

#### List Virtualization (Windowing)
Rendering thousands of DOM nodes is slow. Virtualization is a pattern where you only render the items that are currently visible in the viewport. As the user scrolls, you recycle the DOM nodes and replace their content. This is essential for long lists.
- **Implementation:** This is complex to build from scratch. Use battle-tested libraries like [TanStack Virtual](https://tanstack.com/virtual/v3) or [React Virtualized](https://github.com/bvaughn/react-virtualized).

### 3. Offloading Work with Web Workers
If you have a CPU-intensive task (e.g., complex calculations, data processing), it will block the main thread and freeze the UI. A **Web Worker** runs a script in a background thread, allowing you to offload this work.

`main.js`
```javascript
const worker = new Worker('./heavy-task.js');
// Send data to the worker
worker.postMessage({ numbers: [1, 2, 3, /* ... */] });

// Receive the result back
worker.onmessage = (event) => {
  console.log("Result from worker:", event.data);
};
```
`heavy-task.js`
```javascript
// This runs in a separate thread
self.onmessage = (event) => {
  const result = event.data.numbers.reduce((acc, n) => acc + n, 0);
  // Post the result back to the main thread
  self.postMessage(result);
};
```

### 4. Network and Asset Optimization

#### Modern Image Optimization
- **Formats:** Use next-gen formats like **WebP** or **AVIF**, which offer better compression than JPEG/PNG.
- **Responsive Images:** Use the `<picture>` element or the `srcset` attribute to serve different image sizes for different screen resolutions.
- **Lazy Loading:** Defer loading off-screen images. Modern browsers support this natively: `<img src="..." loading="lazy">`.

#### Caching Strategies
- **Browser Cache:** Configure your server to send correct `Cache-Control` HTTP headers. This tells the browser how long it can reuse an asset without re-requesting it.
- **Service Workers:** A programmable proxy that can intercept network requests. It allows for offline support and fine-grained caching strategies.
- **Application Cache:** Use techniques like memoization to cache the results of expensive function calls or API responses in memory.

#### Bundle Optimization
- **Code Splitting:** Use dynamic `import()` to split your code into smaller chunks that are loaded on demand.
- **Tree Shaking:** A process where your bundler (like Vite or Webpack) analyzes your static `import`/`export` statements and eliminates any code from your dependencies that you don't actually use.

### 5. High-Precision Measurement
While `console.time` is useful, the **Performance API** is the standard for accurate measurements.

```javascript
// performance-api.js
const startTime = performance.now();

// ... run some expensive code ...

const endTime = performance.now();
console.log(`The operation took ${endTime - startTime} milliseconds.`);

// You can also create custom marks for the DevTools timeline
performance.mark('start-processing');
// ... code ...
performance.mark('end-processing');
performance.measure('Processing Time', 'start-processing', 'end-processing');
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Hacking Web Performance (freeCodeCamp.org)](https://www.youtube.com/watch?v=UgSFxtIPc4c)
- [Optimizing the Critical Rendering Path (Google I/O)](https://www.youtube.com/watch?v=PkOBnYxqj3k)

## References
- Web.dev: [Measure Performance](https://web.dev/measure/)
- MDN: [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- MDN: [Image file type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)

## Reflection
- Which optimization delivered the biggest gain, and why?
- When would you use a Web Worker instead of a simple `async` function?
- How does layout thrashing differ from a long-running JavaScript task?

Lesson 15 shifts to building scalable JavaScript architectures.