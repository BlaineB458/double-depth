const multer = require('multer');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
    destination: 'portfolio-data/images',
    filename: function(req, file, cb){
        cb(null, uuid() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
});

const uploadAllImages = upload.array('images', 10);

module.exports = uploadAllImages;