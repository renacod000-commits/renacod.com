import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Project slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
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
    required: [true, 'Project content is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'other'],
    default: 'other'
  },
  technologies: [{
    type: String,
    trim: true,
    required: [true, 'At least one technology is required']
  }],
  client: {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    logo: {
      type: String,
      trim: true
    }
  },
  images: [{
    url: {
      type: String,
      required: [true, 'Image URL is required']
    },
    alt: {
      type: String,
      trim: true,
      maxlength: [100, 'Alt text cannot exceed 100 characters']
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [200, 'Caption cannot exceed 200 characters']
    }
  }],
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required']
  },
  demoUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Demo URL must be a valid HTTP/HTTPS URL'
    }
  },
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https?:\/\/github\.com\/.+/.test(v);
      },
      message: 'GitHub URL must be a valid GitHub repository URL'
    }
  },
  liveUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Live URL must be a valid HTTP/HTTPS URL'
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Project start date is required']
  },
  endDate: {
    type: Date
  },
  duration: {
    type: String,
    trim: true
  },
  budget: {
    type: String,
    enum: ['under-10k', '10k-25k', '25k-50k', '50k-100k', 'over-100k', 'not-disclosed'],
    default: 'not-disclosed'
  },
  teamSize: {
    type: Number,
    min: [1, 'Team size must be at least 1'],
    max: [50, 'Team size cannot exceed 50']
  },
  challenges: [{
    type: String,
    trim: true,
    maxlength: [500, 'Challenge description cannot exceed 500 characters']
  }],
  solutions: [{
    type: String,
    trim: true,
    maxlength: [500, 'Solution description cannot exceed 500 characters']
  }],
  results: [{
    type: String,
    trim: true,
    maxlength: [500, 'Result description cannot exceed 500 characters']
  }],
  metrics: {
    performance: {
      type: String,
      trim: true
    },
    userSatisfaction: {
      type: Number,
      min: [0, 'User satisfaction must be between 0 and 100'],
      max: [100, 'User satisfaction must be between 0 and 100']
    },
    conversionRate: {
      type: String,
      trim: true
    }
  },
  testimonials: [{
    name: {
      type: String,
      required: [true, 'Testimonial name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    role: {
      type: String,
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
      trim: true,
      maxlength: [1000, 'Testimonial cannot exceed 1000 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5']
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold', 'cancelled'],
    default: 'completed'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
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
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1, status: 1, isPublished: 1 });
projectSchema.index({ isFeatured: 1, isPublished: 1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ 'client.company': 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for project duration
projectSchema.virtual('durationInDays').get(function() {
  if (this.startDate && this.endDate) {
    return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Virtual for project age
projectSchema.virtual('ageInDays').get(function() {
  if (this.createdAt) {
    return Math.ceil((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Pre-save middleware
projectSchema.pre('save', function(next) {
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
projectSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

projectSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

// Static methods
projectSchema.statics.getFeaturedProjects = function(limit = 6) {
  return this.find({ isFeatured: true, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

projectSchema.statics.getProjectsByCategory = function(category, limit = 10) {
  return this.find({ category, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

projectSchema.statics.searchProjects = function(query, limit = 10) {
  return this.find({
    $and: [
      { isPublished: true },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { technologies: { $in: [new RegExp(query, 'i')] } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  })
  .sort({ createdAt: -1 })
  .limit(limit);
};

const Project = mongoose.model('Project', projectSchema);

export default Project; 