const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => res.redirect('/files'));

router.use('/files', require('./files.route'));

module.exports = router;
