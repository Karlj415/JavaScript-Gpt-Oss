import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const app = createApp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ['http://localhost:5173'], credentials: true }
});

// Optional: Redis adapter for horizontal scaling (if REDIS_URL is set)
if (process.env.REDIS_URL) {
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();
  io.adapter(createAdapter(pubClient, subClient));
  console.log('🔗 Socket.IO Redis adapter enabled');
}

io.on('connection', (socket) => {
  console.log('🔌 connected', socket.id);

  socket.on('room:join', (room) => {
    socket.join(room);
    socket.to(room).emit('room:notice', `${socket.id} joined ${room}`);
  });

  // Convenience: join a classroom by track id
  socket.on('class:join', ({ trackId }) => {
    const room = `class:${trackId}`;
    socket.join(room);
    socket.to(room).emit('presence:join', { userId: socket.id, room });
  });

  socket.on('chat:message', ({ room, message }, ack) => {
    io.to(room).emit('chat:message', { id: socket.id, message, ts: Date.now() });
    ack?.({ ok: true });
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 disconnected', socket.id, reason);
  });
});

// Simulated Learning Tracker integration: mark lesson complete and emit progress
app.post('/api/tracks/:trackId/lessons/:lessonId/complete', (req, res) => {
  const { trackId, lessonId } = req.params;
  const { userId } = req.body || {};
  const percent = Math.min(100, Math.max(0, Number(req.body?.percent ?? Math.floor(Math.random() * 100)))) || 0;

  io.to(`class:${trackId}`).emit('progress:updated', {
    trackId,
    lessonId,
    userId: userId || 'user-demo',
    percent,
    ts: Date.now()
  });

  res.json({ ok: true, trackId, lessonId, userId: userId || 'user-demo', percent });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`⚡️ Realtime server listening on :${PORT}`);
  console.log(`🔎 Health: http://localhost:${PORT}/health`);
  console.log(`🧪 Complete lesson: POST http://localhost:${PORT}/api/tracks/123/lessons/abc/complete`);
});
