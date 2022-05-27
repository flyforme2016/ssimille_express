const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.updateCurrentMusic = async (res, req) =>{
    try {
        console.log('Enter updateCurrentMusic')
        const data = [
            req.body['params']['musicUri'],
            req.body['params']['key']
        ]
        const result = await promiseMysql.updateData(myQurey.updateCurrentMusic, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectTotalPost: ', error)
    }
}

exports.selectOtherUserCurrentMusic = async(res) => {
    try {
        console.log('Enter selectOtherUserCurrentMusic')
        const data = [
            req.body['params']['locationDepth3'],
            req.body['params']['key']
        ]
        const result = await promiseMysql.selectData(myQurey.selectOtherUserCurrentMusic, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectOtherUserCurrentMusic: ', error)
    }
}