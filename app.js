var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);
//
var app = express();
//
// View engine setup
//
app.set('images', path.join(__dirname, 'images'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
// Configuring Passport
//
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
//
// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());
//
// Initialize Passport
//
var initPassport = require('./passport/init');
initPassport(passport);
//
var routes = require('./routes/index')(passport);
app.use('/', routes);
//
// catch 404 and forward to error handler
//
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//
module.exports = app;
//
/**
module.exports = function(app){
	// Register and configure the handlebars templating engine
	app.engine('html', handlebars({
		defaultLayout: 'main',
		extname: ".html",
		layoutsDir: __dirname + '/views/layouts'
	}));
	// Set .html as the default template extension
	app.set('view engine', 'html');
	// Tell express where it can find the templates
	app.set('views', __dirname + '/views');
	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));
	// Parse POST request data. It will be available in the req.body object
	app.use(express.urlencoded());
};
**/
//
