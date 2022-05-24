const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.updateUserLocation = async (req, res) => {
    try {
        console.log('Enter updateUserLocation')
        const data = [
            req.body['params']['location_depth1'],
            req.body['params']['location_depth2'],
            req.body['params']['location_depth3'],
            req.body['params']['key'],
        ]
        await promiseMysql.updateUserLocation(myQurey.updateUserLocation, data)
        res.send('Success updateUserLocation')
    } catch (error) {
        console.log('Failed updateUserLocation: ', error)
    }
}