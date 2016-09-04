/**
 * Authentication Controller
 *
 */


var SettingsController = {

    getSettings : function(req, res) {

        Settings.find().limit(1).exec(function(err, data){
            if(err) return res.negotiate(err);

            return res.json(data[0])
        });
    },
    upsertSettings : function(req, res) {

        Settings.updateOrCreate({version:req.body.version}, req.body,function(err, created){
            if(err) return res.negotiate(err);

            return res.created(created)
        });
    }

};

module.exports = SettingsController;
