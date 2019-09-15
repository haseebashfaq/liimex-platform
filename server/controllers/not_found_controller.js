

// ********************************* //
// **     NOT FOUND CONTROLLER    ** //
// ********************************* //

module.exports = function(app, route){
        

    // Redirects the user to the beginning of the app
    app.get(route,function(req, res){
    	res.redirect('/');
    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};