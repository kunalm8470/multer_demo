const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();

process
.on('unhandledRejection', (reason, promise) => {
    console.error(reason.message);
})
.on('uncaughtException', (err) => {
    console.error(err.message);
});

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(require('./routes'));

app.use('*', (req, res) => {
    return res.render('not-found', { path: req.originalUrl });
});

app.use((err, req, res, next) => {
    const errObj = { 
        error: err.message, 
        stack: err?.stack 
    };

    if (err.code === 'LIMIT_FILE_SIZE') {
        delete errObj.stack;
        errObj.error = `Max file size is ${(config.maxFileSize / (1024 * 1024)).toFixed(2)} MB`;
    }

    return res.render('error', errObj);
});

app.listen(config.appPort, () => {
    console.log(`Server listening on port ${config.appPort}`);
});