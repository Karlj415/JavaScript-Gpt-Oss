/*
## Practice Drills
1. Build a CLI tool `notes.js` that lets you add, list, and delete notes stored in a JSON file. Use `process.argv` to parse commands (e.g., `node notes.js add "My new note"`).
2. Implement a custom `EventEmitter` subclass that logs when tasks start and finish.
3. Use `fs.createReadStream` and `fs.createWriteStream` to copy a large file efficiently, piping the data from the readable to the writable stream.
*/

/*
## Project: Health Check Server

**Objective:** Create `server.js`, a simple but robust Node.js HTTP server that provides health and status information, reads from configuration, and handles shutdown gracefully.

**Instructions:**
1.  **Configuration:**
    -   Use the `dotenv` package to manage environment variables.
    -   Create a `.env` file with `PORT=8080` and `APP_VERSION=1.0.0`.
    -   In a `config.js` file, load these variables, providing sane defaults (e.g., port 3000 if `PORT` is not set).

2.  **Request Logging:**
    -   Create a custom `Transform` stream (`RequestLogger`) that takes a request object and outputs a formatted log string (e.g., `[2025-09-25T10:00:00.000Z] GET /health 200 OK`).
    -   In your server, pipe the `req` object to your logger stream, and pipe the logger stream to `process.stdout`.

3.  **HTTP Server (`server.js`):**
    -   Use the core `http` module.
    -   Implement three routes:
        -   `GET /health`: Responds with `200 OK` and a JSON body `{"status": "ok"}`.
        -   `GET /version`: Responds with `200 OK` and a JSON body `{"version": "1.0.0"}` (read from config).
        -   `GET /time`: Responds with `200 OK` and the current server time.
    -   Any other route should receive a `404 Not Found`.

4.  **Graceful Shutdown:**
    -   Add a listener for the `SIGINT` process event (`process.on('SIGINT', ...)`).
    -   Inside the handler, log a shutdown message, close the server (`server.close()`), and then exit the process (`process.exit(0)`).
*/

// --- Starter Code (server.js) ---
/*
import http from 'node:http';
import { Transform } from 'node:stream';
// TODO: Import your config object

// TODO: Define your RequestLogger Transform stream

const server = http.createServer((req, res) => {
  // TODO: Pipe the request to your logger

  // TODO: Implement the routing logic for /health, /version, and /time
  if (req.url === '/health') {
    // ...
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// TODO: Get the port from config
const PORT = 3000; // Placeholder

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// TODO: Implement the graceful shutdown listener for SIGINT
process.on('SIGINT', () => {
  console.log('\nSIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
*/
