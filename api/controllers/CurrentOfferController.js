
var qs  = require('qs');

var CurrentOfferController = {

    query : function(req,res) {

        var q = qs.parse(req.query)

        if(q.validUntil) q.validUntil = {
            ">=" : new Date(q.validUntil)
        }
        if(q.validFrom) q.validFrom = {
            "<=" : new Date(q.validFrom)
        }


        CurrentOffer.find(q || {}).limit(1).exec(function(err,offers){
            if (err) return res.negotiate(err)

            return res.json(offers[0])
        })
    },

    createOrUpdate : function(req,res) {

        if(!req.body.id) {
            CurrentOffer.create(req.body).exec(function(err,offers) {
                if (err) return res.negotiate(err)

                return res.json(offers[0])
            })
        }else{
            var id = req.body.id
            delete req.body.id
            CurrentOffer.update({id:id},req.body).exec(function(err,offers) {
                if (err) return res.negotiate(err)

                return res.json(offers[0])
            })
        }
    }

};

module.exports = CurrentOfferController;
