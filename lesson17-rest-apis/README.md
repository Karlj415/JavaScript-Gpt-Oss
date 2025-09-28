# Lesson 17 · REST APIs with Express.js

> **From Foundation to Professional APIs** 🌟
> Building on your Node.js knowledge, you'll create production-ready web APIs that power modern applications.

## Table of Contents
- [🎯 What You'll Master](#-what-youll-master)
- [🏗️ Understanding REST: The Web's Language](#️-understanding-rest-the-webs-language)
- [🚀 Express.js: Your API Superhighway](#-expressjs-your-api-superhighway)
- [🔄 The Middleware Pipeline: Assembly Line Processing](#-the-middleware-pipeline-assembly-line-processing)
- [📦 Request and Response: Digital Conversation](#-request-and-response-digital-conversation)
- [🗺️ Routing: Building Your API Map](#️-routing-building-your-api-map)
- [🏢 Professional Architecture: Organizing for Scale](#-professional-architecture-organizing-for-scale)
- [🛡️ Error Handling: Graceful Failure Management](#️-error-handling-graceful-failure-management)
- [💡 Best Practices for Production APIs](#-best-practices-for-production-apis)

## 🎯 What You'll Master

By the end of this lesson, you'll confidently build REST APIs that:
- Handle thousands of requests efficiently
- Organize code like professional development teams
- Validate data and handle errors gracefully
- Scale from prototype to production
- Follow industry-standard REST principles

## 🏗️ Understanding REST: The Web's Language

### What is REST?

Think of REST (Representational State Transfer) as the **universal language of the web**. Just like how different countries need diplomatic protocols to communicate, web applications need standardized ways to exchange data.

**Real-World Analogy: A Hotel Reception Desk**

Imagine REST API endpoints as different services at a hotel:
- `GET /rooms` → "Show me all available rooms" (Read)
- `POST /rooms` → "Book a new room" (Create)  
- `GET /rooms/101` → "Give me details about room 101" (Read specific)
- `PUT /rooms/101` → "Update room 101's details" (Update)
- `DELETE /rooms/101` → "Cancel room 101's booking" (Delete)

### The Six REST Principles

```javascript
// 1. Client-Server Architecture
// Your API serves data, client apps consume it
const hotelAPI = {
  // Server provides data
  getRooms: () => rooms,
  // Client decides how to display it
};

// 2. Stateless Communication
// Each request contains everything needed
GET /api/rooms/101
Headers: { "Authorization": "Bearer token123" }
// Server doesn't remember previous requests

// 3. Cacheable Responses
res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
res.json(rooms);

// 4. Uniform Interface
// Consistent URL patterns across your API
// /api/rooms (collection)
// /api/rooms/101 (specific item)
// /api/guests/45/bookings (nested resources)

// 5. Layered System
// Client → Load Balancer → API Gateway → Your Express App → Database

// 6. Code on Demand (Optional)
// Server can send executable code (like JavaScript)
```

### HTTP Status Codes: Your API's Emotional Language

```javascript
// Success Family (2xx) - "Everything went great!"
res.status(200).json(data);      // OK - Request successful
res.status(201).json(newItem);   // Created - New resource made
res.status(204).send();          // No Content - Deleted successfully

// Client Error Family (4xx) - "You made a mistake"
res.status(400).json({ error: "Bad request data" });     // Bad Request
res.status(401).json({ error: "Please log in first" });  // Unauthorized
res.status(403).json({ error: "You can't access this" }); // Forbidden
res.status(404).json({ error: "Not found" });            // Not Found
res.status(422).json({ error: "Invalid data format" });  // Unprocessable

// Server Error Family (5xx) - "We messed up"
res.status(500).json({ error: "Internal server error" }); // Our fault
res.status(503).json({ error: "Service unavailable" });   // Temporarily down
```

## 🚀 Express.js: Your API Superhighway

### Why Express Over Raw Node.js?

**Without Express (Raw Node.js):**
```javascript
// Handling a simple POST request - lots of manual work!
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/users') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        // Process user creation...
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
});
```

**With Express (Much Simpler!):**
```javascript
// The same functionality, beautifully simple
app.post('/api/users', (req, res) => {
  const userData = req.body; // Express automatically parses JSON
  // Process user creation...
  res.status(201).json({ success: true });
});
```

### Setting Up Your First Express API

```javascript
// package.json setup
{
  "name": "my-first-api",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "morgan": "^1.10.0"
  }
}

// server.js - Your API's front door
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Global middleware - runs on every request
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Allow cross-origin requests
app.use(morgan('dev'));  // Log all requests

// Your first endpoint!
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
```

## 🔄 The Middleware Pipeline: Assembly Line Processing

### Understanding Middleware

**Real-World Analogy: Airport Security**

Think of Express middleware as airport security checkpoints:
1. **Check-in Counter** → Validate your ticket (authentication)
2. **Security Scanner** → Check for prohibited items (validation)
3. **Immigration** → Verify your passport (authorization)
4. **Gate** → Board your flight (your actual route handler)

Each checkpoint can:
- Let you proceed to the next one (`next()`)
- Stop you entirely (send an error response)
- Add information to your "boarding pass" (modify `req` object)

```javascript
// Middleware execution order matters!
app.use(requestLogger);    // 1st: Log every request
app.use(authenticate);     // 2nd: Check if user is logged in
app.use(rateLimiter);      // 3rd: Prevent spam requests
app.get('/api/users', getUserList); // 4th: Your actual route
app.use(errorHandler);     // Last: Handle any errors

// Custom middleware examples
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next(); // CRITICAL: Always call next() or send a response
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }
  
  // Extract and verify token (simplified)
  const token = authHeader.replace('Bearer ', '');
  if (token === 'valid-token-123') {
    req.user = { id: 1, username: 'john_doe' }; // Add user info
    next(); // Allow request to continue
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const rateLimiter = (req, res, next) => {
  // Simple in-memory rate limiting
  const clientIP = req.ip;
  const now = Date.now();
  
  if (!rateLimitStore[clientIP]) {
    rateLimitStore[clientIP] = { count: 1, resetTime: now + 60000 };
    return next();
  }
  
  const limit = rateLimitStore[clientIP];
  if (now > limit.resetTime) {
    limit.count = 1;
    limit.resetTime = now + 60000;
    return next();
  }
  
  if (limit.count >= 100) { // 100 requests per minute
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  limit.count++;
  next();
};
```

### Error-Handling Middleware: Your Safety Net

```javascript
// Global error handler - always has 4 parameters
const globalErrorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Different error types need different responses
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }
  
  // Default server error
  res.status(500).json({
    error: 'Internal server error',
    requestId: req.id // Help users report issues
  });
};

// Must be defined LAST in your middleware stack
app.use(globalErrorHandler);
```

## 📦 Request and Response: Digital Conversation

### The Request Object: Understanding User Input

```javascript
// Example: GET /api/users/123?include=posts&limit=10
// Headers: { "Authorization": "Bearer abc123", "User-Agent": "Chrome" }
// Body: { "name": "John", "email": "john@example.com" }

app.get('/api/users/:userId', (req, res) => {
  // URL Parameters (route params)
  const userId = req.params.userId; // "123"
  
  // Query String Parameters
  const includePosts = req.query.include; // "posts"
  const limit = parseInt(req.query.limit) || 50; // 10 (converted to number)
  
  // Request Headers
  const userAgent = req.headers['user-agent']; // "Chrome"
  const authToken = req.headers.authorization; // "Bearer abc123"
  
  // Request Body (for POST/PUT/PATCH)
  const userData = req.body; // { "name": "John", "email": "john@example.com" }
  
  // Additional useful properties
  const clientIP = req.ip;           // Client's IP address
  const isSecure = req.secure;       // true if HTTPS
  const method = req.method;         // "GET", "POST", etc.
  const fullUrl = req.originalUrl;   // Full URL path with query string
  
  console.log('Request details:', {
    userId,
    includePosts,
    limit,
    userAgent,
    clientIP,
    method,
    fullUrl
  });
});
```

### The Response Object: Crafting Perfect Replies

```javascript
app.get('/api/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    
    // Method 1: Simple JSON response
    return res.json(users);
    
    // Method 2: With custom status code
    return res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
    
    // Method 3: With custom headers
    res.set({
      'X-Total-Count': users.length,
      'Cache-Control': 'public, max-age=300',
      'Last-Modified': new Date().toUTCString()
    });
    return res.json(users);
    
  } catch (error) {
    // Error responses
    return res.status(500).json({
      error: 'Failed to fetch users',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Different response types
app.get('/api/download', (req, res) => {
  // Send files
  res.download('/path/to/file.pdf');
});

app.get('/api/redirect', (req, res) => {
  // Redirect to another URL
  res.redirect(301, 'https://newdomain.com/api');
});

app.get('/api/custom', (req, res) => {
  // Send custom content types
  res.type('text/plain');
  res.send('Hello, World!');
});
```

## 🗺️ Routing: Building Your API Map

### Express Router: Organizing Routes Like a Pro

```javascript
// src/routes/users.js - User-related routes
import express from 'express';
const router = express.Router();

// Middleware that applies to all routes in this router
router.use((req, res, next) => {
  console.log('User route accessed at:', new Date());
  next();
});

// GET /api/users - List all users
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const users = await userService.getUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      search
    });
    
    res.json({
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: users.length
      }
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// POST /api/users - Create new user
router.post('/', validateUserData, async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    
    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Get specific user
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', validateUserData, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
});

// Validation middleware
function validateUserData(req, res, next) {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Name and email are required'
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Invalid email format'
    });
  }
  
  next();
}

export default router;
```

### Advanced Routing Patterns

```javascript
// Parameter validation
router.param('id', (req, res, next, id) => {
  // Validate ID format before any route handler runs
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  next();
});

// Route patterns with wildcards
router.get('/files/*', (req, res) => {
  const filePath = req.params[0]; // Everything after /files/
  res.json({ requestedFile: filePath });
});

// Optional parameters
router.get('/posts/:year/:month?', (req, res) => {
  const { year, month } = req.params;
  // month might be undefined
  res.json({ year, month });
});

// Query parameter handling
router.get('/search', (req, res) => {
  const {
    q: query,           // ?q=javascript
    category,           // ?category=tutorial
    sort = 'date',      // ?sort=rating (default: 'date')
    order = 'desc',     // ?order=asc (default: 'desc')
    page = 1,           // ?page=2 (default: 1)
    limit = 10          // ?limit=20 (default: 10)
  } = req.query;
  
  // Process search...
  res.json({ query, category, sort, order, page, limit });
});
```

## 🏢 Professional Architecture: Organizing for Scale

### The Three-Layer Architecture

**Real-World Analogy: A Restaurant**
- **Router Layer** = Waiters (take orders, deliver food)
- **Controller Layer** = Head Chef (decides what to cook)
- **Repository Layer** = Kitchen Staff (actually prepares food)

```javascript
// Project structure for a professional API
api-project/
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js             # Server startup
│   ├── config/
│   │   ├── database.js       # Database configuration
│   │   └── environment.js    # Environment variables
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   ├── validation.js    # Input validation
│   │   └── errorHandler.js  # Global error handling
│   ├── routes/
│   │   ├── index.js         # Main router
│   │   ├── users.js         # User routes
│   │   └── posts.js         # Post routes
│   ├── controllers/
│   │   ├── userController.js # User business logic
│   │   └── postController.js # Post business logic
│   ├── services/
│   │   ├── userService.js    # User operations
│   │   └── postService.js    # Post operations
│   ├── repositories/
│   │   ├── userRepository.js # User data access
│   │   └── postRepository.js # Post data access
│   └── utils/
│       ├── logger.js        # Logging utilities
│       └── validators.js    # Common validations
├── tests/
├── docs/
└── package.json
```

### Layer Implementation Examples

```javascript
// src/repositories/userRepository.js - Data Access Layer
class UserRepository {
  constructor(database) {
    this.db = database;
  }
  
  async findAll(options = {}) {
    const { limit = 10, offset = 0, search } = options;
    
    let query = 'SELECT * FROM users';
    const params = [];
    
    if (search) {
      query += ' WHERE name ILIKE $1 OR email ILIKE $1';
      params.push(`%${search}%`);
    }
    
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await this.db.query(query, params);
    return result.rows;
  }
  
  async findById(id) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }
  
  async create(userData) {
    const { name, email, password } = userData;
    const result = await this.db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  }
  
  async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    const setClause = fields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(', ');
    
    const result = await this.db.query(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0] || null;
  }
  
  async delete(id) {
    const result = await this.db.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows.length > 0;
  }
}

export default UserRepository;
```

```javascript
// src/services/userService.js - Business Logic Layer
import bcrypt from 'bcryptjs';
import { validateEmail, validatePassword } from '../utils/validators.js';

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  
  async getUsers(options) {
    return await this.userRepository.findAll(options);
  }
  
  async getUserById(id) {
    if (!id || isNaN(id)) {
      throw new Error('Valid user ID is required');
    }
    
    return await this.userRepository.findById(id);
  }
  
  async createUser(userData) {
    // Validate input
    const { name, email, password } = userData;
    
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    if (!validatePassword(password)) {
      throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
    }
    
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const newUser = await this.userRepository.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword
    });
    
    // Remove password from response
    delete newUser.password;
    return newUser;
  }
  
  async updateUser(id, updates) {
    const user = await this.getUserById(id);
    if (!user) {
      return null;
    }
    
    // Validate updates
    if (updates.email && !validateEmail(updates.email)) {
      throw new Error('Invalid email format');
    }
    
    if (updates.password) {
      if (!validatePassword(updates.password)) {
        throw new Error('Invalid password format');
      }
      updates.password = await bcrypt.hash(updates.password, 12);
    }
    
    const updatedUser = await this.userRepository.update(id, updates);
    if (updatedUser) {
      delete updatedUser.password;
    }
    
    return updatedUser;
  }
  
  async deleteUser(id) {
    const user = await this.getUserById(id);
    if (!user) {
      return false;
    }
    
    return await this.userRepository.delete(id);
  }
}

export default UserService;
```

```javascript
// src/controllers/userController.js - Request/Response Layer
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  
  // GET /api/users
  async getUsers(req, res, next) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      
      const options = {
        limit: Math.min(parseInt(limit), 100), // Max 100 items per page
        offset: (parseInt(page) - 1) * parseInt(limit),
        search
      };
      
      const users = await this.userService.getUsers(options);
      
      res.json({
        success: true,
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          hasMore: users.length === parseInt(limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
  // GET /api/users/:id
  async getUser(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
  
  // POST /api/users
  async createUser(req, res, next) {
    try {
      const newUser = await this.userService.createUser(req.body);
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  }
  
  // PUT /api/users/:id
  async updateUser(req, res, next) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }
  
  // DELETE /api/users/:id
  async deleteUser(req, res, next) {
    try {
      const deleted = await this.userService.deleteUser(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
```

## 🛡️ Error Handling: Graceful Failure Management

### Async Error Handling Wrapper

```javascript
// utils/asyncHandler.js - Eliminates try-catch repetition
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in routes
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  // No try-catch needed! Errors automatically passed to error handler
  res.json({ data: user });
}));
```

### Comprehensive Error Handling System

```javascript
// middleware/errorHandler.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error details
  console.error({
    error: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
  
  // Database validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new AppError(message, 400);
  }
  
  // Database duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = new AppError(message, 400);
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401);
  }
  
  // Send error response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack
    })
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err.message);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});
```

## 💡 Best Practices for Production APIs

### 1. Security Hardening

```javascript
import helmet from 'helmet';        // Security headers
import rateLimit from 'express-rate-limit';  // Rate limiting
import mongoSanitize from 'express-mongo-sanitize'; // NoSQL injection
import xss from 'xss-clean';        // XSS protection
import hpp from 'hpp';              // Parameter pollution

// Apply security middleware
app.use(helmet()); // Sets various HTTP headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());
```

### 2. Request Validation

```javascript
import joi from 'joi';

// Schema validation
const userSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  age: joi.number().integer().min(18).max(120),
  preferences: joi.object({
    newsletter: joi.boolean(),
    notifications: joi.boolean()
  })
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

// Use in routes
router.post('/users', validateUser, createUser);
```

### 3. API Documentation

```javascript
// Generate API documentation with swagger
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A comprehensive REST API'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/', getUsers);
```

### 4. Environment Configuration

```javascript
// config/environment.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/myapi',
    maxConnections: process.env.DB_MAX_CONNECTIONS || 10
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true
  }
};

// Validate critical environment variables
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  process.exit(1);
}
```

### 5. Logging and Monitoring

```javascript
import winston from 'winston';

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Add console logging in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info('HTTP Request', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
  });
  
  next();
};

app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
});
```

---

## 🎯 Exercises Preview

**Practice Drills:** Master the fundamentals
1. **CRUD Operations** - Build a complete lessons resource with Create, Read, Update, Delete
2. **Custom Middleware** - Create request logging and validation middleware  
3. **Error Handling** - Implement comprehensive error responses
4. **Testing** - Write integration tests with Vitest and Supertest

**Main Project: Learning Tracker API**
Build a professional Express API with:
- 📁 Proper project structure (routes, controllers, repositories)
- 🛡️ Middleware for logging, CORS, and validation
- 📊 Health monitoring endpoints
- ⚙️ Environment-based configuration
- 💡 Production-ready error handling

All detailed instructions and starter code are in `exercises.js` →

---

## 📺 Watch These Videos
- [Express.js Tutorial - Build REST API](https://youtu.be/L72fhGm1tfE) - Complete walkthrough by Traversy Media
- [API Design Best Practices](https://youtu.be/_gQaygjm_hg) - Professional API patterns by ByteByteGo  
- [Express Middleware Explained](https://youtu.be/lY6icfhap2o) - Deep dive into middleware patterns
- [Building Scalable Node.js Apps](https://youtu.be/BN0JlMZCtNU) - Architecture patterns for growth

## 📚 References & Resources

**Official Documentation**
- [Express.js Guide](https://expressjs.com/en/guide/) - Complete framework documentation
- [Express Routing](https://expressjs.com/en/guide/routing.html) - URL patterns and parameters
- [Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html) - Custom middleware creation

**Best Practices & Standards**
- [RESTful API Design](https://restfulapi.net/) - REST architecture principles
- [HTTP Status Codes](https://httpstatuses.com/) - Complete status code reference
- [API Security Best Practices](https://owasp.org/API-Security/editions/2019/en/0x00-introduction/) - OWASP API Security

**Tools & Libraries**
- [Postman](https://www.postman.com/) - API testing and documentation
- [Insomnia](https://insomnia.rest/) - Alternative API client
- [Swagger/OpenAPI](https://swagger.io/) - API documentation standards

---

## 🤔 Reflection Questions

**Architecture & Design**
1. Why is the three-layer architecture (Router → Controller → Repository) better than putting all logic in route handlers?
2. How does separating concerns make your API easier to test and maintain?
3. What are the trade-offs between middleware and inline validation?

**REST & HTTP**
4. Explain why REST APIs are "stateless" and why this matters for scalability.
5. When would you use a 422 status code versus a 400 status code?
6. How do HTTP methods (GET, POST, PUT, DELETE) map to database operations?

**Error Handling & Production**
7. What's the difference between operational errors and programmer errors?
8. Why should error messages be different in development vs production?
9. How does proper logging help with debugging production issues?

**Next Steps**
10. What additional middleware would you add for a production API?
11. How would you handle file uploads in a REST API?
12. What strategies would you use to version your API as it evolves?

---

> **Coming Next: Lesson 18 - Data Persistence** 📋  
> Connect your professional APIs to databases, learn SQL fundamentals, and explore modern ORMs for scalable data management.

**Your REST API Foundation is Complete! 🎆**

You now understand:
- REST principles and HTTP status codes
- Express.js middleware and routing
- Professional API architecture patterns  
- Error handling and production best practices
- Security, validation, and monitoring

These skills form the backbone of modern web development. In the next lesson, we'll give your APIs persistent memory with databases!
