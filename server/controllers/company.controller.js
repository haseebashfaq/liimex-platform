

// ******************************* //
// **     ACCOUNT CONTROLLER    ** //
// ******************************* //

module.exports = function(app, route){
        
    /**
	@apiGroup Account
	@api {get} /account Get account data
	@apiParam {String} email The users email address
	@apiParam {String} token The users current access token
	@apiSuccess {number} status 200
	@apiSuccess {String} id The users unique idenfitier
	@apiSuccess {String} settings The users settings
	@apiSuccess {String} company The users company relations
	@apiSuccess {String} role The users role and permissions
	@apiError (Not Authenticated 400) {number} status status code 
	@apiError (Bad Request 404) {number} status status code 
    **/
    app.get(route ,function(req, res){
        
    });

    /**
    @apiGroup Account
    @api {post} /account Create a new account
	@apiParam {String} email The users email address
	@apiParam {String} password The users desired password
	@apiParam {String} company The users company relations
	@apiParam {String} phone The users phone number
	@apiParam {String} phone The users phone number
	**/
	app.post(route,function(req, res){
    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};