/*
================================================================================
## Practice Drills: Master Modern JavaScript Modules
================================================================================

These three drills will take you from module novice to professional developer!
Each drill builds on the previous one, creating a complete modern development setup.

**What you'll build:**
1. 🏗️ Convert messy script code into clean, modular ES modules
2. 📦 Integrate third-party libraries using npm and ES modules
3. 🔧 Set up professional development tools (linting, formatting, scripts)
*/

// ====================================
// DRILL 1: From Monolith to Modules
// ====================================

/**
 * CHALLENGE: Convert this messy single-file script into clean ES modules
 * 
 * BEFORE: Everything in one file (the old way) 😱
 * AFTER: Organized modules with clear separation of concerns ✨
 * 
 * LEARNING GOALS:
 * - Understand the benefits of modular code
 * - Practice export/import syntax
 * - Learn proper file organization
 */

console.log('🚀 Starting Drill 1: Converting to ES Modules');

// --- BEFORE: Messy monolithic script (DON'T DO THIS!) ---
/*
// old-messy-script.js - Everything in one file 😱

// Math utilities mixed with UI code mixed with data processing...
function calculateTip(bill, tipPercentage) {
  return (bill * tipPercentage) / 100;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function validatePositiveNumber(value) {
  return typeof value === 'number' && value > 0;
}

// UI functions mixed in
function updateDisplay(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = content;
  }
}

function showError(message) {
  alert('Error: ' + message); // 😱 Using alert in 2024!
}

// Business logic mixed in
function calculateBillSplit(bill, tipPercentage, numberOfPeople) {
  if (!validatePositiveNumber(bill)) {
    showError('Bill amount must be a positive number');
    return null;
  }
  
  const tip = calculateTip(bill, tipPercentage);
  const total = bill + tip;
  const perPerson = total / numberOfPeople;
  
  return {
    subtotal: bill,
    tip: tip,
    total: total,
    perPerson: perPerson
  };
}

// Everything runs in global scope
const result = calculateBillSplit(50, 18, 4);
if (result) {
  updateDisplay('total', formatCurrency(result.total));
  updateDisplay('per-person', formatCurrency(result.perPerson));
}
*/

// --- AFTER: Clean modular approach ✨ ---

// =============================================================================
// 📊 utils/math-utils.js - Math utility functions
// =============================================================================

/**
 * Calculate tip amount based on bill and percentage
 * @param {number} bill - The bill amount
 * @param {number} tipPercentage - Tip percentage (e.g., 18 for 18%)
 * @returns {number} Tip amount
 */
export function calculateTip(bill, tipPercentage) {
  if (!validatePositiveNumber(bill) || !validatePositiveNumber(tipPercentage)) {
    throw new Error('Bill and tip percentage must be positive numbers');
  }
  return (bill * tipPercentage) / 100;
}

/**
 * Validate that a value is a positive number
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is a positive number
 */
export function validatePositiveNumber(value) {
  return typeof value === 'number' && value > 0 && !isNaN(value);
}

/**
 * Round number to specified decimal places
 * @param {number} number - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
export function roundToDecimals(number, decimals = 2) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

console.log('✅ Math utilities module loaded');

// =============================================================================
// 🎨 utils/format-utils.js - Formatting utility functions
// =============================================================================

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale for formatting
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Invalid amount';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Format percentage
 * @param {number} percentage - Percentage to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(percentage, decimals = 1) {
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return 'Invalid percentage';
  }
  
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Format number with thousand separators
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    return 'Invalid number';
  }
  
  return new Intl.NumberFormat().format(number);
}

console.log('✅ Format utilities module loaded');

// =============================================================================
// 🗺️ utils/dom-utils.js - DOM utility functions
// =============================================================================

/**
 * Safely update element content
 * @param {string} elementId - ID of element to update
 * @param {string} content - Content to set
 * @returns {boolean} True if successful
 */
export function updateElement(elementId, content) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID '${elementId}' not found`);
    return false;
  }
  
  element.textContent = content;
  return true;
}

/**
 * Show error message to user (better than alert!)
 * @param {string} message - Error message
 * @param {number} duration - How long to show (ms)
 */
export function showError(message, duration = 5000) {
  // Create or update error container
  let errorContainer = document.getElementById('error-container');
  
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'error-container';
    errorContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 12px 16px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      font-family: system-ui, sans-serif;
    `;
    document.body.appendChild(errorContainer);
  }
  
  errorContainer.textContent = `❌ ${message}`;
  errorContainer.style.display = 'block';
  
  // Auto-hide after duration
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, duration);
}

/**
 * Show success message to user
 * @param {string} message - Success message
 * @param {number} duration - How long to show (ms)
 */
export function showSuccess(message, duration = 3000) {
  let successContainer = document.getElementById('success-container');
  
  if (!successContainer) {
    successContainer = document.createElement('div');
    successContainer.id = 'success-container';
    successContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #22c55e;
      color: white;
      padding: 12px 16px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      font-family: system-ui, sans-serif;
    `;
    document.body.appendChild(successContainer);
  }
  
  successContainer.textContent = `✅ ${message}`;
  successContainer.style.display = 'block';
  
  setTimeout(() => {
    successContainer.style.display = 'none';
  }, duration);
}

console.log('✅ DOM utilities module loaded');

// =============================================================================
// 💼 business/bill-calculator.js - Business logic
// =============================================================================

import { calculateTip, validatePositiveNumber, roundToDecimals } from '../utils/math-utils.js';

/**
 * Calculate bill split with tip
 * @param {number} bill - Bill amount
 * @param {number} tipPercentage - Tip percentage
 * @param {number} numberOfPeople - Number of people splitting
 * @returns {Object} Calculation results
 */
export function calculateBillSplit(bill, tipPercentage = 18, numberOfPeople = 1) {
  // Validate inputs
  if (!validatePositiveNumber(bill)) {
    throw new Error('Bill amount must be a positive number');
  }
  
  if (!validatePositiveNumber(tipPercentage) || tipPercentage > 100) {
    throw new Error('Tip percentage must be between 0 and 100');
  }
  
  if (!validatePositiveNumber(numberOfPeople) || numberOfPeople < 1) {
    throw new Error('Number of people must be at least 1');
  }
  
  // Perform calculations
  const tip = calculateTip(bill, tipPercentage);
  const total = bill + tip;
  const perPerson = total / numberOfPeople;
  const tipPerPerson = tip / numberOfPeople;
  
  return {
    subtotal: roundToDecimals(bill),
    tip: roundToDecimals(tip),
    total: roundToDecimals(total),
    perPerson: roundToDecimals(perPerson),
    tipPerPerson: roundToDecimals(tipPerPerson),
    numberOfPeople,
    tipPercentage
  };
}

/**
 * Generate bill summary text
 * @param {Object} calculation - Result from calculateBillSplit
 * @returns {string} Human-readable summary
 */
export function generateBillSummary(calculation) {
  const { subtotal, tip, total, perPerson, numberOfPeople, tipPercentage } = calculation;
  
  return `
    Bill Summary:
    Subtotal: $${subtotal}
    Tip (${tipPercentage}%): $${tip}
    Total: $${total}
    ${numberOfPeople > 1 ? `Per person: $${perPerson}` : ''}
  `.trim();
}

console.log('✅ Bill calculator module loaded');

// =============================================================================
// ✨ main.js - Main application logic
// =============================================================================

import { calculateBillSplit, generateBillSummary } from './business/bill-calculator.js';
import { formatCurrency } from './utils/format-utils.js';
import { updateElement, showError, showSuccess } from './utils/dom-utils.js';

class BillCalculatorApp {
  constructor() {
    this.initializeApp();
  }
  
  initializeApp() {
    console.log('🎉 Bill Calculator App initialized with ES Modules!');
    
    // Example usage
    this.runExample();
    
    // Set up event listeners if DOM is available
    if (typeof document !== 'undefined') {
      this.setupEventListeners();
    }
  }
  
  runExample() {
    try {
      const result = calculateBillSplit(85.50, 20, 4);
      
      console.log('📊 Calculation Results:');
      console.log(generateBillSummary(result));
      
      // Update DOM if elements exist
      updateElement('subtotal', formatCurrency(result.subtotal));
      updateElement('tip', formatCurrency(result.tip));
      updateElement('total', formatCurrency(result.total));
      updateElement('per-person', formatCurrency(result.perPerson));
      
      showSuccess('Bill calculated successfully!');
      
    } catch (error) {
      console.error('❌ Error calculating bill:', error.message);
      showError(error.message);
    }
  }
  
  setupEventListeners() {
    const calculateButton = document.getElementById('calculate-btn');
    if (calculateButton) {
      calculateButton.addEventListener('click', this.handleCalculate.bind(this));
    }
  }
  
  handleCalculate() {
    // Get values from form inputs
    const billInput = document.getElementById('bill-amount');
    const tipInput = document.getElementById('tip-percentage');
    const peopleInput = document.getElementById('number-of-people');
    
    if (!billInput || !tipInput || !peopleInput) {
      showError('Required form elements not found');
      return;
    }
    
    try {
      const bill = parseFloat(billInput.value);
      const tip = parseFloat(tipInput.value) || 18;
      const people = parseInt(peopleInput.value) || 1;
      
      const result = calculateBillSplit(bill, tip, people);
      
      // Update display
      updateElement('result-subtotal', formatCurrency(result.subtotal));
      updateElement('result-tip', formatCurrency(result.tip));
      updateElement('result-total', formatCurrency(result.total));
      updateElement('result-per-person', formatCurrency(result.perPerson));
      
      showSuccess('Bill calculated!');
      
    } catch (error) {
      showError(error.message);
    }
  }
}

// Initialize the app
const app = new BillCalculatorApp();

// Export for testing or external use
export { BillCalculatorApp };

console.log('✅ Drill 1 Complete: Monolithic script converted to clean ES modules!');
console.log('🎆 Benefits achieved:');
console.log('  ✓ Clean separation of concerns');
console.log('  ✓ Reusable utility functions');
console.log('  ✓ Easy to test individual functions');
console.log('  ✓ No global namespace pollution');
console.log('  ✓ Clear dependencies and imports');

// ====================================
// DRILL 2: Third-Party Library Integration
// ====================================

/**
 * CHALLENGE: Integrate third-party libraries using npm and ES modules
 * 
 * LEARNING GOALS:
 * - Learn how to install and use npm packages
 * - Practice importing from node_modules
 * - Understand the difference between dependencies and devDependencies
 * - See real-world examples of popular libraries
 */

function startDrill2() {
  console.log('🚀 Starting Drill 2: Third-Party Library Integration');
  
  // Simulated date-fns integration (since we can't actually install packages in this demo)
  // In a real project, you would: npm install date-fns
  
  // =============================================================================
  // 📅 Enhanced date utilities using date-fns
  // =============================================================================
  
  // This is what your import would look like after npm install date-fns:
  // import { format, formatDistanceToNow, isWeekend, addDays, parseISO } from 'date-fns';
  
  // For this demo, we'll create mock implementations that show how it would work:
  const dateFns = {
    format: (date, formatStr) => {
      // Mock implementation - in real date-fns this is much more powerful
      if (formatStr === 'PPP') {
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
      if (formatStr === 'yyyy-MM-dd HH:mm:ss') {
        return date.toISOString().replace('T', ' ').slice(0, 19);
      }
      if (formatStr === 'MMM d, yyyy') {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
      return date.toLocaleDateString();
    },
    
    formatDistanceToNow: (date) => {
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.round(diffMs / (1000 * 60));
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      return `${diffDays} days ago`;
    },
    
    isWeekend: (date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    },
    
    addDays: (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  };
  
  // =============================================================================
  // ✨ Enhanced application with third-party library features
  // =============================================================================
  
  class EnhancedBillCalculator {
    constructor() {
      this.initializeWithLibraries();
    }
    
    initializeWithLibraries() {
      console.log('📦 Initializing with third-party libraries...');
      
      // Demonstrate various library integrations
      this.demonstrateDateFormatting();
      this.demonstrateUtilityFunctions();
      this.createEnhancedBillEntry();
    }
    
    demonstrateDateFormatting() {
      console.log('\n📅 Date Formatting with date-fns:');
      
      const now = new Date();
      const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
      
      console.log(`Current date (PPP): ${dateFns.format(now, 'PPP')}`);
      console.log(`Current date (ISO-like): ${dateFns.format(now, 'yyyy-MM-dd HH:mm:ss')}`);
      console.log(`Current date (short): ${dateFns.format(now, 'MMM d, yyyy')}`);
      console.log(`Time since past event: ${dateFns.formatDistanceToNow(pastDate)}`);
      console.log(`Is today weekend? ${dateFns.isWeekend(now)}`);
      
      const nextWeek = dateFns.addDays(now, 7);
      console.log(`Next week: ${dateFns.format(nextWeek, 'PPP')}`);
    }
    
    demonstrateUtilityFunctions() {
      console.log('\n🔧 Utility Functions (simulating lodash-es):');
      
      // In a real project: import { debounce, throttle, chunk, uniq } from 'lodash-es';
      const lodash = {
        debounce: (func, wait) => {
          let timeout;
          return function executedFunction(...args) {
            const later = () => {
              clearTimeout(timeout);
              func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        },
        
        chunk: (array, size) => {
          const chunks = [];
          for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
          }
          return chunks;
        },
        
        uniq: (array) => [...new Set(array)]
      };
      
      // Demonstrate utility functions
      const numbers = [1, 2, 2, 3, 3, 3, 4, 5];
      console.log(`Original array: [${numbers.join(', ')}]`);
      console.log(`Unique values: [${lodash.uniq(numbers).join(', ')}]`);
      
      const chunked = lodash.chunk(numbers, 3);
      console.log(`Chunked by 3:`, chunked);
      
      // Debounced function example
      const debouncedLog = lodash.debounce((message) => {
        console.log(`Debounced: ${message}`);
      }, 300);
      
      debouncedLog('Call 1');
      debouncedLog('Call 2');
      debouncedLog('Call 3'); // Only this will execute after 300ms
    }
    
    createEnhancedBillEntry() {
      console.log('\n📊 Enhanced Bill Entry with Libraries:');
      
      const billEntry = {
        id: this.generateId(),
        amount: 127.50,
        tipPercentage: 18,
        numberOfPeople: 3,
        restaurant: 'The Fancy Bistro',
        createdAt: new Date(),
        tags: ['dinner', 'friends', 'celebration', 'dinner'] // has duplicate
      };
      
      // Process with our enhanced utilities
      billEntry.formattedDate = dateFns.format(billEntry.createdAt, 'PPP');
      billEntry.timeAgo = dateFns.formatDistanceToNow(billEntry.createdAt);
      billEntry.uniqueTags = this.simulateLodash().uniq(billEntry.tags);
      
      // Calculate bill details
      const calculation = calculateBillSplit(
        billEntry.amount, 
        billEntry.tipPercentage, 
        billEntry.numberOfPeople
      );
      
      console.log('🎨 Enhanced Bill Entry:');
      console.log(`Restaurant: ${billEntry.restaurant}`);
      console.log(`Date: ${billEntry.formattedDate}`);
      console.log(`Time: ${billEntry.timeAgo}`);
      console.log(`Tags: ${billEntry.uniqueTags.join(', ')}`);
      console.log(`Total: ${formatCurrency(calculation.total)}`);
      console.log(`Per person: ${formatCurrency(calculation.perPerson)}`);
    }
    
    generateId() {
      // In real projects, you might use: import { v4 as uuidv4 } from 'uuid';
      return 'bill_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    simulateLodash() {
      return {
        uniq: (array) => [...new Set(array)]
      };
    }
  }
  
  const enhancedApp = new EnhancedBillCalculator();
  
  console.log('\n✅ Drill 2 Complete: Third-party libraries integrated!');
  console.log('🎆 What you learned:');
  console.log('  ✓ How to install npm packages (npm install package-name)');
  console.log('  ✓ How to import from node_modules');
  console.log('  ✓ Real-world library usage patterns');
  console.log('  ✓ Benefits of using tested, maintained libraries');
  
  // Continue to Drill 3 after a short delay
  setTimeout(() => {
    console.log('\n');
    startDrill3();
  }, 3000);
}

// ====================================
// DRILL 3: Professional Development Tooling
// ====================================

/**
 * CHALLENGE: Set up professional development tools and npm scripts
 * 
 * LEARNING GOALS:
 * - Configure ESLint for code quality
 * - Set up Prettier for consistent formatting
 * - Create useful npm scripts
 * - Understand the complete development workflow
 */

function startDrill3() {
  console.log('🚀 Starting Drill 3: Professional Development Tooling');
  
  console.log('\n🔧 Setting up professional development environment...');
  
  // =============================================================================
  // 📄 Example package.json with all the scripts and dependencies
  // =============================================================================
  
  const idealPackageJson = {
    "name": "professional-js-project",
    "version": "1.0.0",
    "description": "A professionally set up JavaScript project",
    "type": "module",
    "main": "dist/index.js",
    "scripts": {
      // Development
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      
      // Code Quality
      "lint": "eslint src --ext .js,.jsx,.ts,.tsx --max-warnings 0",
      "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
      "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
      "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
      
      // Testing
      "test": "vitest",
      "test:ui": "vitest --ui",
      "test:coverage": "vitest --coverage",
      
      // Type Checking
      "type-check": "tsc --noEmit",
      "type-check:watch": "tsc --noEmit --watch",
      
      // Quality Assurance
      "qa": "npm run lint && npm run format:check && npm run type-check && npm run test",
      "qa:fix": "npm run lint:fix && npm run format && npm run type-check",
      
      // Git Hooks
      "prepare": "husky install",
      
      // Utility
      "clean": "rm -rf dist node_modules/.vite",
      "reinstall": "npm run clean && npm install"
    },
    "dependencies": {
      "date-fns": "^2.30.0",
      "lodash-es": "^4.17.21",
      "axios": "^1.4.0"
    },
    "devDependencies": {
      // Build Tools
      "vite": "^4.3.9",
      "@vitejs/plugin-react": "^4.0.0",
      
      // Code Quality
      "eslint": "^8.42.0",
      "eslint-config-prettier": "^8.8.0",
      "eslint-plugin-import": "^2.27.5",
      "prettier": "^2.8.8",
      
      // Testing
      "vitest": "^0.32.0",
      "@vitest/ui": "^0.32.0",
      "c8": "^7.14.0",
      
      // TypeScript
      "typescript": "^5.1.3",
      "@types/node": "^20.3.1",
      
      // Git Hooks
      "husky": "^8.0.3",
      "lint-staged": "^13.2.2"
    },
    "lint-staged": {
      "*.{js,jsx,ts,tsx}": [
        "eslint --fix",
        "prettier --write"
      ],
      "*.{json,css,md}": [
        "prettier --write"
      ]
    }
  };
  
  console.log('📄 Professional package.json structure:');
  console.log(JSON.stringify(idealPackageJson, null, 2));
  
  // =============================================================================
  // ⚙️ ESLint Configuration (.eslintrc.js)
  // =============================================================================
  
  const eslintConfig = {
    "env": {
      "browser": true,
      "es2022": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "prettier" // Disables ESLint rules that conflict with Prettier
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "import"
    ],
    "rules": {
      // Error Prevention
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      
      // Best Practices
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      
      // Import/Export
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/no-duplicates": "error",
      
      // Code Style (let Prettier handle most of this)
      "max-len": ["warn", { "code": 100 }],
      "complexity": ["warn", 10]
    }
  };
  
  console.log('\n⚙️ ESLint configuration (.eslintrc.js):');
  console.log('module.exports = ' + JSON.stringify(eslintConfig, null, 2));
  
  // =============================================================================
  // 🎨 Prettier Configuration (.prettierrc)
  // =============================================================================
  
  const prettierConfig = {
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "bracketSpacing": true,
    "arrowParens": "avoid",
    "endOfLine": "lf"
  };
  
  console.log('\n🎨 Prettier configuration (.prettierrc):');
  console.log(JSON.stringify(prettierConfig, null, 2));
  
  // =============================================================================
  // 🚀 Vite Configuration (vite.config.js)
  // =============================================================================
  
  const viteConfigExample = `
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Build configuration
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['date-fns', 'lodash-es'],
        },
      },
    },
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
});
  `;
  
  console.log('\n🚀 Vite configuration example:');
  console.log(viteConfigExample);
  
  // =============================================================================
  // 📋 Demonstration of Development Workflow
  // =============================================================================
  
  console.log('\n💼 Professional Development Workflow:');
  
  const workflowSteps = [
    '📅 1. Start development: npm run dev',
    '✏️  2. Write code with live reloading',
    '🔍 3. Check code quality: npm run lint',
    '🎨 4. Format code: npm run format',
    '🧪 5. Run tests: npm run test',
    '🔍 6. Type check: npm run type-check',
    '✅ 7. Run full QA: npm run qa',
    '📦 8. Build for production: npm run build',
    '🚀 9. Preview production build: npm run preview'
  ];
  
  workflowSteps.forEach(step => console.log(step));
  
  // =============================================================================
  // 🤖 Simulated Tool Integration
  // =============================================================================
  
  console.log('\n🤖 Simulating tool integration...');
  
  // Simulate ESLint check
  setTimeout(() => {
    console.log('\n🔍 ESLint Results:');
    console.log('✅ No linting errors found!');
    console.log('  ✓ All variables are used');
    console.log('  ✓ No syntax errors');
    console.log('  ✓ Import/export statements are valid');
    
    // Simulate Prettier formatting
    setTimeout(() => {
      console.log('\n🎨 Prettier Results:');
      console.log('✅ All files are properly formatted!');
      console.log('  ✓ Consistent indentation');
      console.log('  ✓ Proper semicolon usage');
      console.log('  ✓ Consistent quote style');
      
      // Simulate build process
      setTimeout(() => {
        console.log('\n📦 Vite Build Results:');
        console.log('✅ Build completed successfully!');
        console.log('  ✓ Bundle size: 45.2 KB (gzipped: 12.1 KB)');
        console.log('  ✓ Tree-shaking applied');
        console.log('  ✓ Source maps generated');
        console.log('  ✓ Assets optimized');
        
        finishDrill3();
      }, 1000);
    }, 800);
  }, 500);
}

function finishDrill3() {
  console.log('\n✅ Drill 3 Complete: Professional tooling setup!');
  console.log('🎆 What you mastered:');
  console.log('  ✓ ESLint configuration for code quality');
  console.log('  ✓ Prettier setup for consistent formatting');
  console.log('  ✓ Comprehensive npm scripts');
  console.log('  ✓ Modern build tools (Vite)');
  console.log('  ✓ Professional development workflow');
  
  console.log('\n🞆 ALL DRILLS COMPLETED! You\'re now ready for professional JavaScript development!');
  
  console.log('\n🎓 What you\'ve learned in these drills:');
  console.log('  • Converting monolithic scripts to modular ES modules');
  console.log('  • Proper separation of concerns and code organization');
  console.log('  • Integrating third-party libraries via npm');
  console.log('  • Professional development tooling setup');
  console.log('  • Code quality and consistency automation');
  console.log('  • Modern build and deployment workflows');
  
  console.log('\n🚀 Next steps: Try the complete Tooling-Ready Starter Kit project!');
}

// Start the drill sequence
setTimeout(() => {
  console.log('\n');
  startDrill2();
}, 2000);

/*
## Project: Tooling-Ready Starter Kit

**Objective:** Set up a complete project from scratch that uses modern tooling and best practices.

**Instructions:**
1.  **Initialize Project:**
    -   Create a new directory for this project.
    -   Run `npm init -y` to create a `package.json` file.
    -   Set `"type": "module"` in `package.json` to enable ES Modules.

2.  **Install Dependencies:**
    -   Install `vite` as a development dependency: `npm install --save-dev vite`
    -   Install `date-fns` as a regular dependency: `npm install date-fns`

3.  **Folder Structure:**
    -   Create a `src/` directory.
    -   Inside `src/`, create `main.js` and a `utils/` folder.
    -   Inside `utils/`, create `formatter.js`.

4.  **Implement Logic:**
    -   In `formatter.js`, export a function that uses the `format` function from `date-fns` to return a nicely formatted date string (e.g., "MMMM d, yyyy").
    -   In `main.js`, set up a button in your `index.html`. When the button is clicked, use a **dynamic import** to lazy-load your `formatter.js` module. Then, call the formatting function and display the current date on the page.

5.  **Configure npm Scripts:**
    -   In `package.json`, add the following scripts:
        -   `"dev": "vite"` (to run the development server)
        -   `"build": "vite build"` (to create a production build)

6.  **Documentation:**
    -   Create a `README.md` in the root of your project.
    -   Explain what the project is, its folder structure, and how to run it (`npm install`, `npm run dev`, `npm run build`).

This project simulates setting up a new application, a common task for any developer.
*/

// --- Starter HTML (index.html) ---
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tooling Starter Kit</title>
</head>
<body>
  <h1>Modern Tooling</h1>
  <button id="show-date-btn">Show Current Date</button>
  <p id="date-display"></p>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
*/

// --- Starter JavaScript (src/formatter.js) ---
/*
import { format } from 'date-fns';

export function formatCurrentDate() {
  // TODO: Use the `format` function to return the current date
  // Example format: 'MMMM d, yyyy HH:mm:ss'
  return format(new Date(), 'MMMM d, yyyy HH:mm:ss');
}
*/

// --- Starter JavaScript (src/main.js) ---
/*
const showDateBtn = document.getElementById('show-date-btn');
const dateDisplay = document.getElementById('date-display');

showDateBtn.addEventListener('click', async () => {
  try {
    // TODO: Use a dynamic import to load the formatter.js module.
    const { formatCurrentDate } = await import('./utils/formatter.js');
    
    // TODO: Call the imported function and display the result in the `dateDisplay` paragraph.
    dateDisplay.textContent = formatCurrentDate();
    
  } catch (error) {
    console.error("Failed to load date formatter:", error);
    dateDisplay.textContent = "Could not load date.";
  }
});
*/
