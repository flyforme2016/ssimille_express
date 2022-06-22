const {getKakaoUserId} = require('../services/get_kakao_user_id');
const {getKakaoToken} = require('../services/get_kakao_token');
const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.returnKakaoUserId = async (req, res) => {
    try{ //access token을 req로 받음
        console.log('Enter return KakaoUserId')
        console.log('req.body: ', req.body)
        const tokenData = await getKakaoToken(req); //tokenData console.log 출력결과 정상적으로 token.data 객체 받음
        const userInfo = await getKakaoUserId(tokenData) //getKakaoUserId에서 매개변수 tokenData.access_token을 지정하여 토근 정보 tokenInfo 객체 받기
        await promiseMysql.initTable(myQurey.initUserTable, myQurey.initUserHashTagTable, userInfo.id, userInfo.properties.nickname)
        console.log('login Success: ', userInfo.id)
        res.json({userId: userInfo.id});
        
    }catch(error){
        console.log('Controller Error')
        res.json({userId: 0})
    }
}