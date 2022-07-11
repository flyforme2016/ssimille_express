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

exports.getGenreMatrix = async (req, res) => {
    try{ 
        console.log('Enter getGenreMatrix')
        const result = await promiseMysql.selectData(myQurey.selectGenreMatrix, req.query.key)
        console.log('result: ', result)
        res.json(result[0]);
        
    }catch(error){
        console.log('Failed getGenreMatrix: ', error)
    }
}

exports.editProfile = async (req, res) => {
    try{ 
        console.log('Enter editProfile')
        const dataObject = {
            nickname : req.body.nickname,
            profile_image : req.body.profileImg,
            profile_music_uri : req.body.profileMusicUri,
            artist_uri : req.body.artistUri,
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
        const result = await promiseMysql.selectData(myQurey.selectUserProfile, req.body.key)
        res.json(result[0]);
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
        console.log('req.body: ', req.body)
        const addFavoriteSongObject = {
            music_uri : req.body.musicUri,
            artist_uri : req.body.artistUri,
            album_artist_name : req.body.albumArtistName,
            album_title : req.body.albumTitle,
            album_image : req.body.albumImg,
            kakao_user_number : req.body.key,
        }
        const data = [
            addFavoriteSongObject,
            req.body.key,
        ]
        await promiseMysql.updateFavoriteSong(myQurey.insertFavoriteSong, myQurey.increaseSongCount, data)
        
    }catch(error){
        console.log('Failed addFavoriteSong: ', error)
        res.send('error')
    }
}

exports.removeFavoriteSong = async (req, res) => {
    try{ 
        console.log('Enter removeFavoriteSong')
        console.log('req.body: ', req.body)
        const data = [
            req.body.favoriteSongSeq,
            req.body.key,
        ]
        await promiseMysql.updateFavoriteSong(myQurey.deleteFavoriteSong, myQurey.decreaseSongCount, data)
        
    }catch(error){
        console.log('Failed removeFavoriteSong: ', error)
    }
}

exports.updateGenreMatrix = async (req, res) => {
    try{ 
        console.log('Enter updateGenreMatrix')
        console.log('req.body: ', req.body)
        const data = [
            req.body.genreMatrixObj,
            req.body.key,
        ]
        await promiseMysql.updateData(myQurey.updateGenreMatrix, data)
        
    }catch(error){
        console.log('Failed updateGenreMatrix: ', error)
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



