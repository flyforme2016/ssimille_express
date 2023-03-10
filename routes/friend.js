const express = require("express");
const router = express.Router();
const friendController = require("../controller/friend");

router.get("/my-followings", friendController.getMyFollowingList);

router.get("/my-follwers", friendController.getMyFollowerList);

router.get("/flag", friendController.checkIsFriend);

router.post("", friendController.addFriend);

router.delete("", friendController.removeFriend);

module.exports = router;
