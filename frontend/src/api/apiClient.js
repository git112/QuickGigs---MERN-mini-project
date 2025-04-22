import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for gigs
export const gigApi = {
  // Get all gigs with optional query parameters
  getAll: (params = {}) => apiClient.get('/gigs', { params }),
  
  // Get a single gig by ID
  getById: (id) => apiClient.get(`/gigs/${id}`),
  
  // Create a new gig
  create: (gigData) => apiClient.post('/gigs', gigData),
  
  // Apply to a gig
  apply: (gigId, applicationData) => apiClient.post(`/gigs/${gigId}/apply`, applicationData),
  
  // Get gigs by category
  getByCategory: (category) => apiClient.get(`/gigs/category/${category}`),
  
  // Search gigs
  search: (query) => apiClient.get(`/gigs/search?query=${query}`),
};

export default apiClient;