const multer = require('multer');
const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        const { name: originalName } = path.parse(file.originalname);

        const extension = path.extname(file.originalname);

        const uploadedFilename = `${originalName}_${Date.now()}${extension}`;

        return cb(null, uploadedFilename);
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extension(file.originalname);

        const whitelistedExtensionsRegex = new RegExp(config.whitelistedExtensions.join('|'), 'gi');

        if (!whitelistedExtensionsRegex.test(extension)) {
            const lf = new Intl.ListFormat('en');
            
            return cb(new Error(`Only ${lf.format(config.whitelistedExtensions)} formats are allowed!`), false);
        }

        return cb(null, true);
    }
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: config.maxFileSize
    }
});

module.exports = upload.single('avatar');
