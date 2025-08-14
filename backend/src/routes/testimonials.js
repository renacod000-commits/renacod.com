import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Testimonials route - to be implemented' });
});

// Protected routes
router.use(protect);
router.use(authorize('admin', 'manager', 'editor'));

export default router; 