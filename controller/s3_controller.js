const { insertProfileImgToDb } = require('../services/promise-mysql');
const myQurey = require('../query/query');

/*res.send vs res.json
[res.send(object)]      [res.json(object)]
1.res.send(object)      1.res.json(object)
2.res.json(object)      2.res.send(string)
3.res.send(string)
결론: 
object를 전달할 경우 res.json
string을 전달할 경우 res.send
*/
exports.uploadProfileImgToDb = async (req, res) => { //여기서 res로 client에 multer 반환 객체(ex: s3 image url) 전달   
  try {
    console.log('Enter uploadProfileImgToDb')
    console.log('req.file.location: ', req.file.location) //single : req.file, array : req.files 
    await insertProfileImgToDb(myQurey.insertProfileImg, req.file.location)
    res.send(req.file.location) //client에게 s3 이미지 경로 반환
  } catch (error) {
    console.log('Error uploadProfileImgToDb: ', error);    
  }
};

exports.uploadMultipleImg = async(req, res) =>{
  try {
    console.log('Enter uploadMultipleImg')
    console.log('req.files', req.files)
    console.log('req.files.loaction', req.files.location)
    res.json(req.files)
  } catch (error) {
    console.log('Error uploadMultipleImg')
  }
}