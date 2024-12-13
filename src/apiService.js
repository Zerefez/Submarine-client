class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL; // Base URL for the API
  }

  // Perform a GET request
  async getRequest(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error in GET request: ${error.message}`);
      throw error;
    }
  }
}

export default ApiService;
