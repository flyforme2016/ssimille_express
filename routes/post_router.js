const express = require('express');
const router = express.Router();
const postController = require('../controller/post_controller')

router.get('/getPostList', postController.selectTotalPost);

router.get('/getLocationPostList', postController.selectLocationPost);

router.get('/getMyPost', postController.selectMyPost)

router.post('/uploadPost', postController.uploadPost);

router.post('/postLike', postController.postLike);

router.get('/getPostComments', postController.selectPostComments);

router.post('/inputPostComment', postController.insertPostComment);

router.get('/deletePost', postController.deletePost);

module.exports = router;