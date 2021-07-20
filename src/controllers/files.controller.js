const fileService = require('../services/files.service');

class FileController {
    constructor() {
        this.list = this.list.bind(this);
        this.getOne = this.getOne.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    async list(req, res, next) {
        try {
            const files = await fileService.list();
            return res.render('index', { files });
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            if (!await fileService.fileExist(req.params.file)) {
                return res.render('not-found', { path: req.originalUrl });
            }

            return res.sendFile(fileService.getFilePath(req.params.file));
        } catch (err) {
            return next(err);
        }
    }

    add(req, res, next) {
        return res.redirect('/files');
    }

    async delete(req, res, next) {
        try {
            if (!await fileService.fileExist(req.params.file)) {
                return res.render('not-found', { path: req.originalUrl });
            }

            await fileService.deleteFile(req.params.file);
            return res.redirect('/files');
        } catch(err) {
            return next(err);
        }
    }
}

module.exports = new FileController();
