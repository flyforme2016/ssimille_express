const promiseMysql = require("../services/promise-mysql");
const myQurey = require("../query/query");

exports.getMyProfile = async (req, res) => {
  try {
    const result = await promiseMysql.selectData(
      myQurey.selectUserProfile,
      req.query.key
    );
    res.json(result[0]);
  } catch (error) {}
};

exports.getGenreMatrix = async (req, res) => {
  try {
    const result = await promiseMysql.selectData(
      myQurey.selectGenreMatrix,
      req.query.key
    );
    res.json(result[0]);
  } catch (error) {}
};

exports.editProfile = async (req, res) => {
  try {
    const dataObject = {
      nickname: req.body.nickname,
      profile_image: req.body.profileImg,
      profile_music_uri: req.body.profileMusicUri,
      artist_uri: req.body.artistUri,
      album_artist_name: req.body.albumArtistName,
      album_title: req.body.albumTitle,
      album_image: req.body.albumImage,
      tag1_cd: req.body.hashTag[0],
      tag2_cd: req.body.hashTag[1],
      tag3_cd: req.body.hashTag[2],
      tag4_cd: req.body.hashTag[3],
      tag5_cd: req.body.hashTag[4],
    };
    await promiseMysql.updateData(myQurey.updateUserProfile, [
      dataObject,
      req.body.key,
    ]);
    const result = await promiseMysql.selectData(
      myQurey.selectUserProfile,
      req.body.key
    );
    res.json(result[0]);
  } catch (error) {}
};

exports.getFavoriteSongList = async (req, res) => {
  try {
    const result = await promiseMysql.selectData(
      myQurey.selectFavoriteSongList,
      req.query.key
    );
    res.json(result);
  } catch (error) {}
};

exports.addFavoriteSong = async (req, res) => {
  try {
    const addFavoriteSongObject = {
      music_uri: req.body.musicUri,
      artist_uri: req.body.artistUri,
      album_artist_name: req.body.albumArtistName,
      album_title: req.body.albumTitle,
      album_image: req.body.albumImg,
      kakao_user_number: req.body.key,
    };
    const data = [addFavoriteSongObject, req.body.key];
    await promiseMysql.updateFavoriteSong(
      myQurey.insertFavoriteSong,
      myQurey.increaseSongCount,
      data
    );
  } catch (error) {
    res.send("error");
  }
};

exports.removeFavoriteSong = async (req, res) => {
  try {
    const data = [req.body.favoriteSongSeq, req.body.key];
    await promiseMysql.updateFavoriteSong(
      myQurey.deleteFavoriteSong,
      myQurey.decreaseSongCount,
      data
    );
  } catch (error) {}
};

exports.updateGenreMatrix = async (req, res) => {
  try {
    const data = [req.body.genreMatrixObj, req.body.key];
    await promiseMysql.updateData(myQurey.updateGenreMatrix, data);
  } catch (error) {}
};

exports.getPostLikedUserList = async (req, res) => {
  try {
    const result = await promiseMysql.insertData(
      myQurey.selectPostLikedUserList,
      insertFavoriteSongObject
    );
    res.json(result);
  } catch (error) {}
};

exports.updateUserRegion = async (req, res) => {
  try {
    const data = [req.body.regionCode, req.body.key];
    const result = await promiseMysql.updateData(
      myQurey.updateUserLocation,
      data
    );
    res.json(result);
  } catch (error) {}
};
