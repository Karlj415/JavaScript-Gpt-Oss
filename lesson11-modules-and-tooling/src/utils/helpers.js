// src/utils/helpers.js - General utility functions
// Demonstrates clean module organization and third-party library integration

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate a random ID
 * @param {number} length - Length of the ID
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Format bytes to human readable string
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Sleep function for async delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Demonstrate utility functions with lodash-es integration
 */
export async function demonstrateUtilities() {
  const results = [];
  
  try {
    // Dynamic import of lodash-es utilities
    const { chunk, uniq, shuffle, sample, pick } = await import('lodash-es');
    
    const sampleData = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 4, 6],
      users: [
        { id: 1, name: 'Alice', role: 'admin', active: true },
        { id: 2, name: 'Bob', role: 'user', active: false },
        { id: 3, name: 'Charlie', role: 'user', active: true },
        { id: 4, name: 'Diana', role: 'moderator', active: true },
      ],
      text: 'hello world example',
    };
    
    results.push('🔧 Lodash-es utilities:');
    results.push(`• Unique numbers: [${uniq(sampleData.numbers).join(', ')}]`);
    results.push(`• Chunked (groups of 3): ${JSON.stringify(chunk(sampleData.numbers, 3))}`);
    results.push(`• Random user: ${JSON.stringify(sample(sampleData.users))}`);
    results.push(`• Shuffled first 5 numbers: [${shuffle(sampleData.numbers.slice(0, 5)).join(', ')}]`);
    
    const pickedUser = pick(sampleData.users[0], ['name', 'role']);
    results.push(`• Picked fields: ${JSON.stringify(pickedUser)}`);
    
  } catch (error) {
    results.push(`❌ Could not load lodash-es: ${error.message}`);
  }
  
  // Demonstrate custom utilities
  results.push('\n🛠️ Custom utilities:');
  results.push(`• Generated ID: ${generateId(12)}`);
  results.push(`• Formatted bytes (1024): ${formatBytes(1024)}`);
  results.push(`• Formatted bytes (1536000): ${formatBytes(1536000)}`);
  results.push(`• Capitalized: ${capitalize('hello WORLD')}`);
  
  // Test deep clone
  const original = { a: 1, b: { c: 2, d: [3, 4] } };
  const cloned = deepClone(original);
  cloned.b.c = 999;
  results.push(`• Deep clone test - original.b.c: ${original.b.c}, cloned.b.c: ${cloned.b.c}`);
  
  // Performance test
  const start = performance.now();
  await sleep(100);
  const end = performance.now();
  results.push(`• Sleep 100ms actual time: ${Math.round(end - start)}ms`);
  
  return results.join('\n');
}

/**
 * Get system and module information
 */
export function getModuleInfo() {
  const info = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    memoryInfo: performance.memory ? {
      usedJSHeapSize: formatBytes(performance.memory.usedJSHeapSize),
      totalJSHeapSize: formatBytes(performance.memory.totalJSHeapSize),
      jsHeapSizeLimit: formatBytes(performance.memory.jsHeapSizeLimit),
    } : 'Not available',
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    moduleSupport: {
      esModules: 'supported',
      dynamicImports: 'supported',
      topLevelAwait: 'supported',
    },
  };
  
  return JSON.stringify(info, null, 2);
}
