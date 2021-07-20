const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/files'));
router.use('/files', require('./files.route'));

module.exports = router;
