var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var notesRoutes = require('./routers/notes');
var userRoutes = require('./routers/user');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes');


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log('listening on 3000')
})


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use('/user', userRoutes);
app.use('/notes', notesRoutes);