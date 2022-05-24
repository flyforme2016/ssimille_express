const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3_config');

const upload = multer ({
    storage: multerS3({
      s3: s3,
      bucket: "ssimille-bucket",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
        //file의 fieldname으로 S3에 저장될 폴더 경로 지정
        cb(null, `${file.fieldname}/${Date.now()}_${file.originalname}`);
      },
    }),
  })

exports.upload = multer(upload); // upload : storageOptions