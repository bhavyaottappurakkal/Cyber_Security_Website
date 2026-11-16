import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// GET /api/projects - List research projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.researchProject.findMany({
      orderBy: { id: 'asc' },
    });
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Error fetching research projects:', error);
    return res.status(500).json({ error: 'Failed to fetch research projects' });
  }
});

// GET /api/projects/whitepapers - List white papers & blueprints
router.get('/whitepapers', async (req, res) => {
  try {
    const whitepapers = await prisma.whitePaper.findMany({
      orderBy: { id: 'asc' },
    });
    return res.json({ success: true, count: whitepapers.length, data: whitepapers });
  } catch (error) {
    console.error('Error fetching white papers:', error);
    return res.status(500).json({ error: 'Failed to fetch white papers' });
  }
});

export default router;

