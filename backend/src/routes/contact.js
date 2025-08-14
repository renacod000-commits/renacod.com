import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContact,
  markAsResponded,
  deleteContact,
  getContactStats,
  bulkUpdateContacts,
  exportContacts
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateContactSubmission } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/', validateContactSubmission, submitContact);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'manager'));

router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.get('/export', exportContacts);
router.patch('/bulk', bulkUpdateContacts);

router.get('/:id', getContactById);
router.patch('/:id', updateContact);
router.patch('/:id/respond', markAsResponded);
router.delete('/:id', authorize('admin'), deleteContact);

export default router; 