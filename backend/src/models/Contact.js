import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  service: {
    type: String,
    enum: ['web-development', 'app-development', 'ai-integration', 'consulting', 'other'],
    default: 'other'
  },
  budget: {
    type: String,
    enum: ['under-10k', '10k-25k', '25k-50k', '50k-100k', 'over-100k', 'not-specified'],
    default: 'not-specified'
  },
  timeline: {
    type: String,
    enum: ['asap', '1-2-weeks', '1-2-months', '3-6-months', '6-months-plus', 'not-specified'],
    default: 'not-specified'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'contacted', 'qualified', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social-media', 'email', 'other'],
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  respondedAt: {
    type: Date
  },
  responseMethod: {
    type: String,
    enum: ['email', 'phone', 'meeting', 'other'],
    default: 'email'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, priority: 1, createdAt: -1 });
contactSchema.index({ isRead: 1, createdAt: -1 });

// Virtual for time since creation
contactSchema.virtual('timeSinceCreation').get(function() {
  return Date.now() - this.createdAt;
});

// Virtual for response time
contactSchema.virtual('responseTime').get(function() {
  if (this.respondedAt) {
    return this.respondedAt - this.createdAt;
  }
  return null;
});

// Pre-save middleware
contactSchema.pre('save', function(next) {
  // Auto-generate subject if not provided
  if (!this.subject && this.service !== 'other') {
    this.subject = `Inquiry about ${this.service.replace('-', ' ')} services`;
  }
  
  // Auto-generate tags based on service and budget
  if (this.service && this.service !== 'other') {
    this.tags = [this.service, this.budget, this.timeline].filter(Boolean);
  }
  
  next();
});

// Instance methods
contactSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

contactSchema.methods.markAsResponded = function(method = 'email') {
  this.respondedAt = new Date();
  this.responseMethod = method;
  this.status = 'contacted';
  return this.save();
};

// Static methods
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ isRead: false });
};

contactSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
        contacted: { $sum: { $cond: [{ $eq: ['$status', 'contacted'] }, 1, 0] },
        qualified: { $sum: { $cond: [{ $eq: ['$status', 'qualified'] }, 1, 0] },
        closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] }
      }
    }
  ]);
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact; 