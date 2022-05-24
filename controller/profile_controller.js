const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.getMyProfile = async (req, res) => { //아직 nickname, profilemusic은 넘기지 않음
    try{ 
        console.log('Enter getMyProfile')
        const result = await promiseMysql.selectUserProfile(myQurey.selectUserProfile, req.query.key)
        console.log('result: ', result)
        res.json(result);
        
    }catch(error){
        console.log('Failed getMyProfile: ', error)
    }
}

exports.editProfile = async (req, res) => {
    try{ 
        console.log('Enter editProfile')
        console.log('userId: ', req.body['params']['key'])
        const data=[req.body['params']['nickname']]
        req.body['params']['profileImg'] ? data.push( req.body['params']['profileImg']) : null
        req.body['params']['profileMusic'] ? data.push( req.body['params']['profileMusic']) : null
        data.push(req.body['params']['key'])
        let hashTag ;
        if(!req.body['params']['hashTag']) {
            hashTag = req.body['params']['hashTag']
            hashTag.push(req.body['params']['key'])
        } //null이 아니면
        else{hashTag = [null, null, null, null, null, req.body['params']['key']]}
        await promiseMysql.editUserProfile(myQurey.editUserProfile, myQurey.updateHashTag, data, hashTag)

    }catch(error){
        console.log('Failed editProfile: ', error)
    }
}