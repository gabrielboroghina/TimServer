const express = require('express'),
    app = express(),
    morgan = require('morgan');

// serve static assets
app.use(express.static(__dirname));

Object.assign = require('object-assign');

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

let speed = 0, direction = 0;

// GET callbacks

app.post('/upd', function (req, res) {
    // update values
    speed = req.query.spd;
    direction = req.query.trj;
    console.log("Received val = " + req.query.spd);
    res.send('');
});

app.get('/get', function (req, res) {
    res.send('***' + speed + ";" + direction);
});

app.get('/', function (req, res) {
    res.render('index.html', {pageCountMessage: null});
});


// error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
