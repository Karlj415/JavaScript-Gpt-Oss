/* 
## Practice Drills

These three drills will build your confidence with promises and async/await.
Run each drill independently to see the concepts in action.
*/

// ====================================
// DRILL 1: Converting Callbacks to Promises
// ====================================

/**
 * OBJECTIVE: Convert callback-based functions into promise-based ones
 * 
 * This is a crucial skill because many older JavaScript APIs use callbacks,
 * but modern code prefers promises for better readability and error handling.
 */

console.log('🚀 Starting Drill 1: Converting Callbacks to Promises');

// Original callback-based function (simulating an API or file operation)
function fetchUserCallback(userId, callback) {
  console.log(`📡 Fetching user ${userId} with callback...`);
  
  // Simulate network delay
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('❌ Invalid user ID'), null);
    } else {
      callback(null, {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        active: true
      });
    }
  }, 1000);
}

// SOLUTION: Convert to promise-based function
function fetchUserPromise(userId) {
  return new Promise((resolve, reject) => {
    // Wrap the callback-based function
    fetchUserCallback(userId, (error, user) => {
      if (error) {
        reject(error);  // Promise rejects on error
      } else {
        resolve(user);  // Promise resolves with data
      }
    });
  });
}

// Alternative modern approach using util.promisify (Node.js)
// const { promisify } = require('util');
// const fetchUserPromise = promisify(fetchUserCallback);

// Test both approaches
async function drill1Demo() {
  try {
    console.log('\n--- Testing Callback Version ---');
    
    // Callback version (messy error handling)
    fetchUserCallback(123, (error, user) => {
      if (error) {
        console.error('Callback error:', error.message);
      } else {
        console.log('✅ Callback result:', user);
      }
    });
    
    console.log('\n--- Testing Promise Version ---');
    
    // Promise version (clean with async/await)
    const user = await fetchUserPromise(456);
    console.log('✅ Promise result:', user);
    
    // Test error case
    try {
      await fetchUserPromise(-1);
    } catch (error) {
      console.log('✅ Promise error handled:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Drill 1 failed:', error.message);
  }
}

// Run drill 1
drill1Demo();

// ====================================
// DRILL 2: Parallel API Fetching with Promise.all
// ====================================

/**
 * OBJECTIVE: Fetch data from multiple endpoints in parallel
 * 
 * This demonstrates how Promise.all can dramatically improve performance
 * by running multiple async operations simultaneously.
 */

setTimeout(() => {
  console.log('\n\n🚀 Starting Drill 2: Parallel API Fetching');
  drill2Demo();
}, 2500); // Give drill 1 time to complete

// Mock API functions (simulating different response times)
function fetchPosts() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post', author: 'Alice' },
        { id: 2, title: 'Second Post', author: 'Bob' }
      ]);
    }, 800);
  });
}

function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 2, name: 'Bob', role: 'user' }
      ]);
    }, 1200);
  });
}

function fetchComments() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, postId: 1, text: 'Great post!' },
        { id: 2, postId: 1, text: 'Thanks for sharing' }
      ]);
    }, 600);
  });
}

async function drill2Demo() {
  try {
    console.log('📊 Fetching data from multiple APIs...');
    const startTime = Date.now();
    
    // Method 1: Sequential (SLOW - Don't do this!)
    console.log('\n--- Sequential Approach (Slow) ---');
    const sequentialStart = Date.now();
    
    // These run one after another = 800 + 1200 + 600 = 2600ms total
    const postsSeq = await fetchPosts();
    const usersSeq = await fetchUsers();
    const commentsSeq = await fetchComments();
    
    const sequentialTime = Date.now() - sequentialStart;
    console.log(`⏱️  Sequential took: ${sequentialTime}ms`);
    console.log(`📝 Got ${postsSeq.length} posts, ${usersSeq.length} users, ${commentsSeq.length} comments`);
    
    // Method 2: Parallel with Promise.all (FAST!)
    console.log('\n--- Parallel Approach (Fast) ---');
    const parallelStart = Date.now();
    
    // These run simultaneously = max(800, 1200, 600) = 1200ms total
    const [posts, users, comments] = await Promise.all([
      fetchPosts(),
      fetchUsers(),
      fetchComments()
    ]);
    
    const parallelTime = Date.now() - parallelStart;
    console.log(`⏱️  Parallel took: ${parallelTime}ms`);
    console.log(`📝 Got ${posts.length} posts, ${users.length} users, ${comments.length} comments`);
    
    // Combine the data
    const combinedData = {
      posts,
      users,
      comments,
      summary: {
        totalPosts: posts.length,
        totalUsers: users.length,
        totalComments: comments.length,
        fetchTime: parallelTime
      }
    };
    
    console.log('\n✅ Combined result:', JSON.stringify(combinedData.summary, null, 2));
    
    const improvement = Math.round(((sequentialTime - parallelTime) / sequentialTime) * 100);
    console.log(`🚀 Performance improvement: ${improvement}% faster with parallel fetching!`);
    
  } catch (error) {
    console.error('❌ Drill 2 failed:', error.message);
  }
}

// ====================================
// DRILL 3: Handling Mixed Success/Failure with Promise.allSettled
// ====================================

/**
 * OBJECTIVE: Use Promise.allSettled to handle mixed results
 * 
 * Sometimes you want to attempt multiple operations and see which ones
 * succeed/fail, rather than failing fast like Promise.all does.
 */

setTimeout(() => {
  console.log('\n\n🚀 Starting Drill 3: Mixed Success/Failure Handling');
  drill3Demo();
}, 7000); // Give previous drills time to complete

// Mock API functions with different behaviors
function fetchReliableData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ source: 'reliable-api', data: 'Important data' });
    }, 500);
  });
}

function fetchUnreliableData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Service temporarily unavailable'));
    }, 300);
  });
}

function fetchSlowData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ source: 'slow-api', data: 'Eventually retrieved data' });
    }, 1500);
  });
}

// Simulate fetching from a broken URL
function fetchBrokenEndpoint() {
  return fetch('https://definitely-not-a-real-url-12345.com/api/data')
    .then(response => response.json());
}

async function drill3Demo() {
  try {
    console.log('🎯 Testing multiple endpoints with mixed reliability...');
    
    // Promise.all would fail if ANY promise rejects
    console.log('\n--- What happens with Promise.all? ---');
    try {
      await Promise.all([
        fetchReliableData(),
        fetchUnreliableData(), // This will cause Promise.all to reject
        fetchSlowData()
      ]);
    } catch (error) {
      console.log('❌ Promise.all failed due to one rejection:', error.message);
    }
    
    // Promise.allSettled waits for ALL to complete, regardless of success/failure
    console.log('\n--- Using Promise.allSettled instead ---');
    
    const results = await Promise.allSettled([
      fetchReliableData(),
      fetchUnreliableData(),
      fetchSlowData(),
      fetchBrokenEndpoint()
    ]);
    
    console.log('📊 All operations completed. Results:');
    
    // Process each result
    const processedResults = results.map((result, index) => {
      const endpoints = ['reliable-api', 'unreliable-api', 'slow-api', 'broken-endpoint'];
      const endpointName = endpoints[index];
      
      if (result.status === 'fulfilled') {
        console.log(`✅ ${endpointName}: SUCCESS`);
        console.log(`   Data:`, result.value);
        return {
          endpoint: endpointName,
          status: 'success',
          data: result.value
        };
      } else {
        console.log(`❌ ${endpointName}: FAILED`);
        console.log(`   Error:`, result.reason.message);
        return {
          endpoint: endpointName,
          status: 'failed',
          error: result.reason.message
        };
      }
    });
    
    // Get summary statistics
    const successful = processedResults.filter(r => r.status === 'success');
    const failed = processedResults.filter(r => r.status === 'failed');
    
    console.log('\n📈 Summary:');
    console.log(`   Successful: ${successful.length}/${processedResults.length}`);
    console.log(`   Failed: ${failed.length}/${processedResults.length}`);
    console.log(`   Success rate: ${Math.round((successful.length / processedResults.length) * 100)}%`);
    
    // In a real app, you might proceed with just the successful data
    const validData = successful.map(result => result.data);
    console.log('\n🎉 Proceeding with available data:', validData.length, 'successful responses');
    
  } catch (error) {
    console.error('❌ Drill 3 failed:', error.message);
  }
}

/*
================================================================================
## PROJECT: Lesson Scheduler API Client
================================================================================

**Objective:** Build a complete async JavaScript application that demonstrates:
- Fetching data from multiple sources in parallel
- Error handling for network requests
- Request cancellation with AbortController
- Data merging and transformation
- Loading states and user feedback

**What you'll learn:**
- Real-world Promise.allSettled usage
- AbortController for request cancellation
- Robust error handling patterns
- Performance optimization with parallel requests
- Data merging techniques

**Files needed:**
- HTML file with elements: #status, #schedule, #abort-btn, #reload-btn
- lessons.json (lesson data)
- instructors.json (instructor data)
- This JavaScript file

**How to test:**
1. Create an HTML file that includes this script
2. Serve the files from a local server (e.g., Live Server, Python server)
3. Open in browser and watch the data load
4. Try the abort button while loading
5. Test with network throttling to see loading states
*/

// Global controller for request cancellation
let currentController = null;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Lesson Scheduler initialized');
  
  // Get DOM elements
  const statusDiv = document.querySelector('#status');
  const scheduleContainer = document.querySelector('#schedule');
  const abortButton = document.querySelector('#abort-btn');
  const reloadButton = document.querySelector('#reload-btn');
  
  // Validate required DOM elements
  if (!statusDiv || !scheduleContainer || !abortButton) {
    console.error('❌ Missing required DOM elements. Please ensure your HTML has #status, #schedule, and #abort-btn elements.');
    return;
  }

  /**
   * Main function to fetch and merge schedule data
   * Uses Promise.allSettled for robust parallel fetching
   */
  async function fetchScheduleData() {
    // Create new controller for this request
    currentController = new AbortController();
    const { signal } = currentController;
    
    // Update UI to show loading state
    updateStatus('Loading schedule data...', 'loading');
    enableAbortButton(true);
    
    try {
      console.log('📡 Starting parallel data fetch...');
      const startTime = Date.now();
      
      // Fetch both datasets in parallel using Promise.allSettled
      // This won't fail if one request fails - we'll handle each result individually
      const [lessonsResult, instructorsResult] = await Promise.allSettled([
        fetch('./lessons.json', { signal }).then(response => {
          if (!response.ok) {
            throw new Error(`Lessons API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        }),
        fetch('./instructors.json', { signal }).then(response => {
          if (!response.ok) {
            throw new Error(`Instructors API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
      ]);
      
      const fetchTime = Date.now() - startTime;
      console.log(`⏱️  Data fetch completed in ${fetchTime}ms`);
      
      // Process results from Promise.allSettled
      const lessons = processSettledResult(lessonsResult, 'lessons');
      const instructors = processSettledResult(instructorsResult, 'instructors');
      
      // Check if we have the minimum required data
      if (!lessons || !instructors) {
        throw new Error('Failed to load essential schedule data');
      }
      
      console.log(`✅ Loaded ${lessons.length} lessons and ${instructors.length} instructors`);
      
      // Merge the datasets
      const mergedSchedule = mergeData(lessons, instructors);
      
      // Render the final result
      renderSchedule(mergedSchedule);
      updateStatus(`Successfully loaded ${mergedSchedule.length} lessons`, 'success');
      
    } catch (error) {
      handleFetchError(error);
    } finally {
      enableAbortButton(false);
      currentController = null;
    }
  }
  
  /**
   * Process individual results from Promise.allSettled
   * @param {Object} result - The settled promise result
   * @param {string} dataType - Human-readable name for logging
   * @returns {Array|null} The data array or null if failed
   */
  function processSettledResult(result, dataType) {
    if (result.status === 'fulfilled') {
      console.log(`✅ ${dataType} loaded successfully`);
      return result.value;
    } else {
      console.error(`❌ Failed to load ${dataType}:`, result.reason.message);
      return null;
    }
  }
  
  /**
   * Handle different types of fetch errors
   * @param {Error} error - The error to handle
   */
  function handleFetchError(error) {
    if (error.name === 'AbortError') {
      console.log('⛔ Request was cancelled by user');
      updateStatus('Request cancelled', 'cancelled');
    } else if (error.message.includes('fetch')) {
      console.error('🌐 Network error:', error.message);
      updateStatus('Network error - please check your connection', 'error');
    } else {
      console.error('❌ General error:', error.message);
      updateStatus(`Error: ${error.message}`, 'error');
    }
  }
  
  /**
   * Merge lessons with instructor information
   * @param {Array} lessons - Array of lesson objects
   * @param {Array} instructors - Array of instructor objects
   * @returns {Array} Merged lesson objects with instructor details
   */
  function mergeData(lessons, instructors) {
    console.log('⚙️  Merging lesson and instructor data...');
    
    // Create a lookup map for fast instructor access
    const instructorMap = new Map();
    instructors.forEach(instructor => {
      instructorMap.set(instructor.id, instructor);
    });
    
    console.log(`🗺️ Created instructor lookup map with ${instructorMap.size} entries`);
    
    // Merge lesson data with instructor information
    const mergedData = lessons.map(lesson => {
      const instructor = instructorMap.get(lesson.instructorId);
      
      if (!instructor) {
        console.warn(`⚠️ No instructor found for lesson "${lesson.title}" (ID: ${lesson.instructorId})`);
        return {
          ...lesson,
          instructor: {
            name: 'Unknown Instructor',
            email: 'N/A',
            rating: 0
          }
        };
      }
      
      return {
        ...lesson,
        instructor: {
          name: instructor.name,
          email: instructor.email,
          bio: instructor.bio,
          expertise: instructor.expertise,
          rating: instructor.rating,
          avatar: instructor.avatar,
          social: instructor.social
        }
      };
    });
    
    console.log(`✅ Successfully merged ${mergedData.length} lessons with instructor data`);
    return mergedData;
  }
  
  /**
   * Render the merged schedule data to the DOM
   * @param {Array} schedule - Array of merged lesson objects
   */
  function renderSchedule(schedule) {
    console.log('🎨 Rendering schedule to DOM...');
    
    if (!schedule || schedule.length === 0) {
      scheduleContainer.innerHTML = `
        <div class="empty-state">
          <h3>😅 No lessons found</h3>
          <p>It looks like there are no lessons scheduled at the moment.</p>
        </div>
      `;
      return;
    }
    
    // Sort lessons by difficulty and then by day
    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    const sortedSchedule = schedule.sort((a, b) => {
      const difficultyDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      if (difficultyDiff !== 0) return difficultyDiff;
      return a.schedule.day.localeCompare(b.schedule.day);
    });
    
    // Generate HTML for the schedule
    const scheduleHTML = `
      <div class="schedule-header">
        <h2>📅 Weekly Programming Schedule</h2>
        <p class="schedule-stats">Showing ${schedule.length} lessons across ${new Set(schedule.map(l => l.schedule.day)).size} days</p>
      </div>
      
      <div class="schedule-grid">
        ${sortedSchedule.map(lesson => createLessonCard(lesson)).join('')}
      </div>
      
      <div class="schedule-summary">
        <h3>📈 Quick Stats</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">${schedule.filter(l => l.difficulty === 'beginner').length}</span>
            <span class="stat-label">Beginner</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${schedule.filter(l => l.difficulty === 'intermediate').length}</span>
            <span class="stat-label">Intermediate</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${schedule.filter(l => l.difficulty === 'advanced').length}</span>
            <span class="stat-label">Advanced</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${Math.round(schedule.reduce((sum, l) => sum + l.duration, 0) / 60)}</span>
            <span class="stat-label">Total Hours</span>
          </div>
        </div>
      </div>
    `;
    
    scheduleContainer.innerHTML = scheduleHTML;
    console.log('✅ Schedule rendered successfully');
  }
  
  /**
   * Create HTML for an individual lesson card
   * @param {Object} lesson - Lesson object with merged instructor data
   * @returns {string} HTML string for the lesson card
   */
  function createLessonCard(lesson) {
    const difficultyColors = {
      beginner: '#22c55e',
      intermediate: '#f59e0b', 
      advanced: '#ef4444'
    };
    
    const difficultyColor = difficultyColors[lesson.difficulty] || '#6b7280';
    
    return `
      <div class="lesson-card" data-difficulty="${lesson.difficulty}">
        <div class="lesson-header">
          <h3 class="lesson-title">${lesson.title}</h3>
          <span class="difficulty-badge" style="background-color: ${difficultyColor}">
            ${lesson.difficulty.toUpperCase()}
          </span>
        </div>
        
        <p class="lesson-description">${lesson.description}</p>
        
        <div class="lesson-schedule">
          <div class="schedule-item">
            <span class="schedule-icon">📅</span>
            <span>${lesson.schedule.day} at ${lesson.schedule.time}</span>
          </div>
          <div class="schedule-item">
            <span class="schedule-icon">📍</span>
            <span>Room ${lesson.schedule.room}</span>
          </div>
          <div class="schedule-item">
            <span class="schedule-icon">⏱️</span>
            <span>${lesson.duration} minutes</span>
          </div>
        </div>
        
        <div class="instructor-info">
          <img src="${lesson.instructor.avatar}" alt="${lesson.instructor.name}" class="instructor-avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2Yjc2ODMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjwvdGV4dD4KPC9zdmc+'">
          <div class="instructor-details">
            <div class="instructor-name">${lesson.instructor.name}</div>
            <div class="instructor-rating">
              ${'★'.repeat(Math.floor(lesson.instructor.rating))}${lesson.instructor.rating % 1 ? '☆' : ''}
              <span class="rating-number">${lesson.instructor.rating}</span>
            </div>
          </div>
        </div>
        
        <div class="lesson-topics">
          <h4>What you'll learn:</h4>
          <ul>
            ${lesson.topics.map(topic => `<li>${topic}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
  
  /**
   * Update the status message and styling
   * @param {string} message - Status message to display
   * @param {string} type - Status type (loading, success, error, cancelled)
   */
  function updateStatus(message, type = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = `status status-${type}`;
  }
  
  /**
   * Enable or disable the abort button
   * @param {boolean} enabled - Whether the button should be enabled
   */
  function enableAbortButton(enabled) {
    if (abortButton) {
      abortButton.disabled = !enabled;
      abortButton.textContent = enabled ? 'Cancel Request' : 'Abort Request';
    }
  }
  
  // Event Listeners
  
  // Abort button - cancel current request
  if (abortButton) {
    abortButton.addEventListener('click', () => {
      if (currentController) {
        console.log('⛔ User requested abort');
        currentController.abort();
      }
    });
  }
  
  // Reload button - fetch data again
  if (reloadButton) {
    reloadButton.addEventListener('click', () => {
      console.log('🔄 User requested reload');
      scheduleContainer.innerHTML = '';
      fetchScheduleData();
    });
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + R to reload (prevent default browser reload)
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
      event.preventDefault();
      scheduleContainer.innerHTML = '';
      fetchScheduleData();
    }
    
    // Escape key to abort current request
    if (event.key === 'Escape' && currentController) {
      currentController.abort();
    }
  });
  
  // Add CSS styles dynamically (for demo purposes)
  const styles = `
    <style>
    .status {
      padding: 12px 16px;
      border-radius: 6px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .status-loading { background: #dbeafe; color: #1e40af; }
    .status-success { background: #dcfce7; color: #166534; }
    .status-error { background: #fee2e2; color: #991b1b; }
    .status-cancelled { background: #f3f4f6; color: #374151; }
    
    .schedule-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .schedule-stats {
      color: #6b7280;
      margin: 8px 0;
    }
    
    .schedule-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    
    .lesson-card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .lesson-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .lesson-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 12px;
    }
    .lesson-title {
      margin: 0;
      color: #1f2937;
      font-size: 1.2em;
    }
    .difficulty-badge {
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75em;
      font-weight: 600;
    }
    
    .lesson-description {
      color: #6b7280;
      margin-bottom: 16px;
      line-height: 1.5;
    }
    
    .lesson-schedule {
      margin-bottom: 16px;
    }
    .schedule-item {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      font-size: 0.9em;
    }
    .schedule-icon {
      margin-right: 8px;
      width: 16px;
    }
    
    .instructor-info {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .instructor-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
    }
    .instructor-name {
      font-weight: 600;
      color: #1f2937;
    }
    .instructor-rating {
      color: #f59e0b;
      font-size: 0.9em;
    }
    .rating-number {
      color: #6b7280;
      margin-left: 4px;
    }
    
    .lesson-topics h4 {
      margin: 0 0 8px 0;
      color: #374151;
      font-size: 0.95em;
    }
    .lesson-topics ul {
      margin: 0;
      padding-left: 16px;
      color: #6b7280;
    }
    .lesson-topics li {
      margin-bottom: 4px;
    }
    
    .schedule-summary {
      background: #f9fafb;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stat-number {
      font-size: 2em;
      font-weight: 700;
      color: #1f2937;
    }
    .stat-label {
      font-size: 0.9em;
      color: #6b7280;
      margin-top: 4px;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #6b7280;
    }
    
    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      margin: 0 4px;
    }
    button:hover { background: #2563eb; }
    button:disabled { 
      background: #9ca3af; 
      cursor: not-allowed; 
    }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', styles);
  
  // Initialize the app
  console.log('🎉 Starting initial data load...');
  fetchScheduleData();
});
