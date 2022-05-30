const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.updateCurrentMusic = async (res, req) =>{
    try {
        console.log('Enter updateCurrentMusic')
        const data = [
            req.body.musicUri,
            req.body.key
        ]
        const result = await promiseMysql.updateData(myQurey.updateCurrentMusic, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectTotalPost: ', error)
    }
}

exports.selectOtherUserCurrentMusic = async(req, res) => {
    try {
        console.log('Enter selectOtherUserCurrentMusic')
        const data = [
            req.query.locationDepth3,
            req.query.key
        ]
        const result = await promiseMysql.selectData(myQurey.selectOtherUserCurrentMusic, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectOtherUserCurrentMusic: ', error)
    }
}