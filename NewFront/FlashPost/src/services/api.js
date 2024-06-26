import axios from 'axios';



const apiService = {
  api: axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  }),

  // Define your API methods
  fetchData: async function() {
    try {
      const response = await this.api.get('/data');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  // Add more API methods as needed

};

// Export the API service object
export default apiService;
