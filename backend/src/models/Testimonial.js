import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company cannot exceed 100 characters']
  },
  companyLogo: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Testimonial content is required'],
    trim: true,
    maxlength: [1000, 'Content cannot exceed 1000 characters']
  },
  shortContent: {
    type: String,
    trim: true,
    maxlength: [200, 'Short content cannot exceed 200 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5']
  },
  project: {
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Project title cannot exceed 200 characters']
    },
    category: {
      type: String,
      enum: ['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'other'],
      default: 'other'
    },
    completedAt: {
      type: Date
    }
  },
  services: [{
    type: String,
    enum: ['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'maintenance', 'other'],
    default: 'other'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  },
  contactInfo: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
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
    linkedin: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/www\.linkedin\.com\/in\/.+/.test(v);
        },
        message: 'LinkedIn URL must be a valid LinkedIn profile URL'
      }
    }
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
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
testimonialSchema.index({ isPublished: 1, isFeatured: 1 });
testimonialSchema.index({ rating: -1, createdAt: -1 });
testimonialSchema.index({ company: 1 });
testimonialSchema.index({ services: 1 });
testimonialSchema.index({ tags: 1 });
testimonialSchema.index({ order: 1, createdAt: -1 });

// Virtual for helpful score
testimonialSchema.virtual('helpfulScore').get(function() {
  const total = this.helpful + this.notHelpful;
  return total > 0 ? (this.helpful / total) * 100 : 0;
});

// Virtual for testimonial age
testimonialSchema.virtual('ageInDays').get(function() {
  if (this.createdAt) {
    return Math.ceil((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Pre-save middleware
testimonialSchema.pre('save', function(next) {
  // Auto-generate short content if not provided
  if (!this.shortContent && this.content) {
    this.shortContent = this.content.substring(0, 200).replace(/\s+\S*$/, '') + '...';
  }
  
  // Auto-generate SEO fields if not provided
  if (!this.seo.title) {
    this.seo.title = `Testimonial from ${this.name} at ${this.company}`;
  }
  if (!this.seo.description) {
    this.seo.description = this.shortContent;
  }
  
  // Auto-generate tags based on services and project
  if (this.services && this.services.length > 0) {
    this.tags = [...this.services];
    if (this.project && this.project.category) {
      this.tags.push(this.project.category);
    }
  }
  
  next();
});

// Instance methods
testimonialSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

testimonialSchema.methods.markAsHelpful = function() {
  this.helpful += 1;
  return this.save();
};

testimonialSchema.methods.markAsNotHelpful = function() {
  this.notHelpful += 1;
  return this.save();
};

// Static methods
testimonialSchema.statics.getPublishedTestimonials = function() {
  return this.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
};

testimonialSchema.statics.getFeaturedTestimonials = function(limit = 6) {
  return this.find({ isFeatured: true, isPublished: true })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit);
};

testimonialSchema.statics.getTestimonialsByRating = function(minRating = 4, limit = 10) {
  return this.find({ rating: { $gte: minRating }, isPublished: true })
    .sort({ rating: -1, createdAt: -1 })
    .limit(limit);
};

testimonialSchema.statics.getTestimonialsByService = function(service, limit = 10) {
  return this.find({ services: service, isPublished: true })
    .sort({ rating: -1, createdAt: -1 })
    .limit(limit);
};

testimonialSchema.statics.getTestimonialsByCompany = function(company, limit = 10) {
  return this.find({ company: { $regex: company, $options: 'i' }, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial; 