class MeasurementData {
    constructor(temp, oxygen, pressure, springLayers, timestamp = new Date()) {
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

    // Verify if the environmental data and spring layer count are valid
    verifyData() {
        return (
            // Check environmental data ranges
            this.temperature >= -50 && this.temperature <= 100 && // Temp range
            this.oxygen >= 0 && this.oxygen <= 100 &&              // Oxygen range
            this.pressure >= 0 && this.pressure <= 2000 &&         // Pressure range
            // Check spring layer validity
            Number.isInteger(this.springLayers) && this.springLayers > 0
        );
    }
}

export default MeasurementData;