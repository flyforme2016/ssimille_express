const promiseMysql = require("../services/promise-mysql");
const myQurey = require("../query/query");

exports.getMyFollowingList = async (req, res) => {
  try {
    const data = req.query.key;
    const result = await promiseMysql.selectData(
      myQurey.selectMyFollowingList,
      data
    );
    res.json(result);
  } catch (error) {}
};

exports.getMyFollowerList = async (req, res) => {
  try {
    const data = req.query.key;
    const result = await promiseMysql.selectData(
      myQurey.selectMyFollowerList,
      data
    );
    res.json(result);
  } catch (error) {}
};

exports.addFriend = async (req, res) => {
  try {
    const data = [req.body.myUid, req.body.otherUid];
    await promiseMysql.updateFriend(
      myQurey.insertFriend,
      myQurey.increaseFriendCount,
      data
    );
    res.send("Success add friend");
  } catch (error) {
    res.json(error);
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const data = [req.query.myUid, req.query.otherUid];
    await promiseMysql.updateFriend(
      myQurey.deleteFriend,
      myQurey.decreaseFriendCount,
      data
    );
    res.send("Success remove  friend");
  } catch (error) {
    res.json(error);
  }
};

exports.checkIsFriend = async (req, res) => {
  try {
    const data = [req.query.myUid, req.query.otherUid];
    const result = await promiseMysql.selectData(myQurey.isFriend, data);
    res.json(result[0]);
  } catch (error) {}
};
