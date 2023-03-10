const myQurey = require("../query/query");

exports.addProfileImgToS3 = async (req, res, error) => {
  //여기서 res로 client에 multer 반환 객체(ex: s3 image url) 전달
  try {
    console.log("req.file.location: ", req.file.transforms[0].location); //single : req.file, array : req.files
    res.json({ imgUrl: req.file.transforms[0].location }); //client에게 s3 이미지 경로 반환
  } catch (error) {
    console.log("uploadProfileImgToS3 error: ", error);
  }
};

exports.addMultipleImgToS3 = async (req, res) => {
  try {
    // console.log('req:', req);
    console.log("req.files: ", req.files);
    res.json(req.files);
  } catch (error) {
    console.log("uploadMultipleImgToS3 error: ", error);
  }
};
