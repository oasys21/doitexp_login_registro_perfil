var express = require('express');
var router = express.Router();
var User = require('../models/user');
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	// Página de Ingreso. LOGIN GET
	// Carga página, solicita datos y despliega mensaje si existe alguno...
	// Retorna Datos y Graba en BD  LOGIN POST
	router.get('/', function(req, res) {
  	res.render('index', { message: req.flash('message') });
	})

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	// Página de Registro. SIGNUP GET
	// Retorna Datos y Graba en BD
	router.get('/signup', function(req, res){
		res.render('register', { message: req.flash('message') });
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	// Página de Perfil. PROFILES GET
	router.get('/profiles', function(req, res){
		 res.render('profilep', req.user );
	});

	// { message: req.flash('message')},
	/* Handle Registration POST */
	router.post('/profiles', passport.authenticate('profiles', {
		successRedirect: '/home',
		failureRedirect: '/profilep',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', req.user );
	});
	//{ user: req.user }
	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	return router;
}
