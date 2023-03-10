const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend_controller');

router.get('/getFriendList', friendController.getFriendList)

module.exports = router;