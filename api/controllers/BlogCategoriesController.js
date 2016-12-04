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

    create : function(req,res) {

        if(!req.body.id) {
            BlogCategory.create(req.body).exec(function(err,categories){
                if(err) return res.negotiate(err)

                return res.json(categories[0])
            })
        }else{
            var id = req.body.id
            delete(req.body.id)

            BlogCategory.update({id:id},req.body).exec(function(err,categories){
                if(err) return res.negotiate(err)

                return res.json(categories[0])
            })
        }


    },

    getById : function(req,res) {

    },

    delete : function(req,res) {


        BlogPost.find({category : req.params.id}).exec(function(err,categories){
            if(err) return res.negotiate(err)
            if(categories.length) return res.badRequest({
                message : "Η κατηγορία δεν μπορεί να διαγραφεί γιατί υπάρχουν αναρτήσεις που τη χρησιμοποιούν."
            })

            BlogCategory.destroy({id:req.params.id}).exec(function(err,ok){
                if(err) return res.negotiate(err)
                return res.ok()
            })
        })


    }




};

module.exports = BlogCategoriesController;
