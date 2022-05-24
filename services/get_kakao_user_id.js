const axios = require('axios');

exports.getKakaoUserId = async(tokenData) => {
    console.log('Enter getKakaoUserId')
    const userInfo = await axios({
        method:'get',
        url:'https://kapi.kakao.com/v2/user/me',
        headers:{
            Authorization: `Bearer ${tokenData.access_token}`,//req = token 객체 자체가 되어야 함
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },//헤더에 내용을 보고 보내주겠다.
    })
    return userInfo.data;
}