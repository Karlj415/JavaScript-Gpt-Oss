# Lesson 16 · Node.js Foundations

Welcome to the backend. Today I’ll teach you how Node.js works, how to interact with the operating system, and how to build networked applications and command-line utilities from scratch.

## Objectives
- Understand Node’s architecture (V8, libuv, single-threaded event loop).
- Interact with the runtime via the global `process` object.
- Work with core modules: `fs`, `path`, `http`, `events`.
- Handle binary data with `Buffer`.
- Implement custom `Transform` streams for efficient data processing.
- Manage configuration and handle process-level errors gracefully.

## Lesson Narrative

### 1. Why Node.js?
Node.js is a JavaScript runtime built on Chrome's V8 engine. It uses a single-threaded, event-driven architecture with non-blocking I/O (thanks to a library called `libuv`). This makes it extremely efficient for building I/O-bound applications like APIs, real-time services, and build tools.

### 2. The `process` Object: Your Runtime API
The global `process` object is your gateway to the running Node.js application.
- `process.argv`: An array containing the command-line arguments. `process.argv[0]` is the Node executable, `process.argv[1]` is the script file, and subsequent elements are the user-provided arguments.
- `process.env`: An object containing all environment variables.
- `process.exit(code)`: Terminates the application. An exit code of `0` means success; `1` means an error occurred.
- `process.cwd()`: Gets the current working directory.

### 3. File System and Paths
Use the `fs/promises` module for modern, async file operations. Use the `path` module to construct platform-agnostic file paths.

```javascript
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// In CommonJS, you would use __dirname. In ESM, this is the modern equivalent.
const currentDir = path.dirname(import.meta.url.substring(process.platform === 'win32' ? 8 : 7));

const lessonPath = path.join(currentDir, "lesson.json");
const data = await readFile(lessonPath, "utf8");
```

### 4. Handling Binary Data: `Buffer`
JavaScript strings are for Unicode text. When you need to handle raw binary data (like images, zip files, or certain network protocols), you use Node's `Buffer` class.

```javascript
const buffer = Buffer.from("Hello, world!", "utf8");
console.log(buffer); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>
console.log(buffer.toString('hex')); // 48656c6c6f2c20776f726c6421
```
Streams often work with Buffers under the hood.

### 5. Events and Streams
Node is event-driven. The `EventEmitter` class is the foundation for many core modules. Streams are event emitters that handle flowing data.

There are four stream types: Readable, Writable, Duplex (both), and **Transform** (a Duplex that modifies data as it passes through).

#### Creating a Custom Transform Stream
```javascript
import { Transform } from "node:stream";

class UppercaseStream extends Transform {
  _transform(chunk, encoding, callback) {
    // The chunk is usually a Buffer. Convert it to a string.
    const uppercased = chunk.toString().toUpperCase();
    // Push the transformed data back into the stream.
    this.push(uppercased);
    callback();
  }
}

// process.stdin is a Readable stream, process.stdout is a Writable stream.
// .pipe() connects them together.
console.log("Type something and press Enter:");
process.stdin.pipe(new UppercaseStream()).pipe(process.stdout);
```

### 6. Building an HTTP Server from Scratch
Before using frameworks, understand the core `http` module.

```javascript
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### 7. Robust Error Handling
For a server, you must handle unexpected errors to prevent crashes.
- **Operational Errors:** Expected problems (e.g., invalid input, network failure). Handle these with `try/catch`.
- **Programmer Errors:** Bugs in your code. You can't recover from these, but you should log them and shut down gracefully.

Listen for process-wide events as a last resort:
```javascript
process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Introduction to Node.js (Rich Trott)](https://www.youtube.com/watch?v=TlB_eWDSMt4)
- [Node.js Event Loop Explained](https://www.youtube.com/watch?v=PNa9OMajw9w)

## References
- Node.js Docs: [About Node.js](https://nodejs.org/en/about)
- Node.js Docs: [HTTP Module](https://nodejs.org/api/http.html)
- Node.js Docs: [Stream API](https://nodejs.org/api/stream.html)
- "Node.js Design Patterns" by Mario Casciaro & Luciano Mammino

## Reflection
- What is the difference between `process.argv` and `process.env`?
- Why is it better to `.pipe()` a file stream instead of reading the whole file into memory with `readFile`?
- How does `libuv` help Node.js handle many connections at once despite being single-threaded?

Lesson 17 layers on Express to build RESTful APIs efficiently.
