import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// POST /api/contact - Create a new contact inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, category, subject, message } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters long' });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        category: category || 'general',
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our team will contact you shortly.',
      data: {
        id: submission.id,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return res.status(500).json({ error: 'Failed to process contact inquiry. Please try again later.' });
  }
});

// GET /api/contact - List contact submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

export default router;

