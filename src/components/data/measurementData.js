class MeasurementData {
    constructor(temp, oxygen, pressure = null, springLayers = null, timestamp = new Date()) {
        this.temperature = temp;
        this.oxygen = oxygen;
        this.pressure = pressure;
        this.springLayers = springLayers;
        this.timestamp = timestamp;
    }

    // Get temperature
    getTemperature() {
        return this.temperature;
    }

    // Get oxygen level
    getOxygen() {
        return this.oxygen;
    }

    // Get pressure
    getPressure() {
        return this.pressure;
    }

    // Get spring layers
    getSpringLayers() {
        return this.springLayers;
    }

    // Verify if the environmental data is valid
    verifyData() {
        return (
            // Check environmental data ranges
            this.temperature >= -50 && this.temperature <= 100 && // Temp range
            this.oxygen >= 0 && this.oxygen <= 10000 // Oxygen range
        );
    }
}

export default MeasurementData;
