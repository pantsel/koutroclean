/**
 * Authentication Controller
 *
 */


var HomePageController = {


    getHome : function(req, res) {

        HomePage.find().limit(1).exec(function(err, data){
            if(err) return res.negotiate(err);

            return res.json(data[0])
        });
    },
    getProfile : function(req, res) {

        HomePage.find().limit(1).exec(function(err, data){
            if(err) return res.negotiate(err);

            return res.json(data[0] ? data[0].profile : '')
        });
    },
    upsertProfile : function(req, res) {

        if(!req.body.profile) {
            return res.json(400, {error: 'Δεν έχει οριστεί προφίλ!'});
        }

        console.log("req.body.version",req.body.version)

        HomePage.updateOrCreate({version:req.body.version}, req.body,function(err, created){
            if(err) return res.negotiate(err);

            return res.created(created)
        });
    }

};

module.exports = HomePageController;
