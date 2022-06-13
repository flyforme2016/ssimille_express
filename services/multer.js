const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3_config');

exports.uploadFiles = (req, res, next) => {

  const upload = multer({
      limits: { files: 6 }, 
      storage: multerS3({
          s3: s3,
          bucket: "ssimille-bucket",
          contentType: multerS3.AUTO_CONTENT_TYPE,
          acl: 'public-read',
          metadata: function(req, file, cb) {
              cb(null, { fieldName: file.fieldname })
          },
          key: (req, file, cb) => {
            //file의 fieldname으로 S3에 저장될 폴더 경로 지정
            cb(null, `${file.fieldname}/${Date.now()}_${file.originalname}`);
          },
      })
  }).single('profileImg')

  // Custom error handling for multer
  upload(req, res, (error) => {
    console.log('Enter multer upload')
      if (error instanceof multer.MulterError){
        console.log('Enter first error')
        return res.status(400).json({ 
            message: 'Upload unsuccessful', 
            errorMessage: error.message,
            errorCode: error.code
        })
      } 
      
      if (error) {
        console.log('Enter second error')
        return res.status(500).json({
            message: 'Error occured',
            errorMessage: error.message
        })
      }
      console.log('Upload successful.')
      next()
  })
}

// const upload = multer ({
//     storage: multerS3({
//       s3: s3,
//       bucket: "ssimille-bucket",
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       acl: 'public-read',
//       key: (req, file, cb) => {
//         //file의 fieldname으로 S3에 저장될 폴더 경로 지정
//         cb(null, `${file.fieldname}/${Date.now()}_${file.originalname}`);
//       },
//       onError : function(err, next) {
//         console.log('error', err);
//         next(err);
//       },
//     }),
//   })

// exports.upload = multer(upload); // upload : storageOptions