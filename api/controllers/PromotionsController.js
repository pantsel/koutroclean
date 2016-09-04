/**
 * Services Controller
 *
 */


var ServicesController = {

    retrieve : function(req,res) {

        Promotions.find({}).exec(function(err,promotions){
            if(err) return res.negotiate(err);
            return res.json(promotions)
        })
    },
    delete : function(req,res) {
        Promotions.destroy({
            version : 'default'
        }).exec(function(err,service){
            if(err) return res.negotiate(err);
            return res.json(service)
        })
    },
    upsert : function(req, res) {

        if(!req.body.id) {
            Promotions.create(req.body).exec(function(err,doc){
                if(err) return res.negotiate(err);
                return res.json(doc)
            })
        }else{
            Promotions.update({id:req.body.id}, {
                price : req.body.price,
                chargeInterval : req.body.chargeInterval,
                slot : req.body.slot,
                details : req.body.details,
                ordering : req.body.ordering
            },function(err, updated){
                if(err) return res.negotiate(err);
                return res.json(updated)
            });
        }
    }

};

module.exports = ServicesController;
