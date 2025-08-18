// Simple Service model for local storage
import { dataStore } from '../config/database.js';

class Service {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name || '';
    this.slug = data.slug || '';
    this.description = data.description || '';
    this.shortDescription = data.shortDescription || '';
    this.content = data.content || '';
    this.icon = data.icon || '';
    this.image = data.image || '';
    this.category = data.category || 'other';
    this.features = data.features || [];
    this.technologies = data.technologies || [];
    this.pricing = data.pricing || {
      basic: { price: 0, features: [] },
      standard: { price: 0, features: [] },
      premium: { price: 0, features: [] }
    };
    this.duration = data.duration || '';
    this.deliverables = data.deliverables || [];
    this.status = data.status || 'active';
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
      errors.push('Service name is required');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Service description is required');
    }
    
    return errors;
  }

  // Static methods
  static async getAll() {
    return dataStore.services.read();
  }

  static async getById(id) {
    const services = dataStore.services.read();
    return services.find(service => service.id === id);
  }

  static async getBySlug(slug) {
    const services = dataStore.services.read();
    return services.find(service => service.slug === slug);
  }

  static async getFeatured() {
    const services = dataStore.services.read();
    return services.filter(service => service.featured);
  }

  static async getByCategory(category) {
    const services = dataStore.services.read();
    return services.filter(service => service.category === category);
  }

  async save() {
    const services = dataStore.services.read();
    
    if (this.id) {
      // Update existing service
      const index = services.findIndex(s => s.id === this.id);
      if (index !== -1) {
        this.updatedAt = new Date().toISOString();
        services[index] = { ...this };
      }
    } else {
      // Create new service
      services.push(this);
    }
    
    dataStore.services.write(services);
    return this;
  }

  async delete() {
    const services = dataStore.services.read();
    const filtered = services.filter(s => s.id !== this.id);
    dataStore.services.write(filtered);
    return true;
  }
}

export default Service; 