const Location = require('../models/Location');

// Add a new location
const addLocation = async (req, res) => {
    try {
        const { name, latitude, longitude, description } = req.body;
        const newLocation = new Location({ name, latitude, longitude, description });
        await newLocation.save();
        res.status(201).json({ message: "Location added successfully", location: newLocation });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all locations
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addLocation, getLocations }; // Ensure functions are exported
