/**
 * Authentication Controller
 *
 */




var BlogCategoriesController = {

    query : function(req,res) {

        BlogCategory.find().then(function(data){
            return res.json(data)
        }).catch(function(err){
            return res.negotiate(err.Errors);
        });

    },

    getById : function(req,res) {

    },

    delete : function(req,res) {

    }




};

module.exports = BlogCategoriesController;
