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
        const editProfileObject = {
            nickname : req.body.nickname,
            profile_image : req.body.profileImg,
            profile_music_uri : req.body.profileMusicUri,
            tag1_cd : req.body.hashTag[0],
            tag2_cd : req.body.hashTag[1],
            tag3_cd : req.body.hashTag[2],
            tag4_cd : req.body.hashTag[3],
            tag5_cd : req.body.hashTag[4],
        }
        await promiseMysql.updateData(myQurey.updateUserProfile, [editProfileObject, req.body.key])
        res.send('Success editProfile')
    }catch(error){
        console.log('Failed editProfile: ', error)
    }
}
