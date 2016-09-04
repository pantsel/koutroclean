/**
 * Services Controller
 *
 */


var ServicesController = {

    getServices : function(req,res) {

        Service.find({}).exec(function(err,services){
            if(err) return res.negotiate(err);
            return res.json(services)
        })
    },
    delete : function(req,res) {
        Service.destroy({id: req.params.id}).exec(function(err,service){
            if(err) return res.negotiate(err);
            return res.json(service)
        })
    },
    upsertService : function(req, res) {
        if(!req.body.id) {
            Service.create(req.body).exec(function(err,service){
                if(err) return res.negotiate(err);
                return res.json(service)
            })
        }else{
            Service.update({id:req.body.id}, {
                title : req.body.title,
                description : req.body.description,
                details : req.body.details,
                ordering : parseInt(req.body.ordering) || 0
            },function(err, updated){
                if(err) return res.negotiate(err);
                return res.json(updated)
            });
        }
    }

};

module.exports = ServicesController;
