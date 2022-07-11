const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

exports.getKakaoToken = async (req) => {
  console.log("Enter getKakaoToken");

  //oauth code로 accessToken 발급받기
  const token = await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      grant_type: "authorization_code", //특정 스트링
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      redirectUri: process.env.KAKAO_REDIRECT_URI,
      code: req.body.code, //받은 인가 코드
    }), //객체를 string 으로 변환node app
  })
    .then()
    .catch((error) => {
      console.log("getKakaoToken error: ", error);
    });

  //accessToken으로 kakaoUid 발급받기
  const userInfo = await axios({
    method: "get",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: `Bearer ${token.data.access_token}`, //req = token 객체 자체가 되어야 함
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    }, //헤더에 내용을 보고 보내주겠다.
  });
  return userInfo.data;
};
