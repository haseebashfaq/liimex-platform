

// ******************************* //
// **         CONTROLLER        ** //
// ******************************* //

module.exports = function(app, route){

    // Environment Variables
    const env_vars = null;

    /* GET */
    app.get(route,function(req, res){
      var keys = req.query.keys;
    	res.send({data:result});
    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};
