/*
## Practice Drills
1. Implement a `lessons` resource with full CRUD (Create, Read, Update, Delete) operations. Use an in-memory array as your database.
2. Add a custom middleware function that logs the timestamp and HTTP method of every incoming request to the console.
3. Create a validation middleware that checks for the presence of a `title` property in the request body for your `POST /lessons` endpoint. If it's missing, respond with a 400 Bad Request error.
4. Write integration tests using Vitest and Supertest to cover the happy path (200/201 status codes) and at least one validation error path (400 status code) for your `lessons` resource.
*/

/*
## Project: Learning Tracker API

**Objective:** Build a structured Express API for tracking learning progress, complete with separate routes, controllers, data repositories, and middleware.

**Instructions:**
1.  **Setup:**
    -   Initialize a new Node.js project (`npm init -y`, set `"type": "module"`).
    -   Install dependencies: `npm install express morgan cors`
    -   Install dev dependencies: `npm install --save-dev vitest supertest`

2.  **Folder Structure:**
    ```
    src/
      app.js          # Main Express app setup
      server.js       # Server entry point
      api/
        tracks/
          tracks.router.js
          tracks.controller.js
          tracks.repository.js
    ```

3.  **Data Layer (`tracks.repository.js`):**
    -   Create a class or object that manages an in-memory array of tracks.
    -   It should have methods like `findAll`, `findById`, `create`, `addLessonToTrack`, etc.

4.  **Controller Layer (`tracks.controller.js`):**
    -   Each controller function should handle the logic for a single route (e.g., `listTracks`, `createTrack`).
    -   It should call the repository to interact with data.
    -   It should handle `async` operations with `try/catch` blocks, passing errors to `next()`.

5.  **Router Layer (`tracks.router.js`):**
    -   Create an `express.Router()`.
    -   Define all the routes for the `/tracks` resource.
    -   Connect each route to a controller function.
    -   Export the router.

6.  **Main App (`app.js`):**
    -   Create the Express app instance.
    -   Apply global middleware (`express.json()`, `morgan`, `cors`).
    -   Mount your tracks router: `app.use('/api/tracks', tracksRouter);`
    -   Add a generic 404 handler and a final error-handling middleware `(err, req, res, next)`.

7.  **Endpoints to Implement:**
    -   `GET /api/tracks`: List all learning tracks.
    -   `POST /api/tracks`: Create a new track (requires a `name`).
    -   `GET /api/tracks/:trackId`: Get a single track by its ID.
    -   `POST /api/tracks/:trackId/lessons`: Add a lesson object to a specific track's lesson list.

8.  **Testing:**
    -   Write integration tests for at least the `GET /api/tracks` and `POST /api/tracks` endpoints.
*/

// --- Starter Code (src/api/tracks/tracks.repository.js) ---
/*
// This is a simple in-memory database.
const tracks = new Map();
let nextId = 1;

export const repository = {
  findAll: () => Array.from(tracks.values()),
  findById: (id) => tracks.get(id),
  create: (trackData) => {
    const id = nextId++;
    const newTrack = { id, ...trackData, lessons: [] };
    tracks.set(id, newTrack);
    return newTrack;
  },
  // TODO: Implement other methods like addLessonToTrack, update, delete...
};
*/
