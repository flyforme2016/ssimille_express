const express = require("express");
const router = express.Router();
const postController = require("../controller/post");

router.get("/total-posts", postController.getTotalPosts);

router.get("/region-posts", postController.getRegionPosts);

router.get("/my-posts", postController.getMyPosts);

router.post("", postController.addPost);

router.delete("", postController.removePost);

router.post("/like", postController.postLike);

router.get("/post-comments", postController.getPostComments);

router.post("/post-comments", postController.addPostComment);

router.delete("/post-comments", postController.removePostComment);

module.exports = router;
