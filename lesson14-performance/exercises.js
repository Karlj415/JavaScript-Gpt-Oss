// =================================================================
// ⚡ PERFORMANCE OPTIMIZATION - PRACTICE EXERCISES
// =================================================================

/*
🚀 WELCOME TO PERFORMANCE BOOTCAMP!

These exercises will transform you from someone who writes "code that works" 
to someone who writes "code that flies!" 

Each exercise builds real-world performance optimization skills.

⏰ Time Estimate: 60-90 minutes total
🎯 Goal: Master practical performance optimization techniques

🗺️ EXERCISE ROADMAP:
1. Algorithm Analysis & Optimization
2. DOM Performance Profiling
3. Bundle Analysis & Code Splitting

💡 TIP: Always measure BEFORE and AFTER optimizations!
*/

// =================================================================
// 🧠 EXERCISE 1: Algorithm Optimization Challenge (25 minutes)
// =================================================================

/*
🎯 GOAL: Learn to identify and fix performance bottlenecks in algorithms

You'll analyze Big-O complexity and transform slow algorithms into fast ones.
This is the #1 skill that separates junior from senior developers!

📋 YOUR TASKS:
1. Analyze the Big-O complexity of given functions
2. Identify the performance bottlenecks
3. Optimize the slow algorithms
4. Measure the performance improvement

🔍 WHAT YOU'LL LEARN: 
- How to think about algorithmic complexity
- When to use different data structures for performance
- How to measure and prove your optimizations work
*/

// Task 1A: Analyze this user finder function
function findUserById(users, targetId) {
  // 👀 Look at this function - what's its Big-O complexity?
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === targetId) {
      return users[i];
    }
  }
  return null;
}

// 🤔 ANALYSIS QUESTIONS:
// 1. What's the Big-O complexity? (Answer: O(n))
// 2. Best case scenario? (Answer: O(1) if item is first)
// 3. Worst case scenario? (Answer: O(n) if item is last or not found)
// 4. How could you make this faster for repeated searches?

// Task 1B: Optimize this slow function!
function findTwoNumbersThatSumToZero(numbers) {
  // 🐢 This is SLOW - O(n²) complexity!
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 0) {
        return [numbers[i], numbers[j]];
      }
    }
  }
  return null;
}

// 🚀 YOUR MISSION: Optimize this to O(n) using a Set
// HINT: For each number, check if its negative exists in the set
function findTwoNumbersThatSumToZeroOptimized(numbers) {
  const seen = new Set();
  
  for (const num of numbers) {
    const complement = -num; // The number we need to sum to zero
    
    if (seen.has(complement)) {
      return [complement, num];
    }
    
    seen.add(num);
  }
  
  return null;
}

// Task 1C: Performance Testing
function testAlgorithmPerformance() {
  // Create test data
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`
  }));
  
  const numbersArray = Array.from({ length: 5000 }, (_, i) => 
    Math.floor(Math.random() * 1000) - 500
  );
  numbersArray.push(100, -100); // Ensure there's a solution
  
  // Test user finding performance
  console.log('=== User Finding Performance Test ===');
  
  console.time('Linear Search (O(n))');
  findUserById(largeArray, 9999); // Worst case - last item
  console.timeEnd('Linear Search (O(n))');
  
  // Create optimized lookup
  console.time('Creating Map Lookup');
  const userMap = new Map(largeArray.map(user => [user.id, user]));
  console.timeEnd('Creating Map Lookup');
  
  console.time('Map Lookup (O(1))');
  userMap.get(9999);
  console.timeEnd('Map Lookup (O(1))');
  
  // Test sum finding performance
  console.log('\n=== Sum Finding Performance Test ===');
  
  console.time('Nested Loop Approach (O(n²))');
  findTwoNumbersThatSumToZero(numbersArray.slice(0, 1000)); // Smaller array for O(n²)
  console.timeEnd('Nested Loop Approach (O(n²))');
  
  console.time('Set-based Approach (O(n))');
  findTwoNumbersThatSumToZeroOptimized(numbersArray);
  console.timeEnd('Set-based Approach (O(n))');
  
  console.log('\n🏆 Notice how the optimized versions are much faster!');
}

// Uncomment to run the performance test
// testAlgorithmPerformance();

// =================================================================
// 🖥️ EXERCISE 2: DOM Performance Profiling (30 minutes)
// =================================================================

/*
🎯 GOAL: Learn to identify and fix DOM performance issues

You'll create a slow-rendering application, profile it with DevTools,
and then optimize it using best practices.

📋 YOUR TASKS:
1. Create an app that renders many DOM elements (slowly)
2. Profile it using Chrome DevTools Performance tab
3. Identify the bottlenecks
4. Optimize using DocumentFragment and batching
5. Measure the improvement

🔧 TOOLS YOU'LL USE:
- Chrome DevTools Performance tab
- console.time() for measurement
- DocumentFragment for optimization
*/

// Create a container for our performance test
function createPerformanceTestContainer() {
  const container = document.createElement('div');
  container.id = 'performance-test-container';
  container.style.cssText = `
    height: 300px;
    overflow-y: auto;
    border: 2px solid #ccc;
    padding: 10px;
    margin: 20px 0;
  `;
  document.body.appendChild(container);
  return container;
}

// 🐢 SLOW VERSION - Direct DOM manipulation
function renderItemsSlowly(container, items) {
  console.time('Slow Rendering');
  
  // Clear existing content
  container.innerHTML = '';
  
  // This is slow because it triggers layout recalculation for each item
  items.forEach((item, index) => {
    const element = document.createElement('div');
    element.style.cssText = `
      padding: 10px;
      margin: 5px 0;
      background: ${index % 2 === 0 ? '#f0f0f0' : '#e0e0e0'};
      border-radius: 4px;
    `;
    element.textContent = `Item ${item.id}: ${item.name} - ${item.description}`;
    
    // This causes a layout recalculation EVERY TIME
    container.appendChild(element);
    
    // Reading offsetHeight forces layout calculation
    if (index % 100 === 0) {
      console.log(`Rendered ${index + 1} items, container height: ${container.offsetHeight}px`);
    }
  });
  
  console.timeEnd('Slow Rendering');
}

// 🚀 FAST VERSION - Using DocumentFragment
function renderItemsFast(container, items) {
  console.time('Fast Rendering');
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create a DocumentFragment - doesn't cause layout recalculations
  const fragment = document.createDocumentFragment();
  
  items.forEach((item, index) => {
    const element = document.createElement('div');
    element.style.cssText = `
      padding: 10px;
      margin: 5px 0;
      background: ${index % 2 === 0 ? '#f0f0f0' : '#e0e0e0'};
      border-radius: 4px;
    `;
    element.textContent = `Item ${item.id}: ${item.name} - ${item.description}`;
    
    // Append to fragment (no DOM manipulation yet)
    fragment.appendChild(element);
  });
  
  // Single DOM operation - much faster!
  container.appendChild(fragment);
  
  console.timeEnd('Fast Rendering');
}

// Performance test runner
function runDOMPerformanceTest() {
  console.log('=== DOM Performance Test ===');
  
  // Generate test data
  const testItems = Array.from({ length: 2000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is the description for item number ${i}. It contains some text to make the rendering more realistic.`
  }));
  
  const container = createPerformanceTestContainer();
  
  // Add controls
  const controls = document.createElement('div');
  controls.innerHTML = `
    <button id="test-slow">Test Slow Rendering (2000 items)</button>
    <button id="test-fast">Test Fast Rendering (2000 items)</button>
    <button id="clear">Clear</button>
    <p>Open Chrome DevTools Performance tab and record while clicking these buttons!</p>
  `;
  container.parentNode.insertBefore(controls, container);
  
  // Add event listeners
  document.getElementById('test-slow').addEventListener('click', () => {
    renderItemsSlowly(container, testItems);
  });
  
  document.getElementById('test-fast').addEventListener('click', () => {
    renderItemsFast(container, testItems);
  });
  
  document.getElementById('clear').addEventListener('click', () => {
    container.innerHTML = '';
  });
  
  console.log('🔧 Instructions:');
  console.log('1. Open Chrome DevTools (F12)');
  console.log('2. Go to Performance tab');
  console.log('3. Click Record');
  console.log('4. Click "Test Slow Rendering" button');
  console.log('5. Stop recording and analyze the flame graph');
  console.log('6. Repeat with "Test Fast Rendering" and compare!');
}

// Uncomment to create the DOM performance test
// runDOMPerformanceTest();

// =================================================================
// 📦 EXERCISE 3: Bundle Analysis & Code Splitting (25 minutes)
// =================================================================

/*
🎯 GOAL: Learn to analyze and optimize JavaScript bundles

You'll examine bundle sizes, implement code splitting, and measure
the impact on loading performance.

📋 YOUR TASKS:
1. Analyze current bundle size
2. Implement dynamic imports for code splitting
3. Measure loading performance before/after
4. Create a performance budget checker

💡 NOTE: This exercise works best in a real project with bundling (Vite, Webpack, etc.)
*/

// Bundle analysis helper
class BundleAnalyzer {
  static measureBundleSize() {
    // Get all script tags
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    
    console.log('=== Bundle Analysis ===');
    
    scripts.forEach(async (script, index) => {
      const url = script.src;
      
      try {
        const response = await fetch(url);
        const text = await response.text();
        const sizeInBytes = new Blob([text]).size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        
        console.log(`Script ${index + 1}: ${sizeInKB}KB - ${url}`);
      } catch (error) {
        console.log(`Could not measure: ${url}`);
      }
    });
  }
  
  static async measureLoadTime(description, loadFunction) {
    console.time(`Loading: ${description}`);
    
    try {
      const result = await loadFunction();
      console.timeEnd(`Loading: ${description}`);
      return result;
    } catch (error) {
      console.timeEnd(`Loading: ${description}`);
      console.error(`Failed to load ${description}:`, error);
      throw error;
    }
  }
}

// Example: Dynamic import with performance measurement
class FeatureLoader {
  static async loadChartLibrary() {
    // Simulate loading a heavy charting library
    return BundleAnalyzer.measureLoadTime('Chart Library', async () => {
      // In a real app, this would be: import('chart.js') or similar
      // For demo purposes, we'll simulate with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        name: 'Chart.js',
        size: '60KB',
        createChart: (data) => console.log('Chart created with data:', data)
      };
    });
  }
  
  static async loadAnalyticsLibrary() {
    return BundleAnalyzer.measureLoadTime('Analytics Library', async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        name: 'Analytics.js',
        size: '25KB',
        track: (event) => console.log('Event tracked:', event)
      };
    });
  }
}

// Performance budget checker
class PerformanceBudget {
  constructor() {
    this.budgets = {
      'total-bundle-size': 250, // KB
      'initial-load-time': 3000, // ms
      'feature-load-time': 1000, // ms
    };
  }
  
  checkBudget(metric, value, unit = 'ms') {
    const budget = this.budgets[metric];
    const isWithinBudget = value <= budget;
    const percentage = ((value / budget) * 100).toFixed(1);
    
    const status = isWithinBudget ? '✅' : '❌';
    const color = isWithinBudget ? 'color: green' : 'color: red';
    
    console.log(
      `%c${status} ${metric}: ${value}${unit} (${percentage}% of ${budget}${unit} budget)`,
      color
    );
    
    return isWithinBudget;
  }
}

// Test code splitting performance
function testCodeSplitting() {
  console.log('=== Code Splitting Performance Test ===');
  
  const budget = new PerformanceBudget();
  
  // Simulate user clicking "Show Chart" button
  document.addEventListener('click', async (event) => {
    if (event.target.id === 'show-chart-btn') {
      console.log('User requested chart feature...');
      
      const startTime = performance.now();
      const chartLibrary = await FeatureLoader.loadChartLibrary();
      const loadTime = performance.now() - startTime;
      
      budget.checkBudget('feature-load-time', loadTime);
      
      // Use the library
      chartLibrary.createChart([1, 2, 3, 4, 5]);
    }
    
    if (event.target.id === 'track-event-btn') {
      console.log('User triggered analytics...');
      
      const startTime = performance.now();
      const analytics = await FeatureLoader.loadAnalyticsLibrary();
      const loadTime = performance.now() - startTime;
      
      budget.checkBudget('feature-load-time', loadTime);
      
      // Use the library
      analytics.track('button_click');
    }
  });
  
  // Add test buttons
  const testButtons = document.createElement('div');
  testButtons.innerHTML = `
    <h3>Code Splitting Test</h3>
    <button id="show-chart-btn">Load Chart Feature (Dynamic Import)</button>
    <button id="track-event-btn">Load Analytics Feature (Dynamic Import)</button>
    <p>Check console for loading times and budget compliance!</p>
  `;
  document.body.appendChild(testButtons);
}

// Uncomment to run bundle analysis and code splitting tests
// BundleAnalyzer.measureBundleSize();
// testCodeSplitting();

/*
📄 INSTRUCTIONS FOR REAL PROJECT TESTING:

1. In a Vite project, run: npm run build
2. Check the dist/ folder for bundle sizes
3. Use tools like:
   - bundlephobia.com to check npm package sizes
   - webpack-bundle-analyzer for detailed bundle analysis
   - Lighthouse for overall performance auditing

4. Implement code splitting:
   ```javascript
   // Instead of:
   import { HeavyComponent } from './heavy-component';
   
   // Use:
   const HeavyComponent = lazy(() => import('./heavy-component'));
   ```
*/

// =================================================================
// 🏆 MAIN PROJECT: Complete Performance Audit Report
// =================================================================

/*
🌟 PROJECT OBJECTIVE:

Perform a comprehensive performance audit on a real application, just like
a senior performance engineer would do at a tech company.

You'll establish baselines, implement optimizations, and measure improvements
with data-driven analysis.

💼 REAL-WORLD CONTEXT:

This is exactly what performance engineers do at companies like:
- Netflix (optimizing video loading)
- Shopify (speeding up merchant dashboards)  
- Pinterest (improving infinite scroll performance)
- Google (making search results faster)

⏱️ Time Estimate: 2-4 hours (spread over multiple sessions)
🏆 Difficulty: Advanced (but very rewarding!)

📊 SUCCESS CRITERIA:
- Measurable performance improvements (at least 20%)
- Professional-quality performance report
- Understanding of which optimizations have the biggest impact
*/

// =================================================================
// 📋 PROJECT PHASES
// =================================================================

/*
Phase 1: BASELINE MEASUREMENT (30 minutes)
📈 What you'll do:
- Choose a project to audit (Course Catalog from Lesson 8 is perfect)
- Measure current performance with multiple tools
- Document baseline metrics
- Create performance-report.md

Phase 2: OPTIMIZATION IMPLEMENTATION (2-3 hours)
🔧 What you'll do:
- Implement at least 3 different optimization techniques
- Test each optimization individually
- Measure the impact of each change

Phase 3: FINAL ANALYSIS (30 minutes)
📉 What you'll do:
- Re-measure all performance metrics
- Create before/after comparison
- Write executive summary of improvements
- Identify the highest-impact optimizations
*/

// =================================================================
// 📈 PHASE 1: BASELINE MEASUREMENT TOOLKIT
// ===============================================================// =================================================================
// 🏆 CONGRATULATIONS!
// =================================================================

/*
By completing this performance audit project, you've:

✅ Learned to measure performance like a professional
✅ Implemented real-world optimization techniques
✅ Created data-driven performance improvements
✅ Built skills used at top tech companies
✅ Developed a systematic approach to performance

These are the exact skills that performance engineers use at:
- Netflix, Spotify, YouTube (media streaming performance)
- Amazon, Shopify, eBay (e-commerce performance)
- Google, Facebook, Twitter (social platform performance)
- Stripe, PayPal, Square (fintech performance)

🏆 You now have professional-level performance optimization skills!

Next steps:
1. Apply these techniques to all your future projects
2. Set up performance monitoring in production
3. Create performance budgets for your team
4. Share your knowledge with other developers

Remember: Fast applications lead to happy users, better business metrics,
and career advancement. Performance optimization is one of the most
valuable skills a developer can have!
*/
 this.projectName = projectName;
    this.measurements = {
      baseline: {},
      optimized: {}
    };
  }
  
  // Measure Core Web Vitals
  async measureCoreWebVitals() {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const measurements = {};
        
        entries.forEach(entry => {
          switch (entry.entryType) {
            case 'largest-contentful-paint':
              measurements.LCP = entry.startTime;
              break;
            case 'first-input':
              measurements.FID = entry.processingStart - entry.startTime;
              break;
            case 'layout-shift':
              measurements.CLS = (measurements.CLS || 0) + entry.value;
              break;
          }
        });
        
        resolve(measurements);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      
      // Fallback timeout
      setTimeout(() => resolve({}), 5000);
    });
  }
  
  // Measure page loading performance
  measurePageLoad() {
    const perfData = performance.getEntriesByType('navigation')[0];
    
    return {
      DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
      TCP: perfData.connectEnd - perfData.connectStart,
      SSL: perfData.connectEnd - perfData.secureConnectionStart,
      TTFB: perfData.responseStart - perfData.requestStart,
      DOMLoad: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      FullLoad: perfData.loadEventEnd - perfData.navigationStart
    };
  }
  
  // Measure bundle sizes
  async measureBundleSize() {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    let totalSize = 0;
    const resources = [];
    
    const measureResource = async (element, type) => {
      try {
        const url = element.src || element.href;
        const response = await fetch(url);
        const text = await response.text();
        const size = new Blob([text]).size;
        
        totalSize += size;
        resources.push({ type, url, size: (size / 1024).toFixed(2) + 'KB' });
      } catch (error) {
        console.warn(`Could not measure ${type}:`, element.src || element.href);
      }
    };
    
    await Promise.all([
      ...scripts.map(script => measureResource(script, 'JS')),
      ...stylesheets.map(link => measureResource(link, 'CSS'))
    ]);
    
    return {
      totalSize: (totalSize / 1024).toFixed(2) + 'KB',
      resources
    };
  }
  
  // Measure specific function performance
  measureFunction(functionName, fn) {
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      
      try {
        const result = await fn();
        const endTime = performance.now();
        const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        
        resolve({
          functionName,
          executionTime: (endTime - startTime).toFixed(2) + 'ms',
          memoryUsed: ((endMemory - startMemory) / 1024 / 1024).toFixed(2) + 'MB',
          result
        });
      } catch (error) {
        resolve({
          functionName,
          error: error.message
        });
      }
    });
  }
  
  // Generate comprehensive performance report
  async generateReport(phase = 'baseline') {
    console.log(`\n=== ${this.projectName} Performance Report (${phase.toUpperCase()}) ===`);
    
    const measurements = {
      timestamp: new Date().toISOString(),
      coreWebVitals: await this.measureCoreWebVitals(),
      pageLoad: this.measurePageLoad(),
      bundleSize: await this.measureBundleSize()
    };
    
    this.measurements[phase] = measurements;
    
    console.log('Core Web Vitals:', measurements.coreWebVitals);
    console.log('Page Load Metrics:', measurements.pageLoad);
    console.log('Bundle Analysis:', measurements.bundleSize);
    
    return measurements;
  }
  
  // Compare baseline vs optimized measurements
  generateComparison() {
    if (!this.measurements.baseline || !this.measurements.optimized) {
      console.warn('Need both baseline and optimized measurements for comparison');
      return;
    }
    
    console.log('\n=== PERFORMANCE IMPROVEMENT ANALYSIS ===');
    
    const baseline = this.measurements.baseline;
    const optimized = this.measurements.optimized;
    
    // Compare key metrics
    const comparisons = [
      { metric: 'DOM Load Time', baseline: baseline.pageLoad.DOMLoad, optimized: optimized.pageLoad.DOMLoad },
      { metric: 'Full Load Time', baseline: baseline.pageLoad.FullLoad, optimized: optimized.pageLoad.FullLoad },
      { metric: 'TTFB', baseline: baseline.pageLoad.TTFB, optimized: optimized.pageLoad.TTFB }
    ];
    
    comparisons.forEach(({ metric, baseline, optimized }) => {
      const improvement = ((baseline - optimized) / baseline * 100).toFixed(1);
      const emoji = improvement > 0 ? '🚀' : '🟡';
      console.log(`${emoji} ${metric}: ${baseline.toFixed(1)}ms → ${optimized.toFixed(1)}ms (${improvement}% improvement)`);
    });
    
    return {
      baseline: this.measurements.baseline,
      optimized: this.measurements.optimized,
      improvements: comparisons
    };
  }
}

// =================================================================
// 🔧 PHASE 2: OPTIMIZATION IMPLEMENTATION EXAMPLES
// =================================================================

/*
Here are code examples for the most impactful optimizations.
Choose at least 3 to implement in your project:
*/

// Optimization 1: Algorithmic Improvement
class AlgorithmicOptimizations {
  // Convert O(n²) search to O(1) lookup
  static optimizeDataLookup(courses) {
    // Before: Slow nested loop searches
    // After: Fast Map-based lookups
    
    const courseMap = new Map();
    const categoryMap = new Map();
    const instructorMap = new Map();
    
    courses.forEach(course => {
      courseMap.set(course.id, course);
      
      if (!categoryMap.has(course.category)) {
        categoryMap.set(course.category, []);
      }
      categoryMap.get(course.category).push(course);
      
      if (!instructorMap.has(course.instructor)) {
        instructorMap.set(course.instructor, []);
      }
      instructorMap.get(course.instructor).push(course);
    });
    
    return { courseMap, categoryMap, instructorMap };
  }
}

// Optimization 2: DOM Performance
class DOMOptimizations {
  static renderCoursesOptimized(container, courses) {
    const fragment = document.createDocumentFragment();
    
    courses.forEach(course => {
      const element = this.createCourseElement(course);
      fragment.appendChild(element);
    });
    
    // Single DOM operation
    container.appendChild(fragment);
  }
  
  static createCourseElement(course) {
    const element = document.createElement('div');
    element.className = 'course-card';
    element.innerHTML = `
      <h3>${course.title}</h3>
      <p>Instructor: ${course.instructor}</p>
      <p>Category: ${course.category}</p>
      <p>Duration: ${course.duration}</p>
    `;
    return element;
  }
}

// Optimization 3: Image Loading
class ImageOptimizations {
  static implementLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  static createResponsiveImage(src, alt, sizes = '(max-width: 600px) 100vw, 50vw') {
    return `
      <picture>
        <source media="(max-width: 600px)" srcset="${src}?w=600&format=webp" type="image/webp">
        <source media="(min-width: 601px)" srcset="${src}?w=800&format=webp, ${src}?w=1200&format=webp 1.5x" type="image/webp">
        <img src="${src}?w=800" alt="${alt}" sizes="${sizes}" loading="lazy">
      </picture>
    `;
  }
}

// Optimization 4: Code Splitting
class CodeSplittingOptimizations {
  static async loadFeatureOnDemand(featureName) {
    const startTime = performance.now();
    
    try {
      let feature;
      
      switch (featureName) {
        case 'charts':
          feature = await import('./features/charts.js');
          break;
        case 'analytics':
          feature = await import('./features/analytics.js');
          break;
        case 'advanced-search':
          feature = await import('./features/advanced-search.js');
          break;
      }
      
      const loadTime = performance.now() - startTime;
      console.log(`🚀 Loaded ${featureName} in ${loadTime.toFixed(2)}ms`);
      
      return feature;
    } catch (error) {
      console.error(`Failed to load ${featureName}:`, error);
      throw error;
    }
  }
}

// Optimization 5: Web Worker for Heavy Computation
class WebWorkerOptimizations {
  static createDataProcessingWorker() {
    const workerCode = `
      self.onmessage = function(e) {
        const { courses, operation } = e.data;
        
        let result;
        const startTime = performance.now();
        
        switch (operation) {
          case 'calculateStatistics':
            result = calculateCourseStatistics(courses);
            break;
          case 'generateReport':
            result = generateDetailedReport(courses);
            break;
          case 'searchAndFilter':
            result = performComplexSearch(courses, e.data.query);
            break;
        }
        
        const processingTime = performance.now() - startTime;
        
        self.postMessage({ 
          result, 
          processingTime,
          operation 
        });
      };
      
      function calculateCourseStatistics(courses) {
        // Heavy statistical calculations here
        return {
          totalCourses: courses.length,
          averageDuration: courses.reduce((sum, c) => sum + c.duration, 0) / courses.length,
          categoryDistribution: /* complex calculation */,
          popularityScores: /* complex calculation */
        };
      }
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    
    return {
      process: (courses, operation, query = null) => {
        return new Promise((resolve) => {
          worker.onmessage = (e) => {
            console.log(`🚀 Worker completed ${operation} in ${e.data.processingTime.toFixed(2)}ms`);
            resolve(e.data.result);
          };
          
          worker.postMessage({ courses, operation, query });
        });
      },
      terminate: () => worker.terminate()
    };
  }
}

// =================================================================
// 📉 PHASE 3: PERFORMANCE REPORT TEMPLATE
// =================================================================

/*
CREATE THIS FILE: performance-report.md

# Performance Audit Report: [Your Project Name]

## Executive Summary
- **Overall Performance Improvement:** XX% faster load times
- **Most Impactful Optimization:** [Technique that gave biggest improvement]
- **Bundle Size Reduction:** XXkB (XX% smaller)
- **User Experience Impact:** [How users will benefit]

## Baseline Measurements

### Core Web Vitals
- **Largest Contentful Paint (LCP):** XXXXms
- **First Input Delay (FID):** XXms
- **Cumulative Layout Shift (CLS):** X.XX

### Loading Performance
- **Time to First Byte (TTFB):** XXXms
- **DOM Content Loaded:** XXXXms
- **Full Page Load:** XXXXms

### Bundle Analysis
- **Total Bundle Size:** XXXkB
- **JavaScript:** XXkB
- **CSS:** XXkB
- **Images:** XXkB

## Optimizations Implemented

### 1. [Optimization Name]
- **Type:** Algorithm/DOM/Network/Code Splitting
- **Implementation:** [Brief description]
- **Impact:** XX% improvement in [metric]
- **Before:** XXXms
- **After:** XXXms

### 2. [Optimization Name]
[Same format as above]

## Final Results

### Performance Improvements
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Page Load Time | XXXXms | XXXXms | XX% faster |
| Bundle Size | XXXkB | XXkB | XX% smaller |
| LCP | XXXXms | XXXXms | XX% faster |

### Business Impact
- **Estimated bounce rate reduction:** XX%
- **Estimated conversion increase:** XX%
- **User experience improvement:** [Qualitative description]

## Recommendations for Future
1. [Next optimization to implement]
2. [Performance monitoring suggestions]
3. [Performance budget recommendations]

## Tools Used
- Chrome DevTools Performance tab
- Lighthouse audit
- Performance API measurements
- Bundle analysis tools

---
*Report generated on [date] using systematic performance optimization methodology.*
*/

// =================================================================
// 🚀 GETTING STARTED WITH YOUR AUDIT
// =================================================================

/*
To begin your performance audit:

1. Choose your project (Course Catalog from Lesson 8 works great)

2. Set up the auditor:
   ```javascript
   const auditor = new PerformanceAuditor('My Course Catalog');
   ```

3. Take baseline measurements:
   ```javascript
   await auditor.generateReport('baseline');
   ```

4. Implement optimizations one by one

5. Take final measurements:
   ```javascript
   await auditor.generateReport('optimized');
   ```

6. Generate comparison:
   ```javascript
   auditor.generateComparison();
   ```

7. Create your performance-report.md file

🎆 Success Criteria:
- At least 20% improvement in key metrics
- Professional-quality report with data
- Understanding of which optimizations matter most
- Real-world applicable performance skills
*/

// Uncomment to create a performance auditor instance
// const auditor = new PerformanceAuditor('My JavaScript Project');
// console.log('Performance auditor ready! Run: await auditor.generateReport("baseline")');
