const Amenity = require("../models/AmenityModel");
const factory = require("./factoryController");

// Create a new amenity
exports.createAmenity = factory.createDoc(Amenity);

// Get all amenities
exports.getAllAmenities = factory.getAllDocs(Amenity);

// Get single amenity
exports.getAmenity = factory.getDoc(Amenity);

// Update amenity
exports.updateAmenity = factory.updateDoc(Amenity);

// Delete amenity
exports.deleteAmenity = factory.deleteDoc(Amenity);
