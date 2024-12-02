import MeasurementData from "./components/data/measurementData.js";
import SubmarineData from "./components/data/submarineData.js";

async function fetchData() {
  try {
    const response = await fetch('http://192.168.0.1:8080/api/submarines');
    console.log('Test from fetchData');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export { fetchData };

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL; // Base URL for the API
    this.environmentData = []; // Store environmental measurements
    this.springLayerData = []; // Store spring layer counts
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

  // Perform a POST request
  async postRequest(endpoint, body = {}) {
    try {
      const response = await fetch(`${this.baseURL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`POST request failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error in POST request: ${error.message}`);
      throw error;
    }
  }

  // Fetch submarine data
  async getSubmarines() {
    const rawData = await this.getRequest("submarines");
    return rawData.map(
      (data) =>
        new SubmarineData(
          data.id,
          data.name,
          data.isAvailable,
          data.length,
          data.width,
          data.weight
        )
    );
  }
  
  // Convert raw environmental data to MeasurementData array
  async getEnvironmentalMeasurements() {
    const rawData = await this.getRequest("measurements/environment");
    this.environmentData = rawData.map(
      (data) =>
        new MeasurementData(
          data.temperature,
          data.oxygen,
          data.pressure,
          0, // No spring layers here, set to 0
          new Date(data.timestamp)
        )
    );
    return this.environmentData;
  }

  // Fetch the number of water layers and store it
  async getSpringLayerCount() {
    const rawData = await this.getRequest("measurements/spring-layers");
    if (typeof rawData.layers === "number" && rawData.layers > 0) {
      this.springLayerData = [rawData.layers]; // Store the count in an array
      // Update spring layers in environmental measurements
      this.environmentData.forEach((measurement) => {
        measurement.springLayers = rawData.layers;
      });
      return this.springLayerData;
    }
    throw new Error("Invalid spring layer data format");
  }

  // Get environmental data
  getEnvironmentalData() {
    return this.environmentData;
  }

  // Get spring layer data
  getSpringLayerData() {
    return this.springLayerData;
  }

  // Fetch analysis data
  async getAnalysis() {
    return await this.getRequest("analysis");
  }

  // Send a specific submarine selection
  async sendSubSelection(id) {
    await this.postRequest("submarines/select", { id });
  }

  // Start the analysis process
  async sendStartAnalysis() {
    await this.postRequest("analysis/start");
  }
}

export default ApiService;

// Example usage
(async () => {
  const apiService = new ApiService("http://192.168.0.1:8080/api");

  try {
    // Fetch environmental measurements
    const environmentalMeasurements =
      await apiService.getEnvironmentalMeasurements();
    console.log("Environmental Measurements:");
    environmentalMeasurements.forEach((measurement) => {
      console.log(`
              Temperature: ${measurement.getTemperature()} °C
              Oxygen Level: ${measurement.getOxygen()}%
              Pressure: ${measurement.getPressure()} hPa
              Spring Layers: ${measurement.getSpringLayers()}
              Timestamp: ${measurement.timestamp}
              Data Verified: ${measurement.verifyData()}
          `);
    });

    // Fetch spring layer count
    const springLayerCount = await apiService.getSpringLayerCount();
    console.log(`Spring Layer Data (Number of Layers): ${springLayerCount[0]}`);

    // Get all environmental data
    const allEnvironmentalData = apiService.getEnvironmentalData();
    console.log("All Environmental Data:", allEnvironmentalData);

    // Get all spring layer data
    const allSpringLayerData = apiService.getSpringLayerData();
    console.log("All Spring Layer Data:", allSpringLayerData);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
