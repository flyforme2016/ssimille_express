const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend_controller');

router.get('/getMyFollowingList', friendController.getMyFollowingList);

router.get('/getMyFollwerList', friendController.getMyFollowerList);

router.get('/checkIsFriend', friendController.checkIsFriend);

router.post('/addFriend', friendController.addFriend);

router.delete('/removeFriend', friendController.removeFriend)

module.exports = router;