import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/emailService.js';
import { catchAsync } from '../utils/catchAsync.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = catchAsync(async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    subject,
    message,
    service,
    budget,
    timeline,
    source = 'website'
  } = req.body;

  // Create new contact
  const contact = await Contact.create({
    name,
    email,
    phone,
    company,
    subject,
    message,
    service,
    budget,
    timeline,
    source
  });

  // Send notification email
  try {
    await sendContactNotification(contact);
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    // Don't fail the request if email fails
  }

  res.status(201).json({
    status: 'success',
    message: 'Thank you for your message! We will get back to you within 24 hours.',
    data: {
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        submittedAt: contact.createdAt
      }
    }
  });
});

// @desc    Get all contacts (admin only)
// @route   GET /api/contact
// @access  Private
export const getAllContacts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  
  // Apply filters
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.service) filter.service = req.query.service;
  if (req.query.source) filter.source = req.query.source;
  if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';
  
  // Search functionality
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { company: searchRegex },
      { subject: searchRegex },
      { message: searchRegex }
    ];
  }

  // Date range filter
  if (req.query.startDate || req.query.endDate) {
    filter.createdAt = {};
    if (req.query.startDate) {
      filter.createdAt.$gte = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
      filter.createdAt.$lte = new Date(req.query.endDate);
    }
  }

  const [contacts, total] = await Promise.all([
    Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    Contact.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage
    },
    data: {
      contacts
    }
  });
});

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private
export const getContactById = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  // Mark as read if not already read
  if (!contact.isRead) {
    contact.isRead = true;
    contact.readAt = new Date();
    await contact.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      contact
    }
  });
});

// @desc    Update contact status
// @route   PATCH /api/contact/:id
// @access  Private
export const updateContact = catchAsync(async (req, res) => {
  const { status, priority, notes, tags } = req.body;
  
  const allowedUpdates = ['status', 'priority', 'notes', 'tags'];
  const updates = {};
  
  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true
    }
  );

  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Contact updated successfully',
    data: {
      contact
    }
  });
});

// @desc    Mark contact as responded
// @route   PATCH /api/contact/:id/respond
// @access  Private
export const markAsResponded = catchAsync(async (req, res) => {
  const { responseMethod = 'email' } = req.body;
  
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  await contact.markAsResponded(responseMethod);

  res.status(200).json({
    status: 'success',
    message: 'Contact marked as responded',
    data: {
      contact
    }
  });
});

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = catchAsync(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  
  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Contact deleted successfully'
  });
});

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private
export const getContactStats = catchAsync(async (req, res) => {
  const [stats, unreadCount, recentContacts] = await Promise.all([
    Contact.getStats(),
    Contact.getUnreadCount(),
    Contact.find({ isRead: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt priority')
  ]);

  // Get counts by status
  const statusCounts = await Contact.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get counts by service
  const serviceCounts = await Contact.aggregate([
    {
      $group: {
        _id: '$service',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get counts by priority
  const priorityCounts = await Contact.aggregate([
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get daily counts for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const dailyCounts = await Contact.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt'
          }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: stats[0] || {},
      unreadCount,
      recentContacts,
      statusCounts,
      serviceCounts,
      priorityCounts,
      dailyCounts
    }
  });
});

// @desc    Bulk update contacts
// @route   PATCH /api/contact/bulk
// @access  Private
export const bulkUpdateContacts = catchAsync(async (req, res) => {
  const { contactIds, updates } = req.body;
  
  if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Contact IDs array is required'
    });
  }

  const allowedUpdates = ['status', 'priority', 'tags'];
  const filteredUpdates = {};
  
  allowedUpdates.forEach(field => {
    if (updates[field] !== undefined) {
      filteredUpdates[field] = updates[field];
    }
  });

  if (Object.keys(filteredUpdates).length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'No valid updates provided'
    });
  }

  const result = await Contact.updateMany(
    { _id: { $in: contactIds } },
    filteredUpdates
  );

  res.status(200).json({
    status: 'success',
    message: `${result.modifiedCount} contacts updated successfully`,
    data: {
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    }
  });
});

// @desc    Export contacts
// @route   GET /api/contact/export
// @access  Private
export const exportContacts = catchAsync(async (req, res) => {
  const { format = 'json', status, startDate, endDate } = req.query;
  
  const filter = {};
  
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .select('-__v');

  if (format === 'csv') {
    // Convert to CSV format
    const csvHeaders = [
      'Name',
      'Email',
      'Phone',
      'Company',
      'Subject',
      'Message',
      'Service',
      'Budget',
      'Timeline',
      'Status',
      'Priority',
      'Source',
      'Submitted At'
    ];

    const csvRows = contacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone || '',
      contact.company || '',
      contact.subject,
      contact.message,
      contact.service,
      contact.budget,
      contact.timeline,
      contact.status,
      contact.priority,
      contact.source,
      contact.createdAt.toISOString()
    ]);

    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');
    res.send(csvContent);
  } else {
    res.status(200).json({
      status: 'success',
      results: contacts.length,
      data: {
        contacts
      }
    });
  }
}); 