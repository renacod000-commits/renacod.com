import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', (req, res) => {
  res.json({ message: 'Login route - to be implemented' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Register route - to be implemented' });
});

router.post('/forgot-password', (req, res) => {
  res.json({ message: 'Forgot password route - to be implemented' });
});

router.post('/reset-password/:token', (req, res) => {
  res.json({ message: 'Reset password route - to be implemented' });
});

// Protected routes
router.use(protect);

router.get('/me', (req, res) => {
  res.json({ message: 'Get current user route - to be implemented' });
});

router.put('/me', (req, res) => {
  res.json({ message: 'Update current user route - to be implemented' });
});

router.put('/change-password', (req, res) => {
  res.json({ message: 'Change password route - to be implemented' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout route - to be implemented' });
});

// Admin only routes
router.use(authorize('admin'));

router.get('/users', (req, res) => {
  res.json({ message: 'Get all users route - to be implemented' });
});

export default router; 