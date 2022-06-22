var express = require('express');
var router = express.Router();
const s3Controller = require('../controller/s3_controller');
const {upload} = require('../services/multer');

//upload.single()의 매개변수(=fieldname(=key))가 곧 S3에 업로드 될 폴더 이름이 됨 
router.post('/uploadProfileImg', upload.single('profileImg'), s3Controller.uploadProfileImgToS3);

router.post('/uploadMultipleImg', upload.array('multipleImg'), s3Controller.uploadMultipleImgToS3);

module.exports = router;