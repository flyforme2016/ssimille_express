const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require("sharp");
const s3 = require('../config/s3_config');

const upload = multer ({
    storage: multerS3({
      s3: s3,
      bucket: "ssimille-bucket",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      shouldTransform: true,
      transforms: [{
        key: (req, file, cb) => {
          cb(null, `${file.fieldname}/${Date.now()}_${file.originalname}`);
        },
        transform: function(req, file, cb) {
            //Perform desired transformations
            //sharp
            cb(null, sharp().toFormat("jpeg", { mozjpeg: true }));
        }
      }]
    }),
  })

exports.upload = multer(upload); // upload : storageOptions