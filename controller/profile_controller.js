const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.getMyProfile = async (req, res) => { //아직 nickname, profilemusic은 넘기지 않음
    try{ 
        console.log('Enter getMyProfile')
        const result = await promiseMysql.selectUserProfile(myQurey.selectUserProfile, req.query.key)
        console.log('result: ', result)
        res.json(result[0]);
        
    }catch(error){
        console.log('Failed getMyProfile: ', error)
    }
}

exports.editProfile = async (req, res) => {
    try{ 
        console.log('Enter editProfile')
        const data = req.body['params'] //1.nickname 2.profileImg 3.profileMusic 4~8.tag1~5_cd 9.UID
        await promiseMysql.editUserProfile(myQurey.editUserProfile, data)
        res.send('Success editProfile')
    }catch(error){
        console.log('Failed editProfile: ', error)
    }
}
