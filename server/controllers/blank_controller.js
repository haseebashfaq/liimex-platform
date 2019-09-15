

// ******************************* //
// **     CONTROLLER    ** //
// ******************************* //

module.exports = function(app, route){
        

	/**
	* @apiGroup Ping
	* @api {get} /blank
	* @apiDescription Does almost absolutely nothing
	* @apiSuccess {String} always "ping"
	**/
    app.get(route,function(req, res){
    	res.send({data:"ping"});
    });


    // Return Middleware
    return function(req, res, next){
        next();
    }
};