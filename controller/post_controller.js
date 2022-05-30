const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.selectTotalPost = async (req, res) =>{
    try {
        console.log('Enter selectTotalPost')
        const data = req.query.key
        const result = await promiseMysql.selectData(myQurey.selectTotalPost, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectTotalPost: ', error)
    }
}

//key, locationDepth1 data값 쿼리 values 순서에 맞게 전달되는지 확인
exports.selectLocationPost = async (req, res) => {
    try {
        console.log('Enter selectLocationPost')
        const data = [
            req.query.key,
            req.query.locationDepth1
        ]
        const result = await promiseMysql.selectData(myQurey.selectLocationPost, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectLocationPost: ', error)
    }
}

exports.uploadPost = async (req, res) => {
    try {
        console.log('Enter uploadPost')
        const insertPostObject = {
            kakao_user_number : req.body.kakaoUserNumber,
            del_ny : 0,
            location_depth1 : req.body.locationDepth1,
            music_uri : req.body.musicUri,
            album_title : req.body.albumTitle,
            album_image : req.body.albumImage,
            album_artist_name : req.body.albumArtistName,
            input_text : req.body.inputText,
            like_count : 0,
            reg_time : Date.now()
        }
        const result = await promiseMysql.insertData(myQurey.insertPost, insertPostObject)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed uploadPost: ', error)
    }
}

exports.checkPostLike = async (req, res) => {
    try {
        console.log('Enter checkPostLike')
        const data = [
            req.body.postNum,
            req.body.key
        ]
        const result = await promiseMysql.insertData(myQurey.insertPostLikedUser, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed checkPostLike: ', error)
    }
}

exports.uncheckPostLike = async (req, res) => {
    try {
        console.log('Enter uncheckPostLike')
        const data = [
            req.body.postNum,
            req.body.key
        ]
        const result = await promiseMysql.deleteData(myQurey.deletePostLikedUser, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed uncheckPostLike: ', error)
    }
}
