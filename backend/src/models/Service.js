import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Service slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Service content is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'maintenance', 'other'],
    default: 'other'
  },
  icon: {
    type: String,
    required: [true, 'Service icon is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  features: [{
    title: {
      type: String,
      required: [true, 'Feature title is required'],
      trim: true,
      maxlength: [100, 'Feature title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Feature description is required'],
      trim: true,
      maxlength: [300, 'Feature description cannot exceed 300 characters']
    },
    icon: {
      type: String,
      trim: true
    }
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'monthly', 'project-based', 'custom'],
      default: 'custom'
    },
    startingPrice: {
      type: Number,
      min: [0, 'Starting price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    unit: {
      type: String,
      enum: ['hour', 'day', 'week', 'month', 'project'],
      default: 'project'
    }
  },
  process: [{
    step: {
      type: Number,
      required: [true, 'Step number is required'],
      min: [1, 'Step number must be at least 1']
    },
    title: {
      type: String,
      required: [true, 'Step title is required'],
      trim: true,
      maxlength: [100, 'Step title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Step description is required'],
      trim: true,
      maxlength: [300, 'Step description cannot exceed 300 characters']
    },
    duration: {
      type: String,
      trim: true
    }
  }],
  deliverables: [{
    type: String,
    trim: true,
    maxlength: [200, 'Deliverable cannot exceed 200 characters']
  }],
  timeline: {
    min: {
      type: String,
      trim: true
    },
    max: {
      type: String,
      trim: true
    },
    average: {
      type: String,
      trim: true
    }
  },
  requirements: [{
    type: String,
    trim: true,
    maxlength: [300, 'Requirement cannot exceed 300 characters']
  }],
  benefits: [{
    type: String,
    trim: true,
    maxlength: [300, 'Benefit cannot exceed 300 characters']
  }],
  caseStudies: [{
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Case study title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Case study description cannot exceed 500 characters']
    },
    results: {
      type: String,
      trim: true,
      maxlength: [300, 'Results cannot exceed 300 characters']
    },
    image: {
      type: String,
      trim: true
    }
  }],
  faqs: [{
    question: {
      type: String,
      required: [true, 'FAQ question is required'],
      trim: true,
      maxlength: [300, 'Question cannot exceed 300 characters']
    },
    answer: {
      type: String,
      required: [true, 'FAQ answer is required'],
      trim: true,
      maxlength: [1000, 'Answer cannot exceed 1000 characters']
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  inquiries: {
    type: Number,
    default: 0
  },
  seo: {
    title: {
      type: String,
      trim: true,
      maxlength: [60, 'SEO title cannot exceed 60 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [160, 'SEO description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1, isActive: 1 });
serviceSchema.index({ order: 1, isActive: 1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ createdAt: -1 });

// Virtual for service popularity
serviceSchema.virtual('popularityScore').get(function() {
  return (this.views * 0.3) + (this.inquiries * 0.7);
});

// Pre-save middleware
serviceSchema.pre('save', function(next) {
  // Auto-generate slug if not provided
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Auto-generate short description if not provided
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 300).replace(/\s+\S*$/, '') + '...';
  }
  
  // Auto-generate SEO fields if not provided
  if (!this.seo.title) {
    this.seo.title = this.title;
  }
  if (!this.seo.description) {
    this.seo.description = this.shortDescription;
  }
  
  next();
});

// Instance methods
serviceSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

serviceSchema.methods.incrementInquiries = function() {
  this.inquiries += 1;
  return this.save();
};

// Static methods
serviceSchema.statics.getActiveServices = function() {
  return this.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
};

serviceSchema.statics.getFeaturedServices = function(limit = 6) {
  return this.find({ isFeatured: true, isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit);
};

serviceSchema.statics.getServicesByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ order: 1, createdAt: -1 });
};

serviceSchema.statics.getPopularServices = function(limit = 6) {
  return this.find({ isActive: true })
    .sort({ views: -1, inquiries: -1 })
    .limit(limit);
};

const Service = mongoose.model('Service', serviceSchema);

export default Service; 