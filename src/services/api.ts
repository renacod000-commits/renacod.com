// API service for communicating with the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  service?: string;
  budget?: string;
  timeline?: string;
  source?: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  service: string;
  budget: string;
  timeline: string;
  status: string;
  priority: string;
  source: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  featuredImage: string;
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  status: string;
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  icon: string;
  image?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  technologies: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar?: string;
  content: string;
  shortContent: string;
  rating: number;
  services: string[];
  isVerified: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Contact API
export const contactApi = {
  // Submit contact form
  submit: async (formData: ContactFormData): Promise<ApiResponse> => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  // Get all contacts (admin only)
  getAll: async (token: string, params?: Record<string, any>): Promise<ApiResponse<{ contacts: Contact[]; pagination: any }>> => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const endpoint = queryString ? `/contact?${queryString}` : '/contact';
    
    return apiRequest(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Get contact by ID (admin only)
  getById: async (id: string, token: string): Promise<ApiResponse<{ contact: Contact }>> => {
    return apiRequest(`/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Update contact (admin only)
  update: async (id: string, updates: Partial<Contact>, token: string): Promise<ApiResponse<{ contact: Contact }>> => {
    return apiRequest(`/contact/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Mark contact as responded (admin only)
  markAsResponded: async (id: string, method: string, token: string): Promise<ApiResponse<{ contact: Contact }>> => {
    return apiRequest(`/contact/${id}/respond`, {
      method: 'PATCH',
      body: JSON.stringify({ responseMethod: method }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Delete contact (admin only)
  delete: async (id: string, token: string): Promise<ApiResponse> => {
    return apiRequest(`/contact/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Get contact statistics (admin only)
  getStats: async (token: string): Promise<ApiResponse<any>> => {
    return apiRequest('/contact/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Export contacts (admin only)
  export: async (format: 'json' | 'csv', token: string, params?: Record<string, any>): Promise<Blob> => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const endpoint = queryString ? `/contact/export?format=${format}&${queryString}` : `/contact/export?format=${format}`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  },
};

// Projects API
export const projectsApi = {
  // Get all published projects
  getAll: async (params?: Record<string, any>): Promise<ApiResponse<{ projects: Project[] }>> => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const endpoint = queryString ? `/projects?${queryString}` : '/projects';
    
    return apiRequest(endpoint);
  },

  // Get project by slug
  getBySlug: async (slug: string): Promise<ApiResponse<{ project: Project }>> => {
    return apiRequest(`/projects/slug/${slug}`);
  },

  // Get featured projects
  getFeatured: async (limit: number = 6): Promise<ApiResponse<{ projects: Project[] }>> => {
    return apiRequest(`/projects/featured?limit=${limit}`);
  },

  // Get projects by category
  getByCategory: async (category: string, limit: number = 10): Promise<ApiResponse<{ projects: Project[] }>> => {
    return apiRequest(`/projects/category/${category}?limit=${limit}`);
  },

  // Search projects
  search: async (query: string, limit: number = 10): Promise<ApiResponse<{ projects: Project[] }>> => {
    return apiRequest(`/projects/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },
};

// Services API
export const servicesApi = {
  // Get all active services
  getAll: async (): Promise<ApiResponse<{ services: Service[] }>> => {
    return apiRequest('/services');
  },

  // Get service by slug
  getBySlug: async (slug: string): Promise<ApiResponse<{ service: Service }>> => {
    return apiRequest(`/services/slug/${slug}`);
  },

  // Get featured services
  getFeatured: async (limit: number = 6): Promise<ApiResponse<{ services: Service[] }>> => {
    return apiRequest(`/services/featured?limit=${limit}`);
  },

  // Get services by category
  getByCategory: async (category: string): Promise<ApiResponse<{ services: Service[] }>> => {
    return apiRequest(`/services/category/${category}`);
  },
};

// Testimonials API
export const testimonialsApi = {
  // Get all published testimonials
  getAll: async (): Promise<ApiResponse<{ testimonials: Testimonial[] }>> => {
    return apiRequest('/testimonials');
  },

  // Get featured testimonials
  getFeatured: async (limit: number = 6): Promise<ApiResponse<{ testimonials: Testimonial[] }>> => {
    return apiRequest(`/testimonials/featured?limit=${limit}`);
  },

  // Get testimonials by rating
  getByRating: async (minRating: number = 4, limit: number = 10): Promise<ApiResponse<{ testimonials: Testimonial[] }>> => {
    return apiRequest(`/testimonials/rating/${minRating}?limit=${limit}`);
  },

  // Get testimonials by service
  getByService: async (service: string, limit: number = 10): Promise<ApiResponse<{ testimonials: Testimonial[] }>> => {
    return apiRequest(`/testimonials/service/${service}?limit=${limit}`);
  },
};

// Health check API
export const healthApi = {
  check: async (): Promise<ApiResponse> => {
    return apiRequest('/health');
  },
};

// Utility functions
export const apiUtils = {
  // Check if API is available
  isAvailable: async (): Promise<boolean> => {
    try {
      await healthApi.check();
      return true;
    } catch {
      return false;
    }
  },

  // Get API base URL
  getBaseUrl: (): string => {
    return API_BASE_URL;
  },

  // Format error message
  formatError: (error: any): string => {
    if (error.message) {
      return error.message;
    }
    if (error.errors && Array.isArray(error.errors)) {
      return error.errors.map((e: any) => e.message).join(', ');
    }
    return 'An unexpected error occurred';
  },
};

export default {
  contact: contactApi,
  projects: projectsApi,
  services: servicesApi,
  testimonials: testimonialsApi,
  health: healthApi,
  utils: apiUtils,
}; 