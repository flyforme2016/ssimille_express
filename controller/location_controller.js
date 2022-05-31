const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.updateUserLocation = async (req, res) => {
    try {
        console.log('Enter updateUserLocation')
        const updateLocationObject = {
            location_depth1 : req.body.locationDepth1,
            location_depth2 : req.body.locationDepth2,
            location_depth3 : req.body.locationDepth3,
            eng_location_depth1 : req.body.engLocationDepth1,
            eng_location_depth2 : req.body.engLocationDepth2,
            eng_location_depth3 : req.body.engLocationDepth3,
        }
        await promiseMysql.updateData(myQurey.updateUserLocation, [updateLocationObject, req.body.key])
        res.send('Success updateUserLocation')
    } catch (error) {
        console.log('Failed updateUserLocation: ', error)
    }
}