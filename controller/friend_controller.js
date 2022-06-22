const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.selectFriendList = async (req, res) =>{
    try {
        console.log('Enter selectFriendList')
        const data = req.query.key
        const result = await promiseMysql.selectData(myQurey.selectFriendList, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed selectFriendList: ', error)
    }
}

exports.checkIsFriend = async (req, res) => {
    try {
        console.log('Enter isFriend')
        console.log('req.query: ', req.query)
        const data = [
            req.query.myUid,
            req.query.otherUid,
        ]
        const result = await promiseMysql.selectData(myQurey.isFriend, data)
        console.log('result: ', result[0])
        res.json(result[0]);
    } catch (error) {
        console.log('Failed isFriend: ', error)
    }
}