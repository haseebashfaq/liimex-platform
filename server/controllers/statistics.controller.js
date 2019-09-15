

/*********************************/
/**     STATISTICS CONTROLLER   **/
/*********************************/

module.exports = function(app, route){

    // Preload the blank statistics model
    const statistics = require('../models/statistics.json');    

    app.get(route,function(req, res){

    });

	app.post(route,function(req, res){
    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};