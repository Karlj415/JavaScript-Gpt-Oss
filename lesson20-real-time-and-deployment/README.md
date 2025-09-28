# Lesson 20 · Real-Time Apps and Deployment

> From request/response to live experiences. ⚡️  
> Build real-time features with WebSockets/Socket.IO and learn how to ship your app to production.

## Table of Contents
- 🎯 What You'll Master
- 🔌 Real-Time Fundamentals (WebSockets vs HTTP)
- 🚦 Socket.IO Basics: Events, Rooms, Namespaces
- 🧭 Connection Lifecycle: Reconnects, Backoff, Heartbeats
- 🔐 Auth & Security for Real-Time Channels
- 📈 Scaling Real-Time: Horizontal Scale, Redis Adapter
- 🧪 Quickstart (Local)
- 🐳 Quickstart (Docker Compose)
- 📦 Deployment Fundamentals: Docker, Env, Logging
- 🔁 CI/CD Overview: Build, Test, Deploy
- 🩺 Monitoring & Health Checks

## 🎯 What You'll Master
- Choose between HTTP polling and WebSockets for the right problem
- Implement real-time features with Socket.IO (server + client)
- Use rooms and namespaces to partition traffic and features
- Authenticate socket connections with JWT
- Scale real-time apps with a Redis adapter
- Containerize, configure, and deploy your Node app with Docker
- Add health checks, structured logging, and minimal monitoring

## 🔌 Real-Time Fundamentals (WebSockets vs HTTP)

Think of HTTP like mailing letters: you send a request and wait for a reply. WebSockets are like a live phone call: both sides can talk anytime without re-dialing.

- HTTP (Request/Response)
  - Great for CRUD, idempotent operations, and caching
  - Client must poll for updates or use Server-Sent Events (SSE)
- WebSockets
  - Full-duplex, persistent connection
  - Great for chats, live dashboards, collaborative editing, presence/typing indicators

## 🚦 Socket.IO Basics

Socket.IO simplifies WebSockets (and falls back to HTTP long-polling when needed) with auto-reconnect, rooms, and event-based messaging.

Server (Node):
```javascript
// server.js
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('🔌 client connected', socket.id);

  // Join a room
  socket.on('room:join', (room) => {
    socket.join(room);
    socket.to(room).emit('room:notice', `${socket.id} joined ${room}`);
  });

  // Broadcast to room
  socket.on('chat:message', ({ room, message }) => {
    io.to(room).emit('chat:message', { id: socket.id, message, ts: Date.now() });
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 client disconnected', socket.id, reason);
  });
});

server.listen(3001, () => console.log('⚡️ Socket server on :3001'));
```

Client (Browser):
```javascript
// client.js
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001', { withCredentials: true });

socket.on('connect', () => console.log('connected', socket.id));
socket.emit('room:join', 'general');

socket.on('chat:message', (payload) => {
  console.log('message', payload);
});

function sendMessage(text) {
  socket.emit('chat:message', { room: 'general', message: text });
}
```

Namespaces and Rooms:
- Namespaces: /admin, /metrics – separate features or privileges
- Rooms: group clients dynamically (e.g., per classroom or project)

## 🧭 Connection Lifecycle

Socket.IO includes resilience patterns:
- Auto-reconnect with exponential backoff
- Heartbeats (ping/pong) to detect dead connections
- Acknowledgements for delivery confirmation

Example with acknowledgements:
```javascript
// Client
socket.emit('chat:message', { room, message }, (ack) => {
  if (ack.ok) console.log('delivered');
});

// Server
socket.on('chat:message', (payload, cb) => {
  // process ...
  cb({ ok: true });
});
```

## 🔐 Auth & Security for Real-Time

- Authenticate on connection using a JWT (query param or auth header)  
- Authorize room joins (e.g., access to a classroom)  
- Validate all payloads server-side (never trust the client)  
- Rate limit high-risk events and enforce size limits  
- Avoid emitting secrets to clients

JWT handshake (simplified):
```javascript
// Server
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const payload = verifyAccessToken(token); // e.g., jwt.verify
    socket.user = { id: payload.sub, roles: payload.roles };
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});
```

## 📈 Scaling Real-Time

Single server → easy. Multiple instances → clients might connect to different servers. Use a pub/sub adapter to fan-out events across instances.

- Redis adapter for Socket.IO:
```javascript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();
await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));
```

## 🧪 Quickstart (Local)

Follow these steps to run the realtime demo locally (no Docker required):

1) Install and start
```bash
cd lesson20-real-time-and-deployment
npm install
npm run dev
```

2) Open the test client
- Open lesson20-real-time-and-deployment/client.html in your browser
- Click "Join Room" to join the default "general" room
- Click "Join Class" to join class:<trackId> (default trackId=123)
- Use the message input and click "Send" to broadcast to the room
- Click "Complete Lesson" to POST the REST endpoint; you should see a progress:updated event

3) Optional: trigger REST call via curl
```bash
curl -s -X POST \
  http://localhost:3001/api/tracks/123/lessons/abc/complete \
  -H 'Content-Type: application/json' \
  -d '{"userId":"student-1"}'
```

Tip: Open two browser windows, join the same class, and watch presence and progress events sync in real-time.

## 🐳 Quickstart (Docker Compose)

Run the realtime server with Redis for horizontal scaling.

```bash
cd lesson20-real-time-and-deployment
docker compose up --build
```

- Server: http://localhost:3001 (health: /health)
- Redis: redis://localhost:6379
- Open client.html in your browser and use the same steps as local quickstart

To scale the realtime service (example):
```bash
# In a second terminal, run another instance (compose v2 supports replicas via deploy, or run a second service)
# Example (manual second instance):
# docker compose up --build --scale realtime=2
```

Suggested screenshots (optional):
- Connected client showing socket id and joined room
- Two windows: instructor and student joined to the same class
- Message broadcast and delivered acknowledgement
- progress:updated displayed after REST completion

## 📦 Deployment Fundamentals (Docker)

Dockerfile (Node 18+):
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000 3001
CMD ["node", "server.js"]
```

docker-compose.yml for API + Socket + Redis:
```yaml
version: '3.9'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
    depends_on:
      - redis
  socket:
    build: .
    command: ["node", "server.js"]
    ports:
      - "3001:3001"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

Environment configuration:
- Keep secrets in environment variables (never commit to Git)
- Separate .env files per environment (development/test/production)

Logging:
- Use structured logs (JSON) for production
- Include requestId, userId, and event types for socket logs

## 🔁 CI/CD Overview

- Build: Install deps, run lint/tests, build Docker image
- Test: Run unit/integration tests (REST + Socket)
- Deploy: Push image to registry, roll out to environment (e.g., Docker Compose, Kubernetes, Fly.io, Render)

Example CI steps (conceptual):
- npm ci
- npm test
- docker build -t your-org/app:commitSHA .
- docker push your-org/app:commitSHA
- deploy via platform CLI or GitOps

## 🩺 Monitoring & Health Checks

- HTTP health checks (e.g., /health) and readiness endpoints
- Socket metrics: connection count, room sizes, event rates
- Capture errors and disconnect reasons
- Basic tools: Prometheus + Grafana, ELK/EFK stack, or hosted APM (Datadog, New Relic)

---

## Exercises
All practice drills and the capstone project are in `exercises.js`.

## Watch These Videos
- Socket.IO Crash Course (Traversy Media)
- WebSockets Explained (Fireship)
- Docker for Node.js (TechWorld with Nana)
- Scaling Socket.IO with Redis (official docs)

## References
- Socket.IO Docs
- WebSocket RFC 6455
- Twelve-Factor App (Logs, Config)
- Docker & Compose Documentation

## Reflection
- When should you use WebSockets vs HTTP/SSE?
- How would you authenticate Socket.IO connections securely?
- What changes when you scale from 1 to N socket servers?
- What deployment strategy best fits your project today?
