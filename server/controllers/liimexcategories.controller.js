

// ******************************* //
// **         CONTROLLER        ** //
// ******************************* //

module.exports = function(app, route){
        
     // Load file with Liimex Categories
    const liimex_cats = require('../staticdata/liimex_categories.json');

    /**
    @apiGroup Categories
    @api {get} /liimex_cats Get Liimex Categories
    @apiSuccess {JSON} data Objet containing a list of Liimex Categories
    @apiError (Internal Server Error 500)
    **/

    /* GET */
    app.get(route,function(req, res){
    	res.send({data:liimex_cats});
    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};