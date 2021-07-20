const express = require('express');
const filesController = require('../controllers/files.controller');
const uploadFileMiddlware = require('../middlewares/multer.middleware');
const router = express.Router();

router.get('/', filesController.list);
router.get('/:file', filesController.getOne);
router.post('/', uploadFileMiddlware, filesController.add);
router.post('/delete/:file', filesController.delete);

module.exports = router;
