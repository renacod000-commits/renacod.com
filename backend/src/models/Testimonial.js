// Simple Testimonial model for local storage
import { dataStore } from '../config/database.js';

class Testimonial {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name || '';
    this.role = data.role || '';
    this.company = data.company || '';
    this.content = data.content || '';
    this.rating = data.rating || 5;
    this.image = data.image || '';
    this.project = data.project || '';
    this.service = data.service || '';
    this.status = data.status || 'approved';
    this.featured = data.featured || false;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (!this.content || this.content.trim().length === 0) {
      errors.push('Testimonial content is required');
    }
    
    if (this.rating < 1 || this.rating > 5) {
      errors.push('Rating must be between 1 and 5');
    }
    
    return errors;
  }

  // Static methods
  static async getAll() {
    return dataStore.testimonials.read();
  }

  static async getById(id) {
    const testimonials = dataStore.testimonials.read();
    return testimonials.find(testimonial => testimonial.id === id);
  }

  static async getFeatured() {
    const testimonials = dataStore.testimonials.read();
    return testimonials.filter(testimonial => testimonial.featured);
  }

  static async getApproved() {
    const testimonials = dataStore.testimonials.read();
    return testimonials.filter(testimonial => testimonial.status === 'approved');
  }

  async save() {
    const testimonials = dataStore.testimonials.read();
    
    if (this.id) {
      // Update existing testimonial
      const index = testimonials.findIndex(t => t.id === this.id);
      if (index !== -1) {
        this.updatedAt = new Date().toISOString();
        testimonials[index] = { ...this };
      }
    } else {
      // Create new testimonial
      testimonials.push(this);
    }
    
    dataStore.testimonials.write(testimonials);
    return this;
  }

  async delete() {
    const testimonials = dataStore.testimonials.read();
    const filtered = testimonials.filter(t => t.id !== this.id);
    dataStore.testimonials.write(filtered);
    return true;
  }
}

export default Testimonial; 