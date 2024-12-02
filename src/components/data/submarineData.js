class SubmarineData {
    constructor(id, name, isAvailable, length, width, weight) {
        this.id = id;
        this.name = name;
        this.isAvailable = isAvailable;
        this.length = length;
        this.width = width;
        this.weight = weight;
    }

    // Method to display submarine details
    displayDetails() {
        return `Submarine Details:
        ID: ${this.id}
        Name: ${this.name}
        Available: ${this.isAvailable ? "Yes" : "No"}
        Length: ${this.length} meters
        Width: ${this.width} meters
        Weight: ${this.weight} tons`;
    }
}

export default SubmarineData;

const submarine = new SubmarineData("001", "Nautilus", true, 100.5, 20.3, 2000.0);
console.log(submarine.displayDetails());
