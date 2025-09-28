// src/main.js - Main application entry point
// Demonstrates ES module imports, dynamic imports, and modern JavaScript patterns

import { debounce, sleep, getModuleInfo, demonstrateUtilities } from './utils/helpers.js';

/**
 * Main application class demonstrating modern JavaScript tooling
 */
class ToolingStarterApp {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    console.log('🚀 Tooling-Ready Starter Kit initialized');
    console.log('✅ ES Modules loaded successfully');
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Show initial status
    this.updateStatus('Ready to demonstrate modern JavaScript tooling!', 'success');
    
    // Preload critical modules in background for better performance
    this.preloadModules();
  }

  setupEventListeners() {
    // Date formatting demo
    const showDateBtn = document.getElementById('show-date-btn');
    const clearDateBtn = document.getElementById('clear-date-btn');
    
    if (showDateBtn) {
      showDateBtn.addEventListener('click', this.handleDateDemo.bind(this));
    }
    
    if (clearDateBtn) {
      clearDateBtn.addEventListener('click', () => {
        this.clearOutput('date-display');
      });
    }

    // Utilities demo
    const utilitiesBtn = document.getElementById('run-utilities-btn');
    const clearUtilitiesBtn = document.getElementById('clear-utilities-btn');
    
    if (utilitiesBtn) {
      utilitiesBtn.addEventListener('click', this.handleUtilitiesDemo.bind(this));
    }
    
    if (clearUtilitiesBtn) {
      clearUtilitiesBtn.addEventListener('click', () => {
        this.clearOutput('utilities-display');
      });
    }

    // Professional features demo
    this.setupProfessionalFeatures();
  }

  setupProfessionalFeatures() {
    const moduleInfoBtn = document.getElementById('module-info-btn');
    const performanceBtn = document.getElementById('performance-btn');
    const errorHandlingBtn = document.getElementById('error-handling-btn');
    const clearFeaturesBtn = document.getElementById('clear-features-btn');

    if (moduleInfoBtn) {
      moduleInfoBtn.addEventListener('click', this.handleModuleInfo.bind(this));
    }

    if (performanceBtn) {
      performanceBtn.addEventListener('click', this.handlePerformanceDemo.bind(this));
    }

    if (errorHandlingBtn) {
      errorHandlingBtn.addEventListener('click', this.handleErrorDemo.bind(this));
    }

    if (clearFeaturesBtn) {
      clearFeaturesBtn.addEventListener('click', () => {
        this.clearOutput('features-display');
      });
    }
  }

  async handleDateDemo() {
    try {
      this.updateStatus('Loading date formatting library...', 'loading');
      
      // Dynamic import - loads only when needed
      const { formatCurrentDate, getDemoFormats } = await import('./utils/formatter.js');
      
      const dateResult = await formatCurrentDate();
      const demoFormats = await getDemoFormats();
      
      let output = '📅 Current Date Information:\n\n';
      output += `• Formatted: ${dateResult.formatted}\n`;
      output += `• ISO Format: ${dateResult.iso}\n`;
      output += `• Relative: ${dateResult.relative}\n`;
      output += `• Is Today: ${dateResult.isToday}\n`;
      output += `• Is Weekend: ${dateResult.isWeekend}\n`;
      output += `• Timestamp: ${dateResult.timestamp}\n`;
      
      if (dateResult.fallback) {
        output += '\n⚠️ Using fallback formatting (date-fns not available)\n';
      }
      
      output += '\n🎨 Demo Formats:\n';
      Object.entries(demoFormats).forEach(([label, value]) => {
        output += `• ${label}: ${value}\n`;
      });
      
      this.showOutput('date-display', output);
      this.updateStatus('Date formatting completed!', 'success');
      
    } catch (error) {
      console.error('Date demo failed:', error);
      this.showOutput('date-display', `❌ Error: ${error.message}`);
      this.updateStatus('Date formatting failed', 'error');
    }
  }

  async handleUtilitiesDemo() {
    try {
      this.updateStatus('Running utility demonstrations...', 'loading');
      
      const result = await demonstrateUtilities();
      
      this.showOutput('utilities-display', result);
      this.updateStatus('Utilities demo completed!', 'success');
      
    } catch (error) {
      console.error('Utilities demo failed:', error);
      this.showOutput('utilities-display', `❌ Error: ${error.message}`);
      this.updateStatus('Utilities demo failed', 'error');
    }
  }

  handleModuleInfo() {
    try {
      const info = getModuleInfo();
      this.showOutput('features-display', '🔍 Module and System Information:\n\n' + info);
      this.updateStatus('Module information retrieved', 'success');
    } catch (error) {
      this.showOutput('features-display', `❌ Error getting module info: ${error.message}`);
      this.updateStatus('Failed to get module info', 'error');
    }
  }

  async handlePerformanceDemo() {
    try {
      this.updateStatus('Running performance demonstrations...', 'loading');
      
      let output = '⚡ Performance Demonstrations:\n\n';
      
      // Measure dynamic import performance
      const importStart = performance.now();
      await import('./utils/helpers.js'); // Should be cached now
      const importEnd = performance.now();
      output += `• Dynamic import (cached): ${(importEnd - importStart).toFixed(2)}ms\n`;
      
      // Measure large array processing
      const arrayStart = performance.now();
      const largeArray = Array.from({ length: 100000 }, (_, i) => i);
      const processed = largeArray.filter(n => n % 2 === 0).map(n => n * 2);
      const arrayEnd = performance.now();
      output += `• Large array processing (100k items): ${(arrayEnd - arrayStart).toFixed(2)}ms\n`;
      output += `• Processed ${processed.length} items\n`;
      
      // Memory usage if available
      if (performance.memory) {
        output += `\n💾 Memory Usage:\n`;
        output += `• Used: ${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB\n`;
        output += `• Total: ${(performance.memory.totalJSHeapSize / 1048576).toFixed(2)} MB\n`;
        output += `• Limit: ${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB\n`;
      }
      
      // Test debounced function
      output += '\n🔄 Testing debounced function:\n';
      let debounceCount = 0;
      const debouncedFn = debounce(() => {
        debounceCount++;
        output += `• Debounced function called (count: ${debounceCount})\n`;
        this.showOutput('features-display', output);
      }, 100);
      
      // Call multiple times rapidly
      for (let i = 0; i < 5; i++) {
        debouncedFn();
      }
      output += '• Called debounced function 5 times rapidly\n';
      output += '• Should execute only once after 100ms delay\n';
      
      this.showOutput('features-display', output);
      this.updateStatus('Performance demo completed!', 'success');
      
    } catch (error) {
      console.error('Performance demo failed:', error);
      this.showOutput('features-display', `❌ Error: ${error.message}`);
      this.updateStatus('Performance demo failed', 'error');
    }
  }

  async handleErrorDemo() {
    try {
      this.updateStatus('Demonstrating error handling...', 'loading');
      
      let output = '🛡️ Error Handling Demonstrations:\n\n';
      
      // Demonstrate try-catch with dynamic imports
      try {
        await import('./non-existent-module.js');
      } catch (error) {
        output += '• ✅ Successfully caught dynamic import error:\n';
        output += `  ${error.message}\n\n`;
      }
      
      // Demonstrate async error handling
      try {
        await this.simulateAsyncError();
      } catch (error) {
        output += '• ✅ Successfully caught async function error:\n';
        output += `  ${error.message}\n\n`;
      }
      
      // Demonstrate Promise rejection handling
      try {
        await Promise.reject(new Error('Simulated promise rejection'));
      } catch (error) {
        output += '• ✅ Successfully caught promise rejection:\n';
        output += `  ${error.message}\n\n`;
      }
      
      // Demonstrate network error handling
      try {
        const response = await fetch('https://definitely-not-a-real-url-12345.com');
        await response.json();
      } catch (error) {
        output += '• ✅ Successfully caught network error:\n';
        output += `  ${error.message}\n\n`;
      }
      
      output += '🎉 All error scenarios handled gracefully!\n';
      output += 'This demonstrates robust error handling patterns.';
      
      this.showOutput('features-display', output);
      this.updateStatus('Error handling demo completed!', 'success');
      
    } catch (error) {
      console.error('Error demo failed:', error);
      this.showOutput('features-display', `❌ Unexpected error: ${error.message}`);
      this.updateStatus('Error demo failed', 'error');
    }
  }

  async simulateAsyncError() {
    await sleep(100); // Small delay to make it actually async
    throw new Error('Simulated async operation failure');
  }

  showOutput(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = content;
      element.classList.remove('hidden');
    }
  }

  clearOutput(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = '';
      element.classList.add('hidden');
    }
  }

  updateStatus(message, type = 'info') {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `status ${type}`;
      statusElement.classList.remove('hidden');
      
      // Auto-hide success/error messages
      if (type === 'success' || type === 'error') {
        setTimeout(() => {
          statusElement.classList.add('hidden');
        }, 3000);
      }
    }
  }

  async preloadModules() {
    // Preload critical modules in the background for better performance
    try {
      const preloadPromises = [
        import('./utils/formatter.js'),
        // Add other critical modules here
      ];
      
      await Promise.allSettled(preloadPromises);
      console.log('✅ Critical modules preloaded');
    } catch (error) {
      console.warn('⚠️ Some modules failed to preload:', error);
    }
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new ToolingStarterApp();
  
  // Make app instance available globally for debugging
  if (typeof window !== 'undefined') {
    window.starterApp = app;
    console.log('🔧 App instance available at window.starterApp');
  }
});

// Handle any unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior
  event.preventDefault();
});

// Log when all modules are loaded
console.log('📦 Main module loaded successfully');