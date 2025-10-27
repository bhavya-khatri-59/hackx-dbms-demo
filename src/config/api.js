// API Configuration
const API_CONFIG = {
  // Base URL for API calls
  baseURL: import.meta.env.VITE_API_URL || '/api',
  
  // Full API URL (for absolute URLs when needed)
  fullURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}` 
    : window.location.origin + '/api'
};

// Helper function to create API URLs
export const createApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (import.meta.env.VITE_API_URL) {
    // Production: use the full backend URL
    return `${import.meta.env.VITE_API_URL}/${cleanEndpoint}`;
  } else {
    // Development: use relative path (handled by Vite proxy)
    return `/${cleanEndpoint}`;
  }
};

// Helper function for fetch with proper URL
export const apiFetch = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);
  console.log('Making API call to:', url); // For debugging
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    // Do not throw for non-2xx responses, let caller handle status
    return response;
  } catch (err) {
    // Only throw for network errors
    throw new Error(`Network error: ${err.message}`);
  }
};

export default API_CONFIG;