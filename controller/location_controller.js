const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.updateUserLocation = async (req, res) => {
    try {
        console.log('Enter updateUserLocation')
        const data = [
            req.body['params']['locationDepth1'],
            req.body['params']['locationDepth2'],
            req.body['params']['locationDepth3'],
            req.body['params']['key'],
        ]
        await promiseMysql.updateData(myQurey.updateUserLocation, data)
        res.send('Success updateUserLocation')
    } catch (error) {
        console.log('Failed updateUserLocation: ', error)
    }
}