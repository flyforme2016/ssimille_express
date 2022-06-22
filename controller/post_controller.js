const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.selectTotalPost = async (req, res) =>{
    try {
        console.log('Enter selectTotalPost')
        const data = req.query.key
        const result = await promiseMysql.selectData(myQurey.selectTotalPost, data)
        res.json(result);
    } catch (error) {
        console.log('Failed selectTotalPost: ', error)
    }
}

//key, locationDepth1 data값 쿼리 values 순서에 맞게 전달되는지 확인
exports.selectLocationPost = async (req, res) => {
    try {
        console.log('Enter selectLocationPost')
        console.log('req.query: ', req.query)
        const data = [
            req.query.key,
            req.query.regionDepth1
        ]
        const result = await promiseMysql.selectData(myQurey.selectLocationPost, data)
        res.json(result);
    } catch (error) {
        console.log('Failed selectLocationPost: ', error)
    }
}

exports.selectMyPost = async (req, res) => {
    try {
        console.log('Enter selectMyPost')
        console.log('req.query: ', req.query)
        const data = [
            req.query.key,
            req.query.key,
        ]
        const result = await promiseMysql.selectData(myQurey.selectMyPost, data)
        res.json(result);
    } catch (error) {
        console.log('Failed selectMyPost: ', error)
    }
}

exports.uploadPost = async (req, res) => {
    try {
        console.log('Enter uploadPost')
        console.log('req.body: ', req.body)
        const result = await promiseMysql.uploadPost(myQurey.insertPost, myQurey.insertPostImgs, req.body)
        res.json(result);
    } catch (error) {
        console.log('Failed uploadPost: ', error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        console.log('Enter deletePost')
        await promiseMysql.deleteData(myQurey.deletePost, req.query.postSeq)
        res.send("Delete Successful");
    } catch (error) {
        console.log('Failed deletePost: ', error)
    }
}

exports.selectPostComments = async (req, res) => {
    try {
        console.log('req.query.postSeq: ', req.query.postSeq);
        console.log('Enter selectPostComments')
        const result = await promiseMysql.selectData(myQurey.selectPostComments, req.query.postSeq)
        res.json(result);
    } catch (error) {
        console.log('Failed selectPostComments: ', error)
    }
}

exports.insertPostComment = async (req, res) => {
    try {
        console.log('Enter insertPostComment')
        console.log('req.body: ', req.body);
        const dateTime = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
        const insertPostCommentObject = {
            post_seq : req.body.postSeq,
            kakao_user_number : req.body.key,
            del_ny : 0,
            parent : req.body.parent,
            comment : req.body.comment,
            reg_time : dateTime
        }
        const result = await promiseMysql.insertData(myQurey.insertPostComments, insertPostCommentObject)
        res.json(result);
    } catch (error) {
        console.log('Failed insertPostComment: ', error)
    }
}

exports.postLike = async (req, res) => {
    try {
        console.log('Enter PostLike')
        console.log('req.body: ', req.body)
        const data = [
            req.body.postSeq,
            req.body.key,
        ]
        if(req.body.check === true) {
            console.log('좋아요')
            const result = await promiseMysql.postLikeTransaction(myQurey.insertPostLikedUser, myQurey.increaseLikeCount, data)
            console.log('result: ', result)
            res.json(result);
        }
        else if (req.body.check === false){
            console.log('좋아요 취소')
            const result = await promiseMysql.postLikeTransaction(myQurey.deletePostLikedUser, myQurey.decreaseLikeCount, data)
            console.log('result: ', result)
            res.json(result);
        }
    } catch (error) {
        console.log('Failed PostLike: ', error)
    }
}
