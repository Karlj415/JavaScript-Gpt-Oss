// =============================================================================
// 🎯 PRACTICE DRILLS - Master Express.js Fundamentals
// =============================================================================

/*
📝 DRILL 1: CRUD OPERATIONS MASTERY
Objective: Build a complete lessons resource with full CRUD operations

What You'll Learn:
- RESTful endpoint design
- HTTP status codes usage
- Request/response handling
- In-memory data management

Tasks:
1. Create an Express app with these endpoints:
   - GET /api/lessons - List all lessons
   - POST /api/lessons - Create a new lesson
   - GET /api/lessons/:id - Get a specific lesson
   - PUT /api/lessons/:id - Update a lesson
   - DELETE /api/lessons/:id - Delete a lesson

2. Use this data structure for lessons:
   {
     id: number,
     title: string,
     description: string,
     duration: number, // minutes
     difficulty: 'beginner' | 'intermediate' | 'advanced',
     topics: string[],
     createdAt: Date,
     updatedAt: Date
   }

3. Implement proper HTTP status codes:
   - 200 for successful GET/PUT
   - 201 for successful POST
   - 204 for successful DELETE
   - 400 for validation errors
   - 404 for not found

4. Add pagination to GET /api/lessons:
   - ?page=1&limit=10
   - Return total count in response

5. Add search functionality:
   - ?search=javascript (searches title and description)
   - ?difficulty=beginner (filter by difficulty)
*/

/*
📝 DRILL 2: CUSTOM MIDDLEWARE CREATION
Objective: Build reusable middleware functions

What You'll Learn:
- Middleware execution order
- Request/response modification
- Error handling in middleware
- Conditional middleware execution

Tasks:
1. Request Logger Middleware:
   - Log timestamp, method, URL, and IP address
   - Calculate and log response time
   - Use different colors for different HTTP methods

2. API Key Authentication Middleware:
   - Check for 'X-API-Key' header
   - Validate against a list of valid keys
   - Add user info to req object
   - Return 401 if invalid/missing

3. Rate Limiting Middleware:
   - Limit requests per IP address
   - 100 requests per 15-minute window
   - Return 429 with retry-after header
   - Store rate limit data in memory

4. Request Validation Middleware:
   - Validate request body structure
   - Sanitize input data
   - Return detailed validation errors
   - Support different validation rules per endpoint
*/

/*
📝 DRILL 3: ERROR HANDLING MASTERY
Objective: Implement comprehensive error handling

What You'll Learn:
- Global error handling
- Custom error classes
- Error logging strategies
- Development vs production errors

Tasks:
1. Create Custom Error Classes:
   - ValidationError (400)
   - NotFoundError (404)
   - UnauthorizedError (401)
   - ConflictError (409)

2. Global Error Handler:
   - Log errors with context information
   - Return appropriate error responses
   - Hide sensitive info in production
   - Include request ID for debugging

3. Async Error Wrapper:
   - Create asyncHandler utility
   - Eliminate try-catch repetition
   - Automatically pass errors to global handler

4. Error Recovery:
   - Graceful degradation strategies
   - Retry mechanisms for external services
   - Circuit breaker patterns
*/

/*
📝 DRILL 4: API TESTING WITH VITEST
Objective: Write comprehensive integration tests

What You'll Learn:
- API testing strategies
- Test data management
- Assertion techniques
- Test environment setup

Tasks:
1. Setup Testing Environment:
   - Install vitest and supertest
   - Create test database/data
   - Setup test configuration

2. Write Test Cases:
   - Happy path tests (200, 201, 204)
   - Error path tests (400, 404, 422)
   - Edge cases and boundary conditions
   - Authentication and authorization tests

3. Test Utilities:
   - Helper functions for test data
   - Authentication token generators
   - Database cleanup functions
   - Response assertion helpers

4. Test Coverage:
   - All CRUD operations
   - Middleware functionality
   - Error handling scenarios
   - Performance and load testing
*/

// =============================================================================
// 🛠️ STARTER CODE FOR PRACTICE DRILLS
// =============================================================================

/* 
// Basic Express app setup for practice drills
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// In-memory "database" for lessons
let lessons = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming",
    duration: 120,
    difficulty: "beginner",
    topics: ["variables", "functions", "loops"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master complex React development patterns",
    duration: 180,
    difficulty: "advanced",
    topics: ["hooks", "context", "performance"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let nextId = 3;

// Your CRUD endpoints go here...
// GET /api/lessons
// POST /api/lessons
// GET /api/lessons/:id
// PUT /api/lessons/:id
// DELETE /api/lessons/:id

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
*/

// =============================================================================
// 🎨 MAIN PROJECT: LEARNING TRACKER API
// =============================================================================

/*
🎯 PROJECT OVERVIEW

Build a professional Express.js API for tracking learning progress with:
- 📁 Professional 3-layer architecture
- 🛡️ Production-ready middleware
- 📊 Health monitoring and logging
- ⚙️ Environment-based configuration
- 💡 Comprehensive error handling
- 🗺️ RESTful API design
- 🧪 Integration testing

🎆 LEARNING OUTCOMES
After completing this project, you'll understand how to:
- Structure a scalable Express.js application
- Implement professional API architecture patterns
- Handle errors gracefully in production
- Write comprehensive API tests
- Configure apps for different environments
- Monitor API health and performance
*/

/*
🛍️ STEP 1: PROJECT SETUP

1. Initialize your project:
   ```bash
   mkdir learning-tracker-api
   cd learning-tracker-api
   npm init -y
   ```

2. Update package.json:
   ```json
   {
     "name": "learning-tracker-api",
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "dev": "node --watch src/server.js",
       "start": "node src/server.js",
       "test": "vitest",
       "test:coverage": "vitest --coverage"
     }
   }
   ```

3. Install dependencies:
   ```bash
   # Production dependencies
   npm install express morgan cors helmet joi dotenv
   
   # Development dependencies  
   npm install --save-dev vitest supertest @vitest/coverage-v8
   ```

4. Create environment files:
   ```bash
   # .env (development)
   NODE_ENV=development
   PORT=3000
   API_VERSION=v1
   
   # .env.production
   NODE_ENV=production
   PORT=8080
   API_VERSION=v1
   ```
*/

/*
📁 STEP 2: PROFESSIONAL FOLDER STRUCTURE

Create this folder structure:
```
learning-tracker-api/
├── src/
│   ├── server.js              # Application entry point
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── environment.js     # Environment variables
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   ├── validation.js     # Request validation
│   │   ├── rateLimiter.js    # Rate limiting
│   │   └── errorHandler.js   # Global error handling
│   ├── routes/
│   │   ├── index.js          # Main router
│   │   ├── tracks.js         # Learning tracks routes
│   │   └── health.js         # Health check routes
│   ├── controllers/
│   │   ├── trackController.js
│   │   └── healthController.js
│   ├── services/
│   │   └── trackService.js    # Business logic
│   ├── repositories/
│   │   └── trackRepository.js # Data access
│   └── utils/
│       ├── logger.js         # Logging utility
│       └── validators.js     # Custom validations
├── tests/
│   ├── integration/
│   │   └── tracks.test.js
│   └── helpers/
│       └── testUtils.js
├── docs/
│   └── api.md
├── .env
├── .env.production
├── .gitignore
└── package.json
```
*/

/*
📊 STEP 3: DATA MODEL DESIGN

Your API will manage learning tracks with this structure:

```javascript
// Learning Track Data Structure
{
  id: string,           // Unique identifier
  name: string,         // Track name (e.g., "Full-Stack JavaScript")
  description: string,  // Track description
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  estimatedHours: number, // Total estimated completion time
  tags: string[],       // Technology tags
  lessons: [
    {
      id: string,
      title: string,
      description: string,
      duration: number,   // Minutes
      completed: boolean,
      completedAt: Date | null,
      resources: [
        {
          type: 'video' | 'article' | 'exercise',
          url: string,
          title: string
        }
      ]
    }
  ],
  progress: {
    totalLessons: number,
    completedLessons: number,
    percentComplete: number,
    hoursSpent: number
  },
  createdAt: Date,
  updatedAt: Date,
  createdBy: string     // User ID (for authentication)
}
```
*/

/*
🗺️ STEP 4: API ENDPOINTS SPECIFICATION

Implement these RESTful endpoints:

**Learning Tracks**
- GET    /api/v1/tracks              # List all tracks (with pagination)
- POST   /api/v1/tracks              # Create new track
- GET    /api/v1/tracks/:id          # Get specific track
- PUT    /api/v1/tracks/:id          # Update track
- DELETE /api/v1/tracks/:id          # Delete track

**Track Lessons**
- GET    /api/v1/tracks/:id/lessons                    # List track lessons
- POST   /api/v1/tracks/:id/lessons                    # Add lesson to track
- PUT    /api/v1/tracks/:id/lessons/:lessonId         # Update lesson
- DELETE /api/v1/tracks/:id/lessons/:lessonId         # Remove lesson
- PATCH  /api/v1/tracks/:id/lessons/:lessonId/complete # Mark lesson complete

**Progress & Analytics**
- GET    /api/v1/tracks/:id/progress   # Get track progress
- GET    /api/v1/analytics/summary     # Overall learning analytics

**System Endpoints**
- GET    /api/v1/health               # Health check
- GET    /api/v1/metrics              # API metrics
*/

/*
🛍️ STEP 5: QUERY PARAMETERS & FILTERING

Support these query parameters for GET /api/v1/tracks:

**Pagination**
- page=1         # Page number (default: 1)
- limit=10       # Items per page (default: 10, max: 100)

**Filtering**
- difficulty=beginner    # Filter by difficulty level
- tags=javascript,react  # Filter by tags (comma-separated)
- search=node           # Search in name and description
- completed=true        # Show only completed/incomplete tracks

**Sorting**
- sort=name         # Sort field (name, createdAt, progress)
- order=asc         # Sort order (asc, desc)

**Example Request:**
GET /api/v1/tracks?page=2&limit=5&difficulty=intermediate&sort=name&order=desc
*/

/*
🛡️ STEP 6: MIDDLEWARE IMPLEMENTATION

Implement these middleware functions:

1. **Request Logger** - Log all requests with timing
2. **Rate Limiter** - Prevent API abuse
3. **Authentication** - API key validation
4. **Validation** - Request body validation with Joi
5. **Error Handler** - Global error processing
6. **Security Headers** - Using Helmet.js
7. **CORS** - Cross-origin request handling
8. **Request ID** - Add unique ID to each request
*/

/*
🧪 STEP 7: TESTING STRATEGY

Write comprehensive tests:

**Integration Tests:**
- All CRUD operations for tracks
- Lesson management operations
- Error handling scenarios
- Authentication flows
- Query parameter functionality

**Test Structure:**
```javascript
describe('Learning Tracks API', () => {
  describe('GET /api/v1/tracks', () => {
    it('should return paginated tracks list', async () => {
      // Test implementation
    });
    
    it('should filter tracks by difficulty', async () => {
      // Test implementation
    });
    
    it('should return 401 without API key', async () => {
      // Test implementation
    });
  });
});
```

**Test Data Setup:**
- Create test fixtures
- Database seeding functions
- Cleanup utilities
- Mock external services
*/

/*
📊 STEP 8: MONITORING & HEALTH CHECKS

Implement comprehensive monitoring:

**Health Check Endpoint (GET /api/v1/health):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "uptime": 3600,
  "memory": {
    "used": "45.2MB",
    "total": "128MB"
  },
  "dependencies": {
    "database": "connected",
    "redis": "connected"
  }
}
```

**Metrics Endpoint (GET /api/v1/metrics):**
```json
{
  "requests": {
    "total": 1234,
    "success": 1180,
    "errors": 54
  },
  "performance": {
    "averageResponseTime": "125ms",
    "slowestEndpoint": "/api/v1/tracks"
  },
  "usage": {
    "activeUsers": 45,
    "tracksCreated": 123,
    "lessonsCompleted": 456
  }
}
```
*/

// =============================================================================
// 🔥 STARTER CODE - FULL IMPLEMENTATION
// =============================================================================

/*
// This is a complete implementation of the Learning Tracker API
// Use it as a reference for building your own solution

// ------------------------------------------------------
// src/config/environment.js
// ------------------------------------------------------
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Add any API keys or secrets here
  apiKeys: (process.env.API_KEYS || 'test-key-1,test-key-2').split(','),
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Max requests per window
  }
};

// ------------------------------------------------------
// src/utils/logger.js
// ------------------------------------------------------
const logger = {
  info: (message, meta = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
  },
  error: (message, meta = {}) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta);
  },
  warn: (message, meta = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta);
  },
  debug: (message, meta = {}) => {
    if (config.env !== 'production') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta);
    }
  }
};

export default logger;

// ------------------------------------------------------
// src/utils/validators.js
// ------------------------------------------------------
import joi from 'joi';

// Track schema validation
export const trackSchema = joi.object({
  name: joi.string().min(3).max(100).required(),
  description: joi.string().min(10).max(500).required(),
  difficulty: joi.string().valid('beginner', 'intermediate', 'advanced').required(),
  estimatedHours: joi.number().min(1).max(1000).required(),
  tags: joi.array().items(joi.string()).min(1).required()
});

// Lesson schema validation
export const lessonSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().min(10).max(500).required(),
  duration: joi.number().min(1).max(480).required(), // Max 8 hours (480 minutes)
  resources: joi.array().items(joi.object({
    type: joi.string().valid('video', 'article', 'exercise').required(),
    url: joi.string().uri().required(),
    title: joi.string().min(3).max(100).required()
  }))
});

// ------------------------------------------------------
// src/middleware/auth.js
// ------------------------------------------------------
import { config } from '../config/environment.js';
import logger from '../utils/logger.js';

export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  
  // Skip auth for health check endpoint
  if (req.path.includes('/health')) {
    return next();
  }
  
  if (!apiKey || !config.apiKeys.includes(apiKey)) {
    logger.warn('Invalid API key', { apiKey, ip: req.ip });
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid API key is required'
    });
  }
  
  // Add user info to request for later use
  req.user = {
    key: apiKey,
    id: apiKey === 'test-key-1' ? 'user-1' : 'user-2'
  };
  
  next();
};

// ------------------------------------------------------
// src/middleware/errorHandler.js
// ------------------------------------------------------
import { config } from '../config/environment.js';
import logger from '../utils/logger.js';

// Custom API error class
export class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // Used to distinguish operational errors
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Default to 500 internal server error
  const statusCode = err.statusCode || 500;
  
  // Log error details
  logger.error(`${statusCode} - ${err.message}`, {
    path: req.path,
    method: req.method,
    requestId: req.id,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
      details: err.details
    }
  });
  
  // Send appropriate response
  res.status(statusCode).json({
    error: {
      message: err.message,
      ...(config.env !== 'production' && { stack: err.stack }),
      ...(err.details && { details: err.details }),
      code: err.name,
      requestId: req.id
    }
  });
};

// 404 Not found handler
export const notFoundHandler = (req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  
  res.status(404).json({
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      code: 'NOT_FOUND',
      requestId: req.id
    }
  });
};

// Wrapper for async route handlers to catch errors automatically
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ------------------------------------------------------
// src/repositories/trackRepository.js
// ------------------------------------------------------
import { ApiError } from '../middleware/errorHandler.js';

// In-memory data store
const tracks = new Map();
let nextId = 1;

// Helper to generate dummy data for testing
const generateDummyData = () => {
  const dummyTracks = [
    {
      id: String(nextId++),
      name: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming",
      difficulty: "beginner",
      estimatedHours: 20,
      tags: ["javascript", "programming", "web"],
      lessons: [
        {
          id: "lesson-1",
          title: "Variables and Data Types",
          description: "Learn about variables, scope, and primitive data types",
          duration: 45,
          completed: false,
          completedAt: null,
          resources: [
            {
              type: "video",
              url: "https://example.com/js-variables-video",
              title: "JavaScript Variables Explained"
            }
          ]
        }
      ],
      progress: {
        totalLessons: 1,
        completedLessons: 0,
        percentComplete: 0,
        hoursSpent: 0
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "user-1"
    },
    {
      id: String(nextId++),
      name: "Node.js API Development",
      description: "Build production-ready APIs with Node.js and Express",
      difficulty: "intermediate",
      estimatedHours: 15,
      tags: ["node", "express", "api"],
      lessons: [],
      progress: {
        totalLessons: 0,
        completedLessons: 0,
        percentComplete: 0,
        hoursSpent: 0
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "user-2"
    }
  ];
  
  // Add to store
  dummyTracks.forEach(track => {
    tracks.set(track.id, track);
  });
};

// Initialize with dummy data
generateDummyData();

export const repository = {
  // Get all tracks with filtering and pagination
  findAll: (options = {}) => {
    const {
      page = 1,
      limit = 10,
      search,
      difficulty,
      tags,
      sort = 'createdAt',
      order = 'desc',
      createdBy
    } = options;
    
    let result = Array.from(tracks.values());
    
    // Filtering
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(track => {
        return track.name.toLowerCase().includes(searchLower) ||
               track.description.toLowerCase().includes(searchLower);
      });
    }
    
    if (difficulty) {
      result = result.filter(track => track.difficulty === difficulty);
    }
    
    if (tags) {
      const tagsArray = tags.split(',');
      result = result.filter(track => {
        return tagsArray.some(tag => track.tags.includes(tag));
      });
    }
    
    if (createdBy) {
      result = result.filter(track => track.createdBy === createdBy);
    }
    
    // Sorting
    const sortFn = (a, b) => {
      if (sort === 'name') {
        return order === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sort === 'createdAt') {
        return order === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === 'difficulty') {
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        return order === 'asc'
          ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      }
      return 0;
    };
    
    result.sort(sortFn);
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResult = result.slice(startIndex, endIndex);
    
    return {
      data: paginatedResult,
      pagination: {
        total: result.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(result.length / limit),
        hasMore: endIndex < result.length
      }
    };
  },
  
  // Find track by ID
  findById: (id) => {
    const track = tracks.get(id);
    if (!track) return null;
    return track;
  },
  
  // Create new track
  create: (trackData, userId) => {
    const id = String(nextId++);
    
    // Initialize progress object
    const progress = {
      totalLessons: 0,
      completedLessons: 0,
      percentComplete: 0,
      hoursSpent: 0
    };
    
    const newTrack = {
      id,
      ...trackData,
      lessons: [],
      progress,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId
    };
    
    tracks.set(id, newTrack);
    return newTrack;
  },
  
  // Update track
  update: (id, updateData) => {
    const track = tracks.get(id);
    
    if (!track) return null;
    
    const updatedTrack = {
      ...track,
      ...updateData,
      updatedAt: new Date()
    };
    
    tracks.set(id, updatedTrack);
    return updatedTrack;
  },
  
  // Delete track
  delete: (id) => {
    if (!tracks.has(id)) return false;
    
    return tracks.delete(id);
  },
  
  // Add lesson to track
  addLesson: (trackId, lessonData) => {
    const track = tracks.get(trackId);
    
    if (!track) return null;
    
    const lessonId = `lesson-${Date.now()}`;
    const newLesson = {
      id: lessonId,
      ...lessonData,
      completed: false,
      completedAt: null
    };
    
    const updatedTrack = {
      ...track,
      lessons: [...track.lessons, newLesson],
      progress: {
        ...track.progress,
        totalLessons: track.progress.totalLessons + 1
      },
      updatedAt: new Date()
    };
    
    tracks.set(trackId, updatedTrack);
    return newLesson;
  },
  
  // Update lesson
  updateLesson: (trackId, lessonId, lessonData) => {
    const track = tracks.get(trackId);
    
    if (!track) return { track: null, lesson: null };
    
    const lessonIndex = track.lessons.findIndex(lesson => lesson.id === lessonId);
    
    if (lessonIndex === -1) {
      return { track, lesson: null };
    }
    
    const updatedLessons = [...track.lessons];
    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      ...lessonData
    };
    
    const updatedTrack = {
      ...track,
      lessons: updatedLessons,
      updatedAt: new Date()
    };
    
    tracks.set(trackId, updatedTrack);
    return { track: updatedTrack, lesson: updatedLessons[lessonIndex] };
  },
  
  // Remove lesson
  removeLesson: (trackId, lessonId) => {
    const track = tracks.get(trackId);
    
    if (!track) return { success: false, track: null };
    
    const lessonIndex = track.lessons.findIndex(lesson => lesson.id === lessonId);
    
    if (lessonIndex === -1) {
      return { success: false, track };
    }
    
    const updatedLessons = track.lessons.filter(lesson => lesson.id !== lessonId);
    const wasCompleted = track.lessons[lessonIndex].completed;
    
    const updatedTrack = {
      ...track,
      lessons: updatedLessons,
      progress: {
        ...track.progress,
        totalLessons: track.progress.totalLessons - 1,
        completedLessons: wasCompleted 
          ? track.progress.completedLessons - 1 
          : track.progress.completedLessons
      },
      updatedAt: new Date()
    };
    
    // Recalculate progress percentage
    if (updatedTrack.progress.totalLessons > 0) {
      updatedTrack.progress.percentComplete = 
        Math.round((updatedTrack.progress.completedLessons / 
                   updatedTrack.progress.totalLessons) * 100);
    } else {
      updatedTrack.progress.percentComplete = 0;
    }
    
    tracks.set(trackId, updatedTrack);
    return { success: true, track: updatedTrack };
  },
  
  // Mark lesson as complete
  completeLesson: (trackId, lessonId) => {
    const track = tracks.get(trackId);
    
    if (!track) return null;
    
    const lessonIndex = track.lessons.findIndex(lesson => lesson.id === lessonId);
    
    if (lessonIndex === -1) return track;
    
    const updatedLessons = [...track.lessons];
    const wasAlreadyCompleted = updatedLessons[lessonIndex].completed;
    
    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      completed: true,
      completedAt: new Date()
    };
    
    // Only increment completed count if it wasn't already completed
    const completedLessons = wasAlreadyCompleted
      ? track.progress.completedLessons
      : track.progress.completedLessons + 1;
    
    const updatedTrack = {
      ...track,
      lessons: updatedLessons,
      progress: {
        ...track.progress,
        completedLessons,
        percentComplete: Math.round((completedLessons / track.progress.totalLessons) * 100)
      },
      updatedAt: new Date()
    };
    
    tracks.set(trackId, updatedTrack);
    return updatedTrack;
  }
};

// ------------------------------------------------------
// src/services/trackService.js
// ------------------------------------------------------
import { repository } from '../repositories/trackRepository.js';
import { ApiError } from '../middleware/errorHandler.js';

export const trackService = {
  // Get all tracks with filtering and pagination
  getTracks: (options) => {
    return repository.findAll(options);
  },
  
  // Get track by ID
  getTrackById: (id) => {
    const track = repository.findById(id);
    
    if (!track) {
      throw new ApiError(`Track with ID ${id} not found`, 404);
    }
    
    return track;
  },
  
  // Create new track
  createTrack: (trackData, userId) => {
    return repository.create(trackData, userId);
  },
  
  // Update track
  updateTrack: (id, trackData, userId) => {
    const track = repository.findById(id);
    
    if (!track) {
      throw new ApiError(`Track with ID ${id} not found`, 404);
    }
    
    // Check if user has permission to update this track
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to update this track', 403);
    }
    
    return repository.update(id, trackData);
  },
  
  // Delete track
  deleteTrack: (id, userId) => {
    const track = repository.findById(id);
    
    if (!track) {
      throw new ApiError(`Track with ID ${id} not found`, 404);
    }
    
    // Check if user has permission to delete this track
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to delete this track', 403);
    }
    
    return repository.delete(id);
  },
  
  // Add lesson to track
  addLessonToTrack: (trackId, lessonData, userId) => {
    const track = repository.findById(trackId);
    
    if (!track) {
      throw new ApiError(`Track with ID ${trackId} not found`, 404);
    }
    
    // Check if user has permission
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to update this track', 403);
    }
    
    return repository.addLesson(trackId, lessonData);
  },
  
  // Update lesson
  updateLesson: (trackId, lessonId, lessonData, userId) => {
    const track = repository.findById(trackId);
    
    if (!track) {
      throw new ApiError(`Track with ID ${trackId} not found`, 404);
    }
    
    // Check if user has permission
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to update this track', 403);
    }
    
    const result = repository.updateLesson(trackId, lessonId, lessonData);
    
    if (!result.lesson) {
      throw new ApiError(`Lesson with ID ${lessonId} not found in track`, 404);
    }
    
    return result.lesson;
  },
  
  // Remove lesson from track
  removeLesson: (trackId, lessonId, userId) => {
    const track = repository.findById(trackId);
    
    if (!track) {
      throw new ApiError(`Track with ID ${trackId} not found`, 404);
    }
    
    // Check if user has permission
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to update this track', 403);
    }
    
    const result = repository.removeLesson(trackId, lessonId);
    
    if (!result.success) {
      throw new ApiError(`Lesson with ID ${lessonId} not found in track`, 404);
    }
    
    return result.track;
  },
  
  // Mark lesson as complete
  completeLesson: (trackId, lessonId, userId) => {
    const track = repository.findById(trackId);
    
    if (!track) {
      throw new ApiError(`Track with ID ${trackId} not found`, 404);
    }
    
    // For completion, we only check if the user is accessing their own created tracks
    // In a real app, you'd have user-specific progress tracking
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to update this track', 403);
    }
    
    const updatedTrack = repository.completeLesson(trackId, lessonId);
    
    const lessonFound = updatedTrack.lessons.some(lesson => lesson.id === lessonId);
    if (!lessonFound) {
      throw new ApiError(`Lesson with ID ${lessonId} not found in track`, 404);
    }
    
    return updatedTrack;
  },
  
  // Get track progress
  getTrackProgress: (trackId, userId) => {
    const track = repository.findById(trackId);
    
    if (!track) {
      throw new ApiError(`Track with ID ${trackId} not found`, 404);
    }
    
    // Only allow progress viewing for track creator
    // In a real app, you'd have user-specific progress tracking
    if (track.createdBy !== userId) {
      throw new ApiError('You do not have permission to view this track progress', 403);
    }
    
    // Get track progress data
    return {
      trackId,
      name: track.name,
      progress: track.progress,
      lastUpdated: track.updatedAt
    };
  }
};

// ------------------------------------------------------
// src/controllers/trackController.js
// ------------------------------------------------------
import { trackService } from '../services/trackService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const trackController = {
  // Get all tracks
  getTracks: asyncHandler(async (req, res) => {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      search: req.query.search,
      difficulty: req.query.difficulty,
      tags: req.query.tags,
      sort: req.query.sort || 'createdAt',
      order: req.query.order || 'desc',
      createdBy: req.query.mine === 'true' ? req.user.id : undefined
    };
    
    const result = await trackService.getTracks(options);
    
    res.json(result);
  }),
  
  // Get track by ID
  getTrackById: asyncHandler(async (req, res) => {
    const track = await trackService.getTrackById(req.params.id);
    res.json({ data: track });
  }),
  
  // Create track
  createTrack: asyncHandler(async (req, res) => {
    const track = await trackService.createTrack(req.body, req.user.id);
    res.status(201).json({ data: track });
  }),
  
  // Update track
  updateTrack: asyncHandler(async (req, res) => {
    const track = await trackService.updateTrack(
      req.params.id, 
      req.body, 
      req.user.id
    );
    res.json({ data: track });
  }),
  
  // Delete track
  deleteTrack: asyncHandler(async (req, res) => {
    await trackService.deleteTrack(req.params.id, req.user.id);
    res.status(204).end();
  }),
  
  // Add lesson to track
  addLessonToTrack: asyncHandler(async (req, res) => {
    const lesson = await trackService.addLessonToTrack(
      req.params.id, 
      req.body, 
      req.user.id
    );
    res.status(201).json({ data: lesson });
  }),
  
  // Update lesson
  updateLesson: asyncHandler(async (req, res) => {
    const lesson = await trackService.updateLesson(
      req.params.id,
      req.params.lessonId,
      req.body,
      req.user.id
    );
    res.json({ data: lesson });
  }),
  
  // Remove lesson
  removeLesson: asyncHandler(async (req, res) => {
    await trackService.removeLesson(
      req.params.id,
      req.params.lessonId,
      req.user.id
    );
    res.status(204).end();
  }),
  
  // Complete lesson
  completeLesson: asyncHandler(async (req, res) => {
    const updatedTrack = await trackService.completeLesson(
      req.params.id,
      req.params.lessonId,
      req.user.id
    );
    res.json({
      data: {
        message: 'Lesson marked as complete',
        progress: updatedTrack.progress
      }
    });
  }),
  
  // Get track progress
  getTrackProgress: asyncHandler(async (req, res) => {
    const progress = await trackService.getTrackProgress(
      req.params.id,
      req.user.id
    );
    res.json({ data: progress });
  })
};

// ------------------------------------------------------
// src/controllers/healthController.js
// ------------------------------------------------------
import { asyncHandler } from '../middleware/errorHandler.js';
import { config } from '../config/environment.js';

export const healthController = {
  // Get health status
  getHealth: asyncHandler(async (req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    // Format memory usage for better readability
    const formatMemory = (bytes) => {
      return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    };
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0', // Replace with actual version from package.json
      uptime: uptime,
      memory: {
        used: formatMemory(memoryUsage.heapUsed),
        total: formatMemory(memoryUsage.heapTotal)
      },
      environment: config.env
    });
  }),
  
  // Get API metrics (dummy data for this example)
  getMetrics: asyncHandler(async (req, res) => {
    // In a real app, you'd get this from a metrics collector
    res.json({
      requests: {
        total: 1234,
        success: 1180,
        errors: 54
      },
      performance: {
        averageResponseTime: '125ms',
        slowestEndpoint: '/api/v1/tracks'
      },
      usage: {
        activeUsers: 45,
        tracksCreated: tracks.size,
        lessonsCompleted: Array.from(tracks.values()).reduce((total, track) => {
          return total + track.progress.completedLessons;
        }, 0)
      }
    });
  })
};

// ------------------------------------------------------
// src/routes/tracks.js
// ------------------------------------------------------
import express from 'express';
import { trackController } from '../controllers/trackController.js';
import { trackSchema, lessonSchema } from '../utils/validators.js';

const router = express.Router();

// Middleware for track validation
const validateTrack = (req, res, next) => {
  const { error } = trackSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: 'Invalid track data',
        details: error.details.map(detail => detail.message)
      }
    });
  }
  next();
};

// Middleware for lesson validation
const validateLesson = (req, res, next) => {
  const { error } = lessonSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: 'Invalid lesson data',
        details: error.details.map(detail => detail.message)
      }
    });
  }
  next();
};

// Track routes
router.get('/', trackController.getTracks);
router.post('/', validateTrack, trackController.createTrack);
router.get('/:id', trackController.getTrackById);
router.put('/:id', validateTrack, trackController.updateTrack);
router.delete('/:id', trackController.deleteTrack);

// Track progress route
router.get('/:id/progress', trackController.getTrackProgress);

// Lesson routes
router.post('/:id/lessons', validateLesson, trackController.addLessonToTrack);
router.put('/:id/lessons/:lessonId', validateLesson, trackController.updateLesson);
router.delete('/:id/lessons/:lessonId', trackController.removeLesson);
router.patch('/:id/lessons/:lessonId/complete', trackController.completeLesson);

export default router;

// ------------------------------------------------------
// src/routes/health.js
// ------------------------------------------------------
import express from 'express';
import { healthController } from '../controllers/healthController.js';

const router = express.Router();

router.get('/', healthController.getHealth);
router.get('/metrics', healthController.getMetrics);

export default router;

// ------------------------------------------------------
// src/routes/index.js
// ------------------------------------------------------
import express from 'express';
import tracksRouter from './tracks.js';
import healthRouter from './health.js';
import { config } from '../config/environment.js';

const router = express.Router();

// API version prefix
const apiPrefix = `/api/${config.apiVersion}`;

// Mount routers
router.use(`${apiPrefix}/tracks`, tracksRouter);
router.use(`${apiPrefix}/health`, healthRouter);

export default router;

// ------------------------------------------------------
// src/middleware/rateLimiter.js
// ------------------------------------------------------
import { config } from '../config/environment.js';
import logger from '../utils/logger.js';

// Simple in-memory rate limiter
const ipRequests = new Map();

export const rateLimiter = (req, res, next) => {
  // Skip rate limiting for health check endpoint
  if (req.path.includes('/health')) {
    return next();
  }
  
  const ip = req.ip;
  const now = Date.now();
  const windowMs = config.rateLimit.windowMs;
  
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  const requestData = ipRequests.get(ip);
  
  // Reset if window has passed
  if (now > requestData.resetTime) {
    requestData.count = 1;
    requestData.resetTime = now + windowMs;
    return next();
  }
  
  // Check if over limit
  if (requestData.count >= config.rateLimit.max) {
    logger.warn(`Rate limit exceeded for IP: ${ip}`);
    return res.status(429).json({
      error: {
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      }
    });
  }
  
  // Increment count and continue
  requestData.count++;
  next();
};

// ------------------------------------------------------
// src/middleware/requestId.js
// ------------------------------------------------------
import { randomBytes } from 'crypto';

export const addRequestId = (req, res, next) => {
  const id = randomBytes(16).toString('hex');
  req.id = id;
  res.setHeader('X-Request-Id', id);
  next();
};

// ------------------------------------------------------
// src/app.js
// ------------------------------------------------------
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { apiKeyAuth } from './middleware/auth.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { addRequestId } from './middleware/requestId.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import router from './routes/index.js';

const app = express();

// Apply global middleware
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(addRequestId); // Add request ID for tracing
app.use(morgan('combined')); // Request logging
app.use(rateLimiter); // Rate limiting
app.use(apiKeyAuth); // API key authentication

// Mount main router
app.use(router);

// Handle 404 errors
app.use('*', notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

export default app;

// ------------------------------------------------------
// src/server.js
// ------------------------------------------------------
import app from './app.js';
import { config } from './config/environment.js';
import logger from './utils/logger.js';

const PORT = config.port;

// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.env} mode on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/api/${config.apiVersion}/health`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});

export default server; // For testing purposes

// ------------------------------------------------------
// tests/integration/tracks.test.js
// ------------------------------------------------------
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

// Test data for creating a track
const testTrackData = {
  name: "Test Track",
  description: "This is a test track for integration testing",
  difficulty: "beginner",
  estimatedHours: 10,
  tags: ["test", "integration"]
};

// Setup API key for auth
const API_KEY = 'test-key-1'; // Must match one in environment config

describe('Learning Tracks API', () => {
  let createdTrackId;
  
  describe('GET /api/v1/health', () => {
    it('should return health status without API key', async () => {
      const res = await request(app)
        .get('/api/v1/health')
        .expect('Content-Type', /json/)
        .expect(200);
        
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('memory');
    });
  });
  
  describe('Track endpoints', () => {
    // Test authentication
    it('should return 401 without API key', async () => {
      await request(app)
        .get('/api/v1/tracks')
        .expect(401);
    });
    
    // Test getting tracks list
    it('should return list of tracks with pagination', async () => {
      const res = await request(app)
        .get('/api/v1/tracks')
        .set('X-API-Key', API_KEY)
        .expect('Content-Type', /json/)
        .expect(200);
        
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
    
    // Test track creation
    it('should create a new track', async () => {
      const res = await request(app)
        .post('/api/v1/tracks')
        .set('X-API-Key', API_KEY)
        .send(testTrackData)
        .expect('Content-Type', /json/)
        .expect(201);
        
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toEqual(testTrackData.name);
      expect(res.body.data.lessons).toEqual([]);
      expect(res.body.data.progress.totalLessons).toEqual(0);
      
      // Save ID for later tests
      createdTrackId = res.body.data.id;
    });
    
    // Test track retrieval
    it('should get track by ID', async () => {
      const res = await request(app)
        .get(`/api/v1/tracks/${createdTrackId}`)
        .set('X-API-Key', API_KEY)
        .expect('Content-Type', /json/)
        .expect(200);
        
      expect(res.body.data.id).toEqual(createdTrackId);
      expect(res.body.data.name).toEqual(testTrackData.name);
    });
    
    // Test adding lessons
    it('should add a lesson to track', async () => {
      const lessonData = {
        title: 'Test Lesson',
        description: 'This is a test lesson',
        duration: 30,
        resources: [
          {
            type: 'article',
            url: 'https://example.com/test',
            title: 'Test Resource'
          }
        ]
      };
      
      const res = await request(app)
        .post(`/api/v1/tracks/${createdTrackId}/lessons`)
        .set('X-API-Key', API_KEY)
        .send(lessonData)
        .expect('Content-Type', /json/)
        .expect(201);
        
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.title).toEqual(lessonData.title);
      expect(res.body.data.completed).toEqual(false);
    });
    
    // Test track update
    it('should update track details', async () => {
      const updateData = {
        name: 'Updated Test Track',
        description: 'This track has been updated',
        difficulty: 'intermediate',
        estimatedHours: 15,
        tags: ['test', 'updated']
      };
      
      const res = await request(app)
        .put(`/api/v1/tracks/${createdTrackId}`)
        .set('X-API-Key', API_KEY)
        .send(updateData)
        .expect('Content-Type', /json/)
        .expect(200);
        
      expect(res.body.data.name).toEqual(updateData.name);
      expect(res.body.data.difficulty).toEqual(updateData.difficulty);
    });
    
    // Test error handling
    it('should return 404 for non-existent track', async () => {
      await request(app)
        .get('/api/v1/tracks/999999')
        .set('X-API-Key', API_KEY)
        .expect(404);
    });
    
    it('should return 400 for invalid track data', async () => {
      await request(app)
        .post('/api/v1/tracks')
        .set('X-API-Key', API_KEY)
        .send({ name: 'Too short' }) // Missing required fields
        .expect(400);
    });
    
    // Clean up - delete the track
    it('should delete a track', async () => {
      await request(app)
        .delete(`/api/v1/tracks/${createdTrackId}`)
        .set('X-API-Key', API_KEY)
        .expect(204);
        
      // Verify it's gone
      await request(app)
        .get(`/api/v1/tracks/${createdTrackId}`)
        .set('X-API-Key', API_KEY)
        .expect(404);
    });
  });
});
*/
