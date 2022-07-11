const express = require("express");
const router = express.Router();
const kakaoController = require("../controller/kakao");

router.post("/oauth", kakaoController.getKakaoUId); //axios를 통해 인가코드 받는 라우터

router.get("/oauth/callback", function (req, res, next) {
  res.render("loading");
});

module.exports = router;
