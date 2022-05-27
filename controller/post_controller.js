const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.selectTotalPost = async (req, res) =>{
    try {
        console.log('Enter selectTotalPost')
        const data = req.body['params']['key']
        const result = await promiseMysql.selectData(myQurey.selectTotalPost, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectTotalPost: ', error)
    }
}