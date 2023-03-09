const myQurey = require("../query/query");

exports.addProfileImgToS3 = async (req, res, error) => {
  //여기서 res로 client에 multer 반환 객체(ex: s3 image url) 전달
  try {
    res.json({ imgUrl: req.file.transforms[0].location }); //client에게 s3 이미지 경로 반환
  } catch (error) {}
};

exports.addMultipleImgToS3 = async (req, res) => {
  try {
    res.json(req.files);
  } catch (error) {}
};
