const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.getMyProfile = async (req, res) => {
    try{ 
        console.log('Enter getMyProfile')
        const result = await promiseMysql.selectData(myQurey.selectUserProfile, req.query.key)
        console.log('result: ', result)
        res.json(result[0]);
        
    }catch(error){
        console.log('Failed getMyProfile: ', error)
    }
}

exports.editProfile = async (req, res) => {
    try{ 
        console.log('Enter editProfile')
        const data = req.body['params']
        await promiseMysql.updateData(myQurey.editUserProfile, data)
        res.send('Success editProfile')
    }catch(error){
        console.log('Failed editProfile: ', error)
    }
}
