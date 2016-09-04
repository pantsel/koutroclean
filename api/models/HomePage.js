// api/models/HomePage.js
module.exports = {
    attributes: {
        settings : 'object',
        profile: {
            type: 'string',
            defaultsTo: ''
        },
        version : {
            type: 'string'
        }
    },
    updateOrCreate: function(criteria, values, cb){
        var self = this; // reference for use by callbacks
        // If no values were specified, use criteria
        if (!values) values = criteria.where ? criteria.where : criteria;

        this.findOne(criteria, function (err, result){
            if(err) return cb(err, false);

            if(result){
                self.update(criteria, values, cb);
            }else{
                self.create(values, cb);
            }
        });
    }


};
