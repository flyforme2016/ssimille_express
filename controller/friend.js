const promiseMysql = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.getMyFollowingList = async (req, res) =>{
    try {
        console.log('Enter getMyFollowingList')
        const data = req.query.key
        const result = await promiseMysql.selectData(myQurey.selectMyFollowingList, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed getMyFollowingList: ', error)
    }
}

exports.getMyFollowerList = async (req, res) =>{
    try {
        console.log('Enter getMyFollowerList')
        const data = req.query.key
        const result = await promiseMysql.selectData(myQurey.selectMyFollowerList, data)
        console.log('result: ', result)
        res.json(result);
    } catch (error) {
        console.log('Failed getMyFollowerList: ', error)
    }
}

exports.addFriend = async (req, res) => {
    try {
        console.log('Enter addFriend')
        const data = [
            req.body.myUid,
            req.body.otherUid
        ]
        await promiseMysql.updateFriend(myQurey.insertFriend, myQurey.increaseFriendCount, data)
        res.send('Success add friend')
    } catch (error) {
        console.log('Failed addFriend: ', error)
        res.json(error);
    }
}

exports.removeFriend = async (req, res) => {
    try {
        console.log('Enter removeFriend')
        console.log('req.query: ', req.query)
        const data = [
            req.query.myUid,
            req.query.otherUid
        ]
        await promiseMysql.updateFriend(myQurey.deleteFriend, myQurey.decreaseFriendCount, data)
        res.send('Success remove  friend')
    } catch (error) {
        console.log('Failed removeFriend: ', error)
        res.json(error);
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