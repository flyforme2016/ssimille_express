const { kakaoApi } = require("../services/kakaoApi");
const promiseMysql = require("../services/promise-mysql");
const myQurey = require("../query/query");

exports.getKakaoUId = async (req, res) => {
  try {
    //access token을 req로 받음
    const userInfo = await kakaoApi(req); //tokenData console.log 출력결과 정상적으로 token.data 객체 받음
    await promiseMysql.initTable(
      myQurey.initUserTable,
      myQurey.initUserHashTagTable,
      myQurey.initGenreMatrix,
      userInfo.id,
      userInfo.properties.nickname
    );
    res.json({ userId: userInfo.id });
  } catch (error) {
    res.json({ userId: 0 });
  }
};
