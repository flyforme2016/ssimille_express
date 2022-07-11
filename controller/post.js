const promiseMysql = require("../services/promise-mysql");
const myQurey = require("../query/query");

exports.getTotalPosts = async (req, res) => {
  try {
    console.log("Enter selectTotalPost");
    const data = req.query.key;
    const result = await promiseMysql.selectData(myQurey.selectTotalPost, data);
    console.log("result: ", result);
    res.json(result);
  } catch (error) {
    console.log("Failed selectTotalPost: ", error);
  }
};

//key, locationDepth1 data값 쿼리 values 순서에 맞게 전달되는지 확인
exports.getRegionPosts = async (req, res) => {
  try {
    console.log("Enter selectLocationPost");
    console.log("req.query: ", req.query);
    const data = [req.query.key, req.query.regionDepth1];
    const result = await promiseMysql.selectData(
      myQurey.selectLocationPost,
      data
    );
    res.json(result);
  } catch (error) {
    console.log("Failed selectLocationPost: ", error);
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    console.log("Enter selectMyPost");
    console.log("req.query: ", req.query);
    const data = [req.query.key, req.query.key];
    const result = await promiseMysql.selectData(myQurey.selectMyPost, data);
    res.json(result);
  } catch (error) {
    console.log("Failed selectMyPost: ", error);
  }
};

exports.addPost = async (req, res) => {
  try {
    console.log("Enter uploadPost");
    console.log("req.body: ", req.body);
    const result = await promiseMysql.insertPost(
      myQurey.insertPost,
      myQurey.insertPostImgs,
      myQurey.increasePostCount,
      req.body
    );
    res.json(result);
  } catch (error) {
    console.log("Failed uploadPost: ", error);
  }
};

exports.removePost = async (req, res) => {
  try {
    console.log("Enter deletePost");
    console.log("req.body: ", req.body);
    console.log("req.query: ", req.query);
    const data = [req.body.postSeq, req.body.key];
    await promiseMysql.deletePost(
      myQurey.deletePost,
      myQurey.decreasePostCount,
      data
    );
    res.send("Delete Successful");
  } catch (error) {
    console.log("Failed deletePost: ", error);
  }
};

exports.getPostComments = async (req, res) => {
  try {
    console.log("req.query.postSeq: ", req.query.postSeq);
    console.log("Enter selectPostComments");
    const result = await promiseMysql.selectData(
      myQurey.selectPostComments,
      req.query.postSeq
    );
    res.json(result);
  } catch (error) {
    console.log("Failed selectPostComments: ", error);
  }
};

exports.addPostComment = async (req, res) => {
  try {
    console.log("Enter insertPostComment");
    console.log("req.body: ", req.body);
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
  } catch (error) {
    console.log("Failed insertPostComment: ", error);
  }
};
exports.removePostComment = async (req, res) => {
  try {
    console.log("Enter deletePostComment");
    console.log("req.body:", req.body);
    const data = [req.body.commentSeq];
    const result = await promiseMysql.deleteData(
      myQurey.deletePostComments,
      data
    );
    res.json(result);
  } catch (error) {
    console.log("Failed deletePostComment", error);
  }
};

exports.postLike = async (req, res) => {
  try {
    console.log("Enter PostLike");
    console.log("req.body: ", req.body);
    const data = [req.body.postSeq, req.body.key];
    if (req.body.check === true) {
      console.log("좋아요");
      const result = await promiseMysql.postLikeTransaction(
        myQurey.insertPostLikedUser,
        myQurey.increaseLikeCount,
        data
      );
      console.log("result: ", result);
      res.json(result);
    } else if (req.body.check === false) {
      console.log("좋아요 취소");
      const result = await promiseMysql.postLikeTransaction(
        myQurey.deletePostLikedUser,
        myQurey.decreaseLikeCount,
        data
      );
      console.log("result: ", result);
      res.json(result);
    }
  } catch (error) {
    console.log("Failed PostLike: ", error);
  }
};
