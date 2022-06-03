const { insertProfileImgToDb } = require('../services/promise-mysql');
const myQurey = require('../query/query');

exports.uploadProfileImgToDb = async (req, res) => { //여기서 res로 client에 multer 반환 객체(ex: s3 image url) 전달   
  try {
    console.log('req:', req);
    console.log('req.body:', req.body)
    console.log('req.file.location: ', req.file.location) //single : req.file, array : req.files 
    // await insertProfileImgToDb(myQurey.insertProfileImg, req.file.location)
    res.send(req.file.location) //client에게 s3 이미지 경로 반환
  } catch (error) {
    console.log('Enter error: ', error);    
  }
};

exports.uploadMultipleImg = async(req, res) =>{
  try {
    // console.log('req:', req);
    console.log('req.body:', req.body)
    console.log('req.file: ', req.file)
    console.log('req.files: ', req.files)
    console.log('req.file.location: ', req.file.location)
    console.log('req.files.location: ', req.files.location) 
  } catch (error) {
    
  }
}