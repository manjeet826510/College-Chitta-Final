// In a separate file, e.g., api.js or axiosConfig.js
import axios from 'axios';

// Set the default base URL for Axios requests
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000/';

export default axios;
