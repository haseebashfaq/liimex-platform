// Authentication Strategies 
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       "liimex.eu.auth0.com",
    clientID:     "7y1cVvs97wDYCs3sHPk9R7Q6bAUMCsXc",
    clientSecret: "9VFOWFIU6fO-vds-7p8ssc9Aw3NsLEn6O2ftEwryQqf_cuTd0T4fh0CjzR_ySn9L",
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Passed values from Main File
useAuthenticationStrategy = function(app){
	app.use(passport.initialize());
	app.use(passport.session());
};

// Exports for other use
module.exports = {
	useAuthenticationStrategy
}