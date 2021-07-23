const express = require('express');
const path = require('path');
const config = require('./config');
const bootstrap = require('./bootstrap');

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
app.use('/public', express.static(path.join(__dirname, 'public')));

(async() => {
    await bootstrap();
})();

app.use(require('./routes'));

app.use('*', (req, res) => {
    return res.render('pages/not-found', { path: req.originalUrl });
});

app.use((err, req, res, next) => {
    return res.render('pages/error', { message: err.message, stack: err?.stack || '' });
});

const port = parseInt(process.env.PORT, 10) || config.appPort;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
