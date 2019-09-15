
/*****************************************/
/**				Express Server			**/
/*****************************************/

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var sslRedirect = require('heroku-ssl-redirect');
var _ = require('lodash');
var path = require ('path');
var http = require('http');
//var db = require('./models'); // Database stuff
const https = require('https');
var auth = require('./authstrats');

// Load Application Keys
global.appvars = require('./appvars.json');

// Set API prefix
var api_prefix = '/api';

// Create Application
var app = express();

// Configuretion and stuff
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(sslRedirect());

// Set Static Contect Folder
app.set('views', path.join(__dirname, '../build'));
app.use(express.static(app.get('views')));
app.get('', function(request, response) {
  response.render('index');
});

//CORS Support
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Assign Models to app.models for easy access
//app.models = require('./models'); // Database models

// Routes File
var routes = require('./routes');
_.each(routes,function(controller, route){
    app.use(api_prefix+route,controller(app,api_prefix+route));
})

// Redirect to not found in case of anything else
var null_controller = require('./controllers/not_found_controller');
app.use('*', null_controller(app,'*'));

// Use the Authenication
auth.useAuthenticationStrategy(app);

// Listen To Sequelize Database!
// db.sequelize.sync().then(function() {
app.listen(app.get('port'), function(){
  console.log('\nServing backend on port: ' + app.get('port'));
});
// });
