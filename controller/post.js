const promiseMysql = require("../services/promise-mysql");
const myQurey = require("../query/query");

exports.getTotalPosts = async (req, res) => {
  try {
    const data = req.query.key;
    const result = await promiseMysql.selectData(myQurey.selectTotalPost, data);
    res.json(result);
  } catch (error) {}
};

//key, locationDepth1 data값 쿼리 values 순서에 맞게 전달되는지 확인
exports.getRegionPosts = async (req, res) => {
  try {
    const data = [req.query.key, req.query.regionDepth1];
    const result = await promiseMysql.selectData(
      myQurey.selectLocationPost,
      data
    );
    res.json(result);
  } catch (error) {}
};

exports.getMyPosts = async (req, res) => {
  try {
    const data = [req.query.key, req.query.key];
    const result = await promiseMysql.selectData(myQurey.selectMyPost, data);
    res.json(result);
  } catch (error) {}
};

exports.addPost = async (req, res) => {
  try {
    const result = await promiseMysql.insertPost(
      myQurey.insertPost,
      myQurey.insertPostImgs,
      myQurey.increasePostCount,
      req.body
    );
    res.json(result);
  } catch (error) {}
};

exports.removePost = async (req, res) => {
  try {
    req.body.postSeq.map(async (value) => {
      const data = [value, req.body.key];
      await promiseMysql.deletePost(
        myQurey.deletePost,
        myQurey.decreasePostCount,
        data
      );
    });
    res.send("Delete Successful");
  } catch (error) {}
};

exports.getPostComments = async (req, res) => {
  try {
    const result = await promiseMysql.selectData(
      myQurey.selectPostComments,
      req.query.postSeq
    );
    res.json(result);
  } catch (error) {}
};

exports.addPostComment = async (req, res) => {
  try {
    const dateTime = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");
    const insertPostCommentObject = {
      post_seq: req.body.postSeq,
      kakao_user_number: req.body.key,
      comment: req.body.comment,
      reg_time: dateTime,
    };
    const result = await promiseMysql.insertData(
      myQurey.insertPostComments,
      insertPostCommentObject
    );
    res.json(result);
  } catch (error) {}
};
exports.removePostComment = async (req, res) => {
  try {
    const data = [req.body.commentSeq];
    const result = await promiseMysql.deleteData(
      myQurey.deletePostComments,
      data
    );
    res.json(result);
  } catch (error) {}
};

exports.postLike = async (req, res) => {
  try {
    const data = [req.body.postSeq, req.body.key];
    if (req.body.check === true) {
      const result = await promiseMysql.postLikeTransaction(
        myQurey.insertPostLikedUser,
        myQurey.increaseLikeCount,
        data
      );
      res.json(result);
    } else if (req.body.check === false) {
      const result = await promiseMysql.postLikeTransaction(
        myQurey.deletePostLikedUser,
        myQurey.decreaseLikeCount,
        data
      );
      res.json(result);
    }
  } catch (error) {}
};
