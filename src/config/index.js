const path = require('path');

module.exports = {
    maxFileSize: 1 * 1024 * 1024,
    whitelistedExtensions: ['jpeg', 'jpg', 'bmp', 'png'],
    uploadPath: path.join(__dirname, '..', 'uploads'),
    appPort: 3000
};
