import express from 'express';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'healthy', ts: new Date().toISOString(), uptime: process.uptime() });
  });

  return app;
}
