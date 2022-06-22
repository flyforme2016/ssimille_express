const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend_controller');

router.get('/getFriendList', friendController.selectFriendList);

router.get('/checkIsFriend', friendController.checkIsFriend);

module.exports = router;