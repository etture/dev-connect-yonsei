const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: 'ap-northeast-2'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'jinoolee-aws-s3',
        key: function(req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString() + path.extname(file.originalname));
        }
    })
});

module.exports = upload;