const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile_controller')

router.get('/getUserProfile', profileController.getMyProfile);

router.post('/editProfile', profileController.editProfile);

router.get('/getUserSongList', profileController.getFavoriteSongList);

router.post('/addFavoriteSong', profileController.addFavoriteSong);

router.get('/getPostLikedUserList', profileController.getPostLikedUserList);

router.post('/updateUserRegion', profileController.updateUserRegion);

router.delete('/removeFavoriteSong', profileController.removeFavoriteSong)

module.exports = router;