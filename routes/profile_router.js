const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile_controller')

router.get('/getMyProfile', profileController.getMyProfile);

router.post('/editProfile', profileController.editProfile);

router.post('/updateProfileImg', profileController.updateProfileImg);

module.exports = router;