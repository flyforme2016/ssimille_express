const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

exports.getKakaoToken = async(req)=>{
    console.log('Enter getKakaoToken')
    const token = await axios({//token
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            grant_type : 'authorization_code',//특정 스트링
            client_id : process.env.KAKAO_CLIENT_ID,
            client_secret : process.env.KAKAO_CLIENT_SECRET,
            redirectUri : process.env.KAKAO_REDIRECT_URI,
            code : req.body['params']['code'], //받은 인가 코드
        })//객체를 string 으로 변환
    })
    console.log('token.data in getKakaoToken(): ', token.data);
    return token.data
}