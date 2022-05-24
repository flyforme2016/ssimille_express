const express = require('express');
const router = express.Router();
const locationController = require('../controller/location_controller');

router.post('/address', locationController.updateUserLocation);

module.exports = router;