const fs = require('fs/promises');
const { constants } = require('fs');
const path = require('path');
const config = require('../config');

class FileService {
    constructor() {
        this.list = this.list.bind(this);

        this.fileExist = this.fileExist.bind(this);

        this.getFilePath = this.getFilePath.bind(this);

        this.deleteFile = this.deleteFile.bind(this);
    }

    getFilePath(fileName) {
        return path.join(config.uploadPath, fileName);
    }

    async list() {
        const files = [];

        const directoryFiles = await fs.readdir(config.uploadPath);

        for (const file of directoryFiles) {
            const { size, birthtime } = await fs.stat(this.getFilePath(file));

            files.push({
                name: file,
                size: `${(size / config.maxFileSize).toFixed(3)} MB`,
                createdAt: birthtime.toLocaleString()
            });
        }

        return files;
    }

    async fileExist(fileName) {
        try {
            const fileExistPath = this.getFilePath(fileName);

            await fs.access(fileExistPath, constants.F_OK | constants.R_OK | constants.W_OK);

            return true;
        } catch {
            return false;
        }
    }

    deleteFile(fileName) {
        const deleteFilePath = this.getFilePath(fileName);
        
        return fs.unlink(deleteFilePath);
    }
}

module.exports = new FileService();
