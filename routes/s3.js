var express = require("express");
var router = express.Router();
const s3Controller = require("../controller/s3");
const { upload } = require("../services/multer");

//upload.single()의 매개변수(=fieldname(=key))가 곧 S3에 업로드 될 폴더 이름이 됨
router.put(
  "/profile-image",
  upload.single("profileImg"),
  s3Controller.addProfileImgToS3
);

router.post(
  "/post-images",
  upload.array("multipleImg"),
  s3Controller.addMultipleImgToS3
);

module.exports = router;
