// =============================================================================
// 🎯 PRACTICE DRILLS - Real-Time + Deployment
// =============================================================================

/*
📝 DRILL 1: Realtime Chat with Rooms
Objective: Build a minimal chat with Socket.IO

Tasks:
1) Server: events `room:join`, `chat:message`
2) Client: join "general", send messages
3) Use acknowledgements to confirm delivery
4) Add simple rate limiting for `chat:message` (e.g., 5/sec per socket)
*/

/*
📝 DRILL 2: Realtime Notifications in Learning Tracker
Objective: Broadcast lesson progress in real-time

Tasks:
1) When a user completes a lesson (existing REST endpoint), emit `progress:updated` with userId, trackId, percentComplete
2) Room strategy: `track:<id>` for subscribers
3) Client listens and updates UI in real-time
*/

/*
📝 DRILL 3: Presence & Heartbeats
Objective: Track who is online per room

Tasks:
1) On connection, set user as online; on disconnect, set offline
2) Maintain room membership lists in memory (or Redis)
3) Expose `/presence/:room` HTTP endpoint that returns online users (cache from memory)
*/

/*
📝 DRILL 4: Auth for Socket Connections
Objective: Secure your realtime channel

Tasks:
1) Require JWT in `socket.handshake.auth.token`
2) Verify token during `io.use` middleware
3) Authorize room joins based on user role or ownership
*/

/*
📝 DRILL 5: Scaling with Redis Adapter
Objective: Prepare for multiple instances

Tasks:
1) Add `@socket.io/redis-adapter` and Redis service
2) Use pub/sub adapter so events fan out across instances
3) Test by running two socket servers locally and ensure cross-instance broadcasting
*/

/*
📝 DRILL 6: Dockerize & Configure
Objective: Make your app shippable

Tasks:
1) Add a Dockerfile for Node app
2) Add docker-compose with app + redis
3) Wire env vars (JWT secrets, Redis URL) via .env
4) Add a /health endpoint for liveness
*/

/*
📝 DRILL 7: Minimal CI/CD Plan
Objective: Define a reliable pipeline

Tasks:
1) Build: npm ci, tests, docker build
2) Push image to registry
3) Deploy: docker compose up (or platform of choice)
4) Rollback: define a rollback step using the previous image
*/

// =============================================================================
// 🎨 CAPSTONE: Live Classroom for the Learning Tracker
// =============================================================================

/*
Feature Set:
- Roles: INSTRUCTOR, STUDENT
- Rooms: `class:<trackId>` for each track/classroom
- Events:
  - `class:join` { trackId }
  - `class:announce` { trackId, message } (INSTRUCTOR only)
  - `class:typing` { trackId, isTyping }
  - `progress:updated` { trackId, userId, percent }
- Presence: maintain online users per class
- Security: JWT auth on connection; authorize instructor actions
- Scaling: Redis adapter
- Deployment: Docker Compose for api + socket + redis

Acceptance Criteria:
- Students and instructor join the same class room and see live messages
- Instructor announcements appear to all students immediately
- Typing indicator broadcasts to room and times out when idle
- When a student completes a lesson via REST, the class sees `progress:updated`
- App runs with `docker compose up` using environment variables

Suggested Folder Structure:

src/
  app.js               # HTTP app (REST + health)
  server.js            # Entry point; starts HTTP and socket server
  socket/
    index.js           # Socket.IO server setup and middleware
    events.js          # All event handlers and room logic
    auth.js            # JWT verification for socket handshake
  realtime/
    presence.js        # Presence tracking utilities
    rateLimiter.js     # Simple in-memory rate limit per socket
  config/
    env.js             # Reads env vars (PORT, JWT secrets, REDIS URL)
  utils/
    logger.js          # Console + JSON logging

Starter Snippets (illustrative):

```javascript
// src/socket/auth.js
import jwt from 'jsonwebtoken';
export const socketAuth = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Unauthorized'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      socket.user = { id: decoded.sub, roles: decoded.roles || [] };
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });
};
```

```javascript
// src/socket/events.js
export const registerSocketEvents = (io) => {
  io.on('connection', (socket) => {
    socket.on('class:join', ({ trackId }) => {
      const room = `class:${trackId}`;
      socket.join(room);
      io.to(room).emit('presence:join', { userId: socket.user.id, room });
    });

    socket.on('class:announce', ({ trackId, message }) => {
      if (!socket.user.roles.includes('INSTRUCTOR')) return;
      io.to(`class:${trackId}`).emit('class:announce', { message, ts: Date.now() });
    });

    socket.on('class:typing', ({ trackId, isTyping }) => {
      socket.to(`class:${trackId}`).emit('class:typing', { userId: socket.user.id, isTyping });
    });

    socket.on('disconnect', () => {
      // update presence store
    });
  });
};
```

Verification Steps:
- Run API + Socket + Redis via docker compose
- Open two browser windows, connect as instructor and student
- Join the same class and exchange messages/events
- Trigger REST lesson completion and observe live `progress:updated`
- Scale socket service to 2 replicas; verify cross-replica messaging
*/
