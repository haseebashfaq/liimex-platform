

// ******************************* //
// **         CONTROLLER        ** //
// ******************************* //

module.exports = function(app, route){
        
     // Load file with ISIC Codes
    const isic_codes = require('../staticdata/isic_codes.json');

    /**
    @apiGroup Categories
    @api {get} /categories Get ISIC Categories
    @apiParam {String} level one of either ['sections', 'divisions', 'groups', 'classes']
    @apiParam {List} keys (optional) The keys in the level of categories 
    @apiSuccess {JSON} data The set of ISIC data specific for the input parameters
    @apiError (Internal Server Error 500) {number} Caused by invalid level or key parameters 
    **/

    /* GET */
    app.get(route,function(req, res){
        var level = req.query.level;

        var keys = req.query.keys;
        var result = isic_codes[level];
        if(keys){
            var tmp_result = {};
            for(key in keys){
                tmp_result[key] = result[keys[key]];
            }
            result = tmp_result;
        }
    	res.send({data:result});

    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};