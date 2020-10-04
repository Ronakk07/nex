const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAcessKeyId,
});

const s3 = new aws.S3();

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'my-bucket',
    acl: 'public-read',
    /* Metadata is to refer that the value will be the name of the file */
    metadata: (req, file, cb) => {
      cb(null, { feildName: file.fieldName });
    },
    /* Key is to refer that key will be  Date that we just uploaded */
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = uploadImage;
