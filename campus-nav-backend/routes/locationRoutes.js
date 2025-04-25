// const express = require('express');
// const router = express.Router();
// const { addLocation, getLocations } = require('../controllers/locationController'); // Ensure correct path

// // router.post('/add', addLocation); 
//  // Fix here: Ensure addLocation is correctly imported
// router.post('/add', locationController.addLocation);

// router.get('/all', getLocations);  // Ensure this function is also defined in the controller

// module.exports = router;


const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController'); // Ensure correct path

router.post('/add', locationController.addLocation);

module.exports = router;
