const fs = require('fs/promises');
const path = require('path');
const config = require('../config');

class FileController {
    constructor() {
        this.list = this.list.bind(this);
        this.getOne = this.getOne.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    async list(req, res, next) {
        const files = [];
        try {
            const directoryFiles = await fs.readdir(config.uploadPath);

            for (const file of directoryFiles) {
                const { size, birthtime } = await fs.stat(path.join(config.uploadPath, file));
                files.push({
                    name: file,
                    size: `${(size / config.maxFileSize).toFixed(3)} MB`,
                    createdAt: birthtime.toLocaleString()
                });
            }

            return res.render('index', { files });
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const filePath = path.join(config.uploadPath, req.params.file);
            if (!await fs.stat(filePath)) {
                return res.render('not-found', { path: `/${req.params.file}` });
            }

            return res.sendFile(filePath);
        } catch (err) {
            return next(err);
        }
    }

    add(req, res, next) {
        return res.redirect('/files');
    }

    async delete(req, res, next) {
        try {
            const filePath = path.join(config.uploadPath, req.params.file);
            if (!await fs.stat(filePath)) {
                return res.render('not-found', { path: `/${req.params.file}` });
            }

            await fs.unlink(filePath);
            return res.redirect('/files');
        } catch(err) {
            return next(err);
        }
    }
}

module.exports = new FileController();
