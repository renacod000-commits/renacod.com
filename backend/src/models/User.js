// Simple User model for local storage
import { dataStore } from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.role = data.role || 'user';
    this.avatar = data.avatar || '';
    this.isActive = data.isActive || true;
    this.isVerified = data.isVerified || false;
    this.lastLogin = data.lastLogin || null;
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
    
    if (!this.email || this.email.trim().length === 0) {
      errors.push('Email is required');
    }
    
    if (!this.password || this.password.trim().length === 0) {
      errors.push('Password is required');
    }
    
    if (this.password && this.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    return errors;
  }

  // Hash password
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  // Check password
  async checkPassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Static methods
  static async getAll() {
    return dataStore.users.read();
  }

  static async getById(id) {
    const users = dataStore.users.read();
    return users.find(user => user.id === id);
  }

  static async getByEmail(email) {
    const users = dataStore.users.read();
    return users.find(user => user.email === email);
  }

  static async getActiveUsers() {
    const users = dataStore.users.read();
    return users.filter(user => user.isActive);
  }

  async save() {
    const users = dataStore.users.read();
    
    if (this.id) {
      // Update existing user
      const index = users.findIndex(u => u.id === this.id);
      if (index !== -1) {
        this.updatedAt = new Date().toISOString();
        users[index] = { ...this };
      }
    } else {
      // Create new user
      await this.hashPassword();
      users.push(this);
    }
    
    dataStore.users.write(users);
    return this;
  }

  async delete() {
    const users = dataStore.users.read();
    const filtered = users.filter(u => u.id !== this.id);
    dataStore.users.write(filtered);
    return true;
  }
}

export default User; 