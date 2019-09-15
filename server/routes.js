

/*****************************/
/**  	Routing Class		**/
/*****************************/

module.exports = {

	/* Blank */
    '/blank' : require('./controllers/blank_controller'),

    /* Statistics */
    '/statistics' : require('./controllers/statistics.controller.js'),

    /* Model Sync */
    '/modelsync' : require('./controllers/modelsync.controller.js'),

    /* Authentication */
    '/auth' : require('./controllers/auth_controller'),

 	/* Categories */
    '/categories' : require('./controllers/categories.controller.js'),

    /* Liimex Categories */
    '/liimex_cats' : require('./controllers/liimexcategories.controller.js'),

    /* Environment Variables*/
    '/env_vars' : require('./controllers/vars.controller.js')

}
