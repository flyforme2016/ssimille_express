const express = require("express");
const router = express.Router();
const spotifyController = require("../controller/spotify");

router.post("/oauth", spotifyController.getAccessToken); //axios를 통해 인가코드 받는 라우터

router.get("/oauth/callback", function (req, res, next) {
  res.render("loading");
});

module.exports = router;
