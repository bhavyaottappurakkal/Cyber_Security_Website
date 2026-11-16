import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './prisma.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import newsRoutes from './routes/news.js';
import projectsRoutes from './routes/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      status: 'UP',
      service: 'Amrita CyberAI Backend API',
      database: 'Connected to PostgreSQL via Prisma',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      status: 'DOWN',
      service: 'Amrita CyberAI Backend API',
      database: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectsRoutes);

// Fallback 404
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Amrita Cyber AI Backend running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Closing HTTP server and Prisma client.');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});

