var express = require('express'),
stylus = require('stylus'),
logger = require('morgan'); // css loading, logging

var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // dev or production mode

var app = express(); // initialize express

function compile(str, path){
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');  // set views directory
app.set('view engine', 'jade'); // select view engine
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(__dirname + '/public')); // serve files here for images, css - static route handling for vendors

app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});

// this route handles all pages, can deliver index page if requested again no matter what (404's)
app.get('*', function(req, res){
	res.render('index');
});


var port = 3030;
app.listen(port);
console.log("started.");