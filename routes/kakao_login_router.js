const express = require('express');
const router = express.Router();
const kakaoController = require('../controller/kakao_controller');

router.post('/callback',kakaoController.returnKakaoUserId); //axios를 통해 인가코드 받는 라우터


router.get('/callback', function(req, res, next) {
    res.render('loading');
  });


module.exports = router;