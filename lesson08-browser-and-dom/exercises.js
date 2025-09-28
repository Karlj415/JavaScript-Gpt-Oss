/*
====================================
LESSON 08: PRACTICE DRILLS
====================================

Time: 60 minutes
Goal: Master DOM manipulation and performance

------------------------------------
DRILL 1: Dynamic Dashboard
------------------------------------
Challenge: Build a lesson dashboard with real-time updates
Why This Matters: Most web apps involve dynamic content rendering
*/

// Solution 1: Dynamic Dashboard
function createLessonDashboard() {
    // Sample data
    const lessons = [
        { id: 1, title: 'JavaScript Basics', duration: 45, completed: true, difficulty: 'beginner' },
        { id: 2, title: 'Functions & Scope', duration: 60, completed: true, difficulty: 'intermediate' },
        { id: 3, title: 'Async Programming', duration: 90, completed: false, difficulty: 'advanced' },
        { id: 4, title: 'DOM Manipulation', duration: 75, completed: false, difficulty: 'intermediate' },
        { id: 5, title: 'Event Handling', duration: 60, completed: false, difficulty: 'intermediate' }
    ];
    
    // Create container if it doesn't exist
    let container = document.querySelector('#dashboard');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dashboard';
        container.className = 'lesson-dashboard';
        document.body.appendChild(container);
    }
    
    // Add styles
    if (!document.querySelector('#dashboard-styles')) {
        const style = document.createElement('style');
        style.id = 'dashboard-styles';
        style.textContent = `
            .lesson-dashboard {
                font-family: system-ui, -apple-system, sans-serif;
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
            }
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e0e0e0;
            }
            .stats {
                display: flex;
                gap: 20px;
            }
            .stat {
                text-align: center;
            }
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #2196F3;
            }
            .stat-label {
                font-size: 12px;
                color: #666;
                text-transform: uppercase;
            }
            .lesson-card {
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 16px;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            .lesson-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateY(-2px);
            }
            .lesson-card.completed {
                background: #f0f9ff;
                border-color: #4CAF50;
            }
            .lesson-status {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .lesson-card.completed .lesson-status {
                background: #4CAF50;
                border-color: #4CAF50;
                color: white;
            }
            .lesson-info {
                flex: 1;
            }
            .lesson-title {
                font-weight: 600;
                margin-bottom: 4px;
            }
            .lesson-meta {
                display: flex;
                gap: 16px;
                font-size: 14px;
                color: #666;
            }
            .difficulty {
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }
            .difficulty.beginner { background: #E8F5E9; color: #2E7D32; }
            .difficulty.intermediate { background: #FFF3E0; color: #F57C00; }
            .difficulty.advanced { background: #FFEBEE; color: #C62828; }
        `;
        document.head.appendChild(style);
    }
    
    // Calculate statistics
    const stats = {
        total: lessons.length,
        completed: lessons.filter(l => l.completed).length,
        totalTime: lessons.reduce((sum, l) => sum + l.duration, 0),
        completedTime: lessons.filter(l => l.completed).reduce((sum, l) => sum + l.duration, 0)
    };
    stats.progress = Math.round((stats.completed / stats.total) * 100);
    
    // Build dashboard HTML
    const fragment = document.createDocumentFragment();
    
    // Header with stats
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    header.innerHTML = `
        <h2>Lesson Dashboard</h2>
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${stats.progress}%</div>
                <div class="stat-label">Complete</div>
            </div>
            <div class="stat">
                <div class="stat-value">${stats.completed}/${stats.total}</div>
                <div class="stat-label">Lessons</div>
            </div>
            <div class="stat">
                <div class="stat-value">${stats.completedTime}/${stats.totalTime}</div>
                <div class="stat-label">Minutes</div>
            </div>
        </div>
    `;
    fragment.appendChild(header);
    
    // Lesson cards
    const lessonList = document.createElement('div');
    lessonList.className = 'lesson-list';
    
    lessons.forEach(lesson => {
        const card = document.createElement('div');
        card.className = `lesson-card ${lesson.completed ? 'completed' : ''}`;
        card.dataset.lessonId = lesson.id;
        
        card.innerHTML = `
            <div class="lesson-status">
                ${lesson.completed ? '✓' : ''}
            </div>
            <div class="lesson-info">
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-meta">
                    <span>🕒 ${lesson.duration} min</span>
                    <span class="difficulty ${lesson.difficulty}">${lesson.difficulty}</span>
                </div>
            </div>
        `;
        
        // Add click handler to toggle completion
        card.addEventListener('click', function() {
            lesson.completed = !lesson.completed;
            this.classList.toggle('completed');
            const status = this.querySelector('.lesson-status');
            status.textContent = lesson.completed ? '✓' : '';
            
            // Update stats
            updateDashboardStats();
        });
        
        lessonList.appendChild(card);
    });
    
    fragment.appendChild(lessonList);
    
    // Clear and append
    container.innerHTML = '';
    container.appendChild(fragment);
    
    // Helper to update stats
    function updateDashboardStats() {
        const completed = lessons.filter(l => l.completed).length;
        const progress = Math.round((completed / lessons.length) * 100);
        const completedTime = lessons.filter(l => l.completed).reduce((sum, l) => sum + l.duration, 0);
        
        container.querySelector('.stats').innerHTML = `
            <div class="stat">
                <div class="stat-value">${progress}%</div>
                <div class="stat-label">Complete</div>
            </div>
            <div class="stat">
                <div class="stat-value">${completed}/${lessons.length}</div>
                <div class="stat-label">Lessons</div>
            </div>
            <div class="stat">
                <div class="stat-value">${completedTime}/${stats.totalTime}</div>
                <div class="stat-label">Minutes</div>
            </div>
        `;
    }
}

/*
------------------------------------
DRILL 2: Tabbed Navigation
------------------------------------
Challenge: Create a tab component with smooth transitions
Why This Matters: Common UI pattern in SPAs and dashboards
*/

function createTabbedInterface() {
    // Tab data
    const tabs = [
        { 
            id: 'overview', 
            label: 'Overview', 
            content: 'This is the overview tab. It provides a general summary of the course.',
            icon: '📊'
        },
        { 
            id: 'lessons', 
            label: 'Lessons', 
            content: 'Here you will find all the lessons in sequential order.',
            icon: '📚'
        },
        { 
            id: 'resources', 
            label: 'Resources', 
            content: 'Additional learning resources and references.',
            icon: '🔗'
        },
        { 
            id: 'progress', 
            label: 'Progress', 
            content: 'Track your learning progress and achievements.',
            icon: '🏆'
        }
    ];
    
    // Create container
    const container = document.createElement('div');
    container.className = 'tab-container';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .tab-container {
            max-width: 600px;
            margin: 40px auto;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .tab-nav {
            display: flex;
            border-bottom: 2px solid #e0e0e0;
            gap: 4px;
        }
        .tab-button {
            padding: 12px 24px;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            font-size: 16px;
            color: #666;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .tab-button:hover {
            background: #f5f5f5;
            color: #333;
        }
        .tab-button.active {
            color: #2196F3;
            border-bottom-color: #2196F3;
            font-weight: 600;
        }
        .tab-content {
            padding: 24px;
            min-height: 200px;
            background: white;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }
        .tab-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .tab-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Create tab navigation
    const nav = document.createElement('div');
    nav.className = 'tab-nav';
    
    // Create content area
    const contentArea = document.createElement('div');
    contentArea.className = 'tab-content';
    
    // Build tabs
    tabs.forEach((tab, index) => {
        // Create button
        const button = document.createElement('button');
        button.className = `tab-button ${index === 0 ? 'active' : ''}`;
        button.dataset.tabId = tab.id;
        button.innerHTML = `<span>${tab.icon}</span><span>${tab.label}</span>`;
        
        // Create panel
        const panel = document.createElement('div');
        panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
        panel.id = `panel-${tab.id}`;
        panel.innerHTML = `
            <h3>${tab.icon} ${tab.label}</h3>
            <p>${tab.content}</p>
            <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
                <strong>Tab ID:</strong> ${tab.id}<br>
                <strong>Status:</strong> <span style="color: #4CAF50;">Active</span>
            </div>
        `;
        
        // Add click handler
        button.addEventListener('click', () => {
            // Update buttons
            nav.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Update panels
            contentArea.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(`panel-${tab.id}`).classList.add('active');
        });
        
        nav.appendChild(button);
        contentArea.appendChild(panel);
    });
    
    // Assemble and add to page
    container.appendChild(nav);
    container.appendChild(contentArea);
    document.body.appendChild(container);
}

/*
------------------------------------
DRILL 3: Todo List with DocumentFragment
------------------------------------
Challenge: Efficient bulk DOM operations
Why This Matters: Performance optimization for large lists
*/

function createTodoList() {
    // Initial todos
    const initialTodos = [
        { id: 1, text: 'Learn DOM manipulation', completed: true },
        { id: 2, text: 'Practice event handling', completed: false },
        { id: 3, text: 'Master async JavaScript', completed: false },
        { id: 4, text: 'Build a real project', completed: false },
        { id: 5, text: 'Study performance optimization', completed: false }
    ];
    
    // Create main container
    const app = document.createElement('div');
    app.className = 'todo-app';
    app.innerHTML = `
        <h2>📋 Todo List</h2>
        <div class="todo-input-group">
            <input type="text" id="new-todo" placeholder="Add a new todo..." />
            <button id="add-todo">Add</button>
        </div>
        <div class="todo-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
        <ul id="todo-list"></ul>
        <div class="todo-stats">
            <span id="items-left">0 items left</span>
            <button id="clear-completed">Clear completed</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .todo-app {
            max-width: 500px;
            margin: 40px auto;
            padding: 20px;
            font-family: system-ui;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        .todo-input-group {
            display: flex;
            gap: 8px;
            margin: 20px 0;
        }
        #new-todo {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        #add-todo {
            padding: 12px 24px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .todo-filters {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
        }
        .filter-btn {
            padding: 6px 12px;
            background: #f5f5f5;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .filter-btn.active {
            background: #2196F3;
            color: white;
        }
        #todo-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border-bottom: 1px solid #eee;
            transition: background 0.2s;
        }
        .todo-item:hover {
            background: #f9f9f9;
        }
        .todo-checkbox {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            cursor: pointer;
        }
        .todo-text {
            flex: 1;
            font-size: 16px;
        }
        .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: #999;
        }
        .todo-delete {
            background: #ff5252;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .todo-item:hover .todo-delete {
            opacity: 1;
        }
        .todo-stats {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #eee;
            color: #666;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(app);
    
    const list = document.getElementById('todo-list');
    const input = document.getElementById('new-todo');
    const addBtn = document.getElementById('add-todo');
    const itemsLeft = document.getElementById('items-left');
    const clearBtn = document.getElementById('clear-completed');
    
    let todos = [...initialTodos];
    let currentFilter = 'all';
    let nextId = 6;
    
    // Render todos using DocumentFragment for efficiency
    function renderTodos() {
        const fragment = document.createDocumentFragment();
        
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.todoId = todo.id;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(todo.id));
            
            const text = document.createElement('span');
            text.className = 'todo-text';
            text.textContent = todo.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'todo-delete';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
            
            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteBtn);
            fragment.appendChild(li);
        });
        
        list.innerHTML = '';
        list.appendChild(fragment);
        updateStats();
    }
    
    function addTodo() {
        const text = input.value.trim();
        if (!text) return;
        
        todos.push({ id: nextId++, text, completed: false });
        input.value = '';
        renderTodos();
    }
    
    function toggleTodo(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            renderTodos();
        }
    }
    
    function deleteTodo(id) {
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    }
    
    function updateStats() {
        const active = todos.filter(t => !t.completed).length;
        itemsLeft.textContent = `${active} item${active !== 1 ? 's' : ''} left`;
    }
    
    // Event listeners
    addBtn.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    
    clearBtn.addEventListener('click', () => {
        todos = todos.filter(t => !t.completed);
        renderTodos();
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });
    
    // Initial render
    renderTodos();
}

// Run all drills
document.addEventListener('DOMContentLoaded', () => {
    createLessonDashboard();
    createTabbedInterface();
    createTodoList();
});

/*
====================================
PROJECT: Interactive Course Catalog
====================================

Time: 90 minutes
Difficulty: Intermediate

Your Mission:
Build a complete course catalog with filtering, favorites, and search.
Use modern DOM APIs, event delegation, and performance optimizations.

What You'll Practice:
- Fetching and rendering JSON data
- DocumentFragment for performance
- Event delegation pattern
- Dynamic filtering and search
- LocalStorage for persistence
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
