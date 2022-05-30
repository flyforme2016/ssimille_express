const express = require('express');
const router = express.Router();
const postController = require('../controller/post_controller')

router.get('/getPostList', postController.selectTotalPost);

router.post('/uploadPost', postController.uploadPost);

router.post('/checkPostLike', postController.checkPostLike);

router.post('/uncheckPostLike', postController.uncheckPostLike);


module.exports = router;