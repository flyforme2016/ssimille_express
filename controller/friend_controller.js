const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.getFriendList = async (req, res) => {
    try{ 
        console.log('Enter getFriendList')
        const result = await promiseMysql.selectData(myQurey.selectFriendList, req.query.key)
        console.log('result: ', result)
        res.json(result);
        
    }catch(error){
        console.log('Failed getFriendList: ', error)
    }
}