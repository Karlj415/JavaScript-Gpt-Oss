# Lesson 20 · Real-Time & Deployment

We’ve reached the final lesson. Today I’ll teach you how to add real-time capabilities to your applications and, most importantly, how to deploy them to production using modern, professional workflows.

## Objectives
- Differentiate between WebSockets and Server-Sent Events (SSE) and their use cases.
- Implement real-time communication with Socket.IO.
- Understand and compare modern deployment strategies (PaaS, Containers, Serverless).
- Write a multi-stage `Dockerfile` for a production-ready Node.js application.
- Configure a CI/CD pipeline with GitHub Actions for automated testing and deployment.
- Implement graceful shutdown and health checks for a robust production server.

## Lesson Narrative

### 1. Real-Time Communication
HTTP is a request-response protocol. For features like live chat, notifications, or collaborative editing, you need a persistent connection between the client and server.

#### WebSockets vs. Server-Sent Events (SSE)
- **WebSockets:** A **bi-directional** protocol. Both the client and server can send messages at any time. It’s powerful but more complex. Use for features requiring two-way communication, like a chat app or a multiplayer game.
- **Server-Sent Events (SSE):** A **uni-directional** protocol. The server can push data to the client, but the client cannot send data to the server over the same connection. It’s simpler, built on standard HTTP, and automatically handles reconnections. Perfect for notifications, live score updates, or stock tickers.

#### Implementing with Socket.IO (WebSockets)
Socket.IO is a library that simplifies WebSocket communication and provides fallbacks.

```javascript
// server.js
import { Server } from "socket.io";
// ... (after creating your http server)
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for an event from a client
  socket.on("new-message", (message) => {
    // Broadcast the message to all other clients
    socket.broadcast.emit("message-received", message);
  });
});
```

### 2. Deployment Strategies
- **PaaS (Platform-as-a-Service):** e.g., Render, Heroku. You push your code, and the platform handles the servers, networking, and scaling. Easiest to get started.
- **Containers:** e.g., Docker. You package your app and its dependencies into a portable container image. You can run this image anywhere (on your laptop, or on a cloud service like AWS Fargate, Google Cloud Run, or Fly.io). This offers portability and consistency.
- **Serverless:** e.g., AWS Lambda, Vercel Functions. You deploy individual functions instead of a whole server. The platform runs them on demand. Great for event-driven or bursty workloads.

#### A Basic `Dockerfile` for Node.js
A multi-stage build creates a small, secure production image.

```dockerfile
# --- 1. Build Stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# (If you have a build step for a frontend, you would run it here)
# RUN npm run build

# --- 2. Production Stage ---
FROM node:18-alpine
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

# Expose the port the app runs on
EXPOSE 3000

# The command to run the application
CMD [ "node", "src/server.js" ]
```

### 3. CI/CD: Automating Your Workflow
**C**ontinuous **I**ntegration / **C**ontinuous **D**eployment automates your testing and release process. A simple CI pipeline in GitHub Actions runs on every push or pull request.

`.github/workflows/ci.yml`
```yaml
name: Node.js CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js 18
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Check linting
        run: npm run lint
```
**Secrets** (API keys, tokens) should never be hard-coded. Store them in your CI/CD platform's encrypted secrets manager.

### 4. Production-Ready Process Management

#### Graceful Shutdown
In production, your server will receive a `SIGTERM` signal to shut down (not `SIGINT` from Ctrl+C). Your app must listen for this signal to close database connections and finish processing current requests before exiting.

```javascript
function gracefulShutdown() {
  console.log("Shutdown signal received. Closing server...");
  server.close(() => {
    console.log("Server closed. Exiting process.");
    // Close DB connection here
    process.exit(0);
  });
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
```

#### Health Checks
Deployment platforms use health checks to determine if your application is running correctly.
- **Liveness Probe:** `GET /healthz` - Should return `200 OK` if the server is running. If it fails, the platform will restart the container.
- **Readiness Probe:** `GET /readyz` - Should return `200 OK` only if the app is ready to accept traffic (e.g., database connection is established). If it fails, the platform will not send new traffic to this instance.

## Exercises

This lesson culminates in the capstone project. All instructions can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Socket.IO Crash Course](https://www.youtube.com/watch?v=ZKEqqIO7n-k)
- [Deploy Node.js Apps with Docker (Traversy Media)](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [CI/CD Tutorial using GitHub Actions (Tom Shaw)](https://www.youtube.com/watch?v=YLtlz88zrLg)

## References
- Socket.IO Docs: [Get Started](https://socket.io/docs/v4/)
- The Twelve-Factor App: [https://12factor.net/](https://12factor.net/)
- Docker Docs: [Node.js Guide](https://docs.docker.com/language/nodejs/)

## Reflection
- Which deployment strategy (PaaS, Containers, Serverless) is most appealing to you for personal projects, and why?
- What is the difference between a liveness probe and a readiness probe?
- Look at the multi-stage `Dockerfile`. Why is it better than just copying all files into a single `FROM node` image?

Congratulations on reaching the end of the course! Your next step is to dive into the capstone project and bring all these skills together. I’m excited to see what you build.