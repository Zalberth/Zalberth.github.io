var 
	http = require('http'),
	mysql = require('mysql'),
	uuid = require('node-uuid'),
	express = require('express'),
	fs = require('fs');
	routes = require('./routes'),
	app = express(),
	morgan = require('morgan'), //used to be logger
	bodyParser = require('body-parser'),
	menthodOverride = require('method-override'),
	passport = require('passport'),
	session = require('express-session'),
	LocalStrategy = require('passport-local').Strategy;

var jsonObj = {};
//Be aware that the app.configure() is removed in Express 4.x!

	var server = http.createServer(app);
	
	app.use(morgan());
	app.use(bodyParser());
	app.use(menthodOverride());
	app.use(session({ resave:false, saveUninitialized: false, secret: 'keyboard cat' }));//Make sure that the express.session is before passport.session
	app.use(passport.initialize());  //初始化认证
    app.use(passport.session());
    
	passport.serializeUser(function(user, done) {
		console.log("In serializeUser app.js");
		done(null, user.username);
	}); //先注册了这个函数

	passport.deserializeUser(function(user, done) {
		// body...
		// 这个函数一定要实现，不然就会pendingggggggg
		 done(null, user);
	});
	
	passport.use(new LocalStrategy(
		function(username, password, done) {
			//原来user的模型要自己实现。。。 槽
			var myLocal = {
				username:"albertzmh",
				password:"1991923"
			}
			if (username !== myLocal.username) {
				return done(null, false, { message:'username mismatched'});
			}
			if (password !== myLocal.password ) {
				return done(null, false, { message:'password mismatched'});
			}
			return done( null, myLocal);
		}
	));
    

   app.use(function(req, res, next) {
    	if(req.path.indexOf('lists.html') >= 0) {
    		console.log('lists.html suffix test');
    		console.log('????');
    		console.log("log:"+ req.session.passport);
    		if( req.session.passport.hasOwnProperty('user')) {
    			console.log("session first");
    			next();
    		} else {
    			res.redirect('/lg');
    		}
    		
    	} else {
    		next();
    	}
    });

    app.use('/static',express.static(__dirname+'/public')); //配置静态资源文件的位置

	
	
	routes.configRoutes(app, server, mysql, uuid, fs, jsonObj, passport);

	server.listen(3111);
	console.log('express server listening on port %d in %s mode',server.address().port,app.settings.env);