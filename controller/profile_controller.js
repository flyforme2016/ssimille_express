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
        const dataObject = {
            nickname : req.body.nickname,
            profile_image : req.body.profileImg,
            profile_music_uri : req.body.profileMusicUri,
            album_artist_name: req.body.albumArtistName,
            album_title: req.body.albumTitle,
            album_image: req.body.albumImage,
            tag1_cd : req.body.hashTag[0],
            tag2_cd : req.body.hashTag[1],
            tag3_cd : req.body.hashTag[2],
            tag4_cd : req.body.hashTag[3],
            tag5_cd : req.body.hashTag[4],
        }
        await promiseMysql.updateData(myQurey.updateUserProfile, [dataObject, req.body.key])
        res.send('Success editProfile')
    }catch(error){
        console.log('Failed editProfile: ', error)
    }
}

exports.getFavoriteSongList = async (req, res) => {
    try{ 
        console.log('Enter getUserSongList')
        const result = await promiseMysql.selectData(myQurey.selectFavoriteSongList, req.query.key)
        console.log('result: ', result)
        res.json(result)
    }catch(error){
        console.log('Failed getUserSongList: ', error)
    }
}

exports.addFavoriteSong = async (req, res) => {
    try{ 
        console.log('Enter addFavoriteSong')
        const addFavoriteSongObject = {
            music_uri : req.body.musicUri,
            album_artist_name : req.body.albumArtistName,
            album_title : req.body.albumTitle,
            album_image : req.body.albumImg,
            kakao_user_number : req.body.key,
        }
        await promiseMysql.insertData(myQurey.insertFavoriteSong, addFavoriteSongObject)
        
    }catch(error){
        console.log('Failed addFavoriteSong: ', error)
        res.send('이미 등록된 노래입니다.')
    }
}

exports.getPostLikedUserList = async (req, res) => {
    try{ 
        console.log('Enter getPostLikedUserList')
        
        const result = await promiseMysql.insertData(myQurey.selectPostLikedUserList, insertFavoriteSongObject)
        console.log('result: ', result)
        res.json(result)
    }catch(error){
        console.log('Failed getPostLikedUserList: ', error)
    }
}

exports.updateUserRegion = async (req, res) => {
    try{ 
        console.log('Enter updateUserRegion')
        console.log('regionCode: ', req.body.regionCode)
        console.log('typeof regionCode: ', typeof req.body.regionCode)
        const data = [
            req.body.regionCode,
            req.body.key,
        ]
        const result = await promiseMysql.updateData(myQurey.updateUserLocation, data)
        console.log('result: ', result)
        res.json(result)
    }catch(error){
        console.log('Failed updateUserRegion: ', error)
    }
}



