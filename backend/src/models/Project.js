// Simple Project model for local storage
import { dataStore } from '../config/database.js';

class Project {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title || '';
    this.slug = data.slug || '';
    this.description = data.description || '';
    this.shortDescription = data.shortDescription || '';
    this.content = data.content || '';
    this.category = data.category || 'other';
    this.technologies = data.technologies || [];
    this.client = data.client || { name: '', company: '', logo: '' };
    this.images = data.images || [];
    this.featuredImage = data.featuredImage || '';
    this.demoUrl = data.demoUrl || '';
    this.githubUrl = data.githubUrl || '';
    this.liveUrl = data.liveUrl || '';
    this.startDate = data.startDate || null;
    this.endDate = data.endDate || null;
    this.duration = data.duration || '';
    this.budget = data.budget || 'not-disclosed';
    this.teamSize = data.teamSize || 1;
    this.challenges = data.challenges || [];
    this.solutions = data.solutions || [];
    this.results = data.results || [];
    this.metrics = data.metrics || {
      performance: '',
      userSatisfaction: 0,
      conversionRate: ''
    };
    this.testimonials = data.testimonials || [];
    this.tags = data.tags || [];
    this.status = data.status || 'completed';
    this.featured = data.featured || false;
    this.isPublished = data.isPublished || true;
    this.views = data.views || 0;
    this.likes = data.likes || 0;
    this.seo = data.seo || {
      title: '',
      description: '',
      keywords: []
    };
    this.completedAt = data.completedAt || null;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim().length === 0) {
      errors.push('Project title is required');
    }
    if (this.title && this.title.length > 200) {
      errors.push('Title cannot exceed 200 characters');
    }
    
    if (!this.slug || this.slug.trim().length === 0) {
      errors.push('Project slug is required');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Project description is required');
    }
    if (this.description && this.description.length > 2000) {
      errors.push('Description cannot exceed 2000 characters');
    }
    
    if (!this.shortDescription || this.shortDescription.trim().length === 0) {
      errors.push('Short description is required');
    }
    if (this.shortDescription && this.shortDescription.length > 300) {
      errors.push('Short description cannot exceed 300 characters');
    }
    
    if (!this.content || this.content.trim().length === 0) {
      errors.push('Project content is required');
    }
    
    if (!this.featuredImage || this.featuredImage.trim().length === 0) {
      errors.push('Featured image is required');
    }
    
    if (this.technologies.length === 0) {
      errors.push('At least one technology is required');
    }
    
    return errors;
  }

  // Auto-generate slug if not provided
  autoGenerateSlug() {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    }
  }
  
  // Auto-generate short description if not provided
  autoGenerateShortDescription() {
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 300).replace(/\s+\S*$/, '') + '...';
    }
  }
  
  // Auto-generate SEO fields if not provided
  autoGenerateSEO() {
  if (!this.seo.title) {
    this.seo.title = this.title;
  }
  if (!this.seo.description) {
    this.seo.description = this.shortDescription;
  }
  }

// Instance methods
  incrementViews() {
  this.views += 1;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  incrementLikes() {
  this.likes += 1;
    this.updatedAt = new Date().toISOString();
    return this;
  }

// Static methods
  static async getAll() {
    return dataStore.projects.read();
  }

  static async getById(id) {
    const projects = dataStore.projects.read();
    return projects.find(project => project.id === id);
  }

  static async getBySlug(slug) {
    const projects = dataStore.projects.read();
    return projects.find(project => project.slug === slug);
  }

  static async getFeatured() {
    const projects = dataStore.projects.read();
    return projects.filter(project => project.featured);
  }

  static async getByCategory(category) {
    const projects = dataStore.projects.read();
    return projects.filter(project => project.category === category);
  }

  static async getFeaturedProjects(limit = 6) {
    const projects = dataStore.projects.read();
    return projects
      .filter(p => p.featured && p.isPublished)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  static async getProjectsByCategory(category, limit = 10) {
    const projects = dataStore.projects.read();
    return projects
      .filter(p => p.category === category && p.isPublished)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  async save() {
    const projects = dataStore.projects.read();
    
    if (this.id) {
      // Update existing project
      const index = projects.findIndex(p => p.id === this.id);
      if (index !== -1) {
        this.autoGenerateSlug();
        this.autoGenerateShortDescription();
        this.autoGenerateSEO();
        this.updatedAt = new Date().toISOString();
        projects[index] = { ...this };
      }
    } else {
      // Create new project
      this.autoGenerateSlug();
      this.autoGenerateShortDescription();
      this.autoGenerateSEO();
      projects.push(this);
    }
    
    dataStore.projects.write(projects);
    return this;
  }

  async delete() {
    const projects = dataStore.projects.read();
    const filtered = projects.filter(p => p.id !== this.id);
    dataStore.projects.write(filtered);
    return true;
  }
}

export default Project; 