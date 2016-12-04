/**
 * Services Controller
 *
 */


var EmailsController = {

    query : function(req,res) {

        Email.find({}).exec(function(err, emails){
            if(err) return res.negotiate(err);
            return res.json(emails)
        });
    },
    createEmail : function(req,res) {

        Email.create(req.body).exec(function createCB(err, created){
            if(err) return res.badRequest({
                message : "Το email δεν είναι έγκυρο."
            });
            return res.json(created)
        });
    },
    retrieveEmail : function(req,res) {

        Email.find({'email': req.params.email}).exec(function(err,email){
            if(err) return res.negotiate(err);
            return res.json(email)
        })
    },
    deleteEmail : function(req,res) {
        Email.destroy({
            email : req.params.email
        }).exec(function(err,res){
            if(err) return res.negotiate(err);
            return res.json(res)
        })
    }

};

module.exports = EmailsController;
