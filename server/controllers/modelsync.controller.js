

/*********************************/
/**     MODEL SYNC CONTROLLER   **/
/*********************************/

module.exports = function(app, route){

    // Preload the blank models
    const models = {
        statistics : require('../models/statistics.json'),
        statistics : require('../models/users.json')
    };

    // Get
    app.get(route,function(req, res){
        var company_uid = req.query.company_uid || null;
        var user_uid = req.query.user_uid || null;
        console.log('Modelsync for:', company_uid);

        // Error Reply
        if(!company_uid){
            res.status(600).send('company_uid not provided');
            return;
        }

        // Deep Clone Models Object
        var individual_models = JSON.parse(JSON.stringify(models));

        // Set The Indiv. Root Addresses
        for(var key in individual_models){
            individual_models[key].root += company_uid;
        }

        // Success Reply
        res.send({data:individual_models});
    });

    // Post
    app.post(route,function(req, res){

    });

    // Return Middleware
    return function(req, res, next){
        next();
    }
};
