# Lesson 17 · REST APIs with Express

Now that you understand Node’s foundations, we’ll build RESTful APIs using Express. I’ll teach you routing, middleware, validation, and how to structure a scalable server application.

## Objectives
- Scaffold an Express application and understand its core components.
- Define RESTful routes and organize them with `express.Router`.
- Understand the `req` and `res` objects, including `params`, `query`, and `body`.
- Use middleware for logging, validation, and error handling.
- Handle errors in asynchronous route handlers correctly.
- Structure an API using a layered architecture (routes, controllers, repositories).

## Lesson Narrative

### 1. Why Express?
While Node's built-in `http` module is powerful, it's very low-level. Express is a minimal and flexible framework that provides a robust set of features for web and mobile applications, dramatically simplifying routing, middleware, and request/response handling.

### 2. The Middleware Pipeline
Middleware functions are the heart of Express. They are functions that have access to the request (`req`), response (`res`), and the `next` middleware function in the application’s request-response cycle. They can:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

```javascript
// A simple custom logger middleware
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
};

app.use(requestLogger);
```

#### Error-Handling Middleware
This special middleware has four arguments `(err, req, res, next)`. It must be defined **last**, after all other `app.use()` and routes calls. Express will automatically skip to it if any preceding middleware calls `next(error)`.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
```

### 3. The Request and Response Objects
- **`req` (Request):**
  - `req.params`: An object containing route parameters. For a route like `/users/:userId`, `req.params.userId` would be available.
  - `req.query`: An object containing the URL query parameters. For a URL like `/search?q=express`, `req.query.q` would be `"express"`.
  - `req.body`: An object containing the parsed request body. This requires the `express.json()` middleware to be used.

- **`res` (Response):**
  - `res.send()`: Sends a response of various types.
  - `res.json()`: Sends a JSON response (and automatically sets the `Content-Type` header).
  - `res.status(code)`: Sets the HTTP status code.
  - `res.sendStatus(code)`: Sets the status and sends the corresponding status message as the body.

### 4. Organizing Routes with `express.Router`
As an application grows, you should group related routes into their own files using `express.Router`.

`src/api/users/users.router.js`
```javascript
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => { /* List users */ });
router.get('/:id', (req, res) => { /* Get user by ID */ });

export default router;
```

`src/app.js`
```javascript
import usersRouter from './api/users/users.router.js';
// ...
app.use('/api/users', usersRouter); // Mount the router on a specific path
```

### 5. Async Operations and Error Handling
In Express 4, errors in `async` route handlers are not caught by the error-handling middleware automatically. You **must** wrap your code in a `try...catch` block and call `next(error)` manually.

```javascript
router.get('/:id', async (req, res, next) => {
  try {
    const user = await UserRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    // Pass the error to the global error handler
    next(error);
  }
});
```
*Note: Express 5, currently in beta, handles this automatically.* 

### 6. Layered Architecture
For scalability, separate your concerns:
- **Router Layer:** Defines URL paths and HTTP methods. Maps them to controllers.
- **Controller Layer:** Executes business logic. It reads from the `req` object and uses the `res` object to send a response. It knows nothing about the database.
- **Repository/Data Layer:** Abstract away data access. This layer is responsible for all database interactions. Your controllers call methods on this layer.

This separation makes your app easier to test, maintain, and refactor (e.g., swapping a database).

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Build a REST API with Express (Traversy Media)](https://www.youtube.com/watch?v=L72fhGm1tfE)
- [Good APIs Vs Bad APIs: 7 Tips for API Design (ByteByteGo)](https://www.youtube.com/watch?v=_gQaygjm_hg)

## References
- Express Docs: [Routing](https://expressjs.com/en/guide/routing.html)
- Express Docs: [Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)
- RESTful API Design Guidelines: [https://restfulapi.net/](https://restfulapi.net/)

## Reflection
- Why is it important to separate controllers from the data/repository layer?
- How does `express.Router` help organize a large application?
- Explain the purpose of the `next` function in middleware.

Lesson 18 connects your API to persistent storage: SQL, NoSQL, and ORMs.