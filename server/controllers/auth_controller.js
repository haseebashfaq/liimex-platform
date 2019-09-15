

// ************************************ //
// **   AUTHENTICATION CONTROLLER    ** //
// ************************************ //

module.exports = function(app, route){ 

    /**
	@apiGroup Authentication
	@api {post} /auth Get authentication token

	@apiParam {String} email The users email address
	@apiParam {String} password The users password

	@apiSuccess {number} status 200
	@apiSuccess {String} token The users authentication token

	@apiError (Not Authenticated 400) {number} status status code 
	@apiError (Bad Request 404) {number} status status code 
    **/
    app.post(route,function(req, res){
    	var params = req.body;
        console.log(params)

    	var response = {};
    	response.status = 200;
    	res.send(response); 
    });    


    // Return Middleware
    return function(req, res, next){
        next();
    }
};