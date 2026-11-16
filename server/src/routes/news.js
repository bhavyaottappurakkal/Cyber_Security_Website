import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// GET /api/news - List news items
router.get('/', async (req, res) => {
  try {
    const news = await prisma.newsItem.findMany({
      orderBy: { id: 'asc' },
    });
    return res.json({ success: true, count: news.length, data: news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ error: 'Failed to fetch news items' });
  }
});

export default router;

