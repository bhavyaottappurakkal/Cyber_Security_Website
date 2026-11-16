import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to Amrita Cyber AI updates.',
      });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email: cleanEmail },
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to Amrita Cyber AI updates.',
      data: { id: subscriber.id, email: subscriber.email },
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return res.status(500).json({ error: 'Failed to process newsletter subscription' });
  }
});

export default router;

