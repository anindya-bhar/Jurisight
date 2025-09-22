// // src/api/jurisight.js
// // Fixed API service for JuriSight frontend

// import axios from 'axios';

// // API Base URL
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
//   headers: { 'Content-Type': 'application/json' }
// });

// // Request interceptor
// api.interceptors.request.use(
//   config => {
//     console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('❌ API Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// // Exported service
// const jurisightService = {
//   // Expose generic axios methods for flexibility
//   get: api.get.bind(api),
//   post: api.post.bind(api),

//   // Health check
//   healthCheck: async () => {
//     const res = await api.get('/health');
//     return res.data;
//   },

//   // Process legal document
//   processDocument: async ({ text, task = 'analyze', language = 'english' }) => {
//     const res = await api.post('/api/process', { text, task, language });
//     return res.data;
//   },

//   // Upload file
//   uploadFile: async formData => {
//     const res = await api.post('/api/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return res.data;
//   },

//   // Chat
//   chatWithAI: async message => {
//     const res = await api.post('/api/chat', { message });
//     return res.data;
//   },

//   // Legacy endpoint
//   getMessage: async data => {
//     const res = await api.post('/get-message', data);
//     return res.data;
//   },

//   // Demo
//   getDemoData: async () => {
//     const res = await api.get('/api/demo');
//     return res.data;
//   }
// };

// export default jurisightService;
// export { jurisightService };


import axios from 'axios';

// Define the base URL of your backend API
const API_BASE_URL = 'http://localhost:8000';

// Create a configured instance of axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Define your API service methods
export const jurisightService = {
  // Method for processing text
  processDocument: (data) => {
    return api.post('/api/process', data);
  },

  // Method for uploading a file (uses a different header)
  uploadFile: (formData) => {
    return api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // You can add other API methods here as needed
  chat: (data) => {
    return api.post('/api/chat', data);
  }
};