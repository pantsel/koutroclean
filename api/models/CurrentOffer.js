// api/models/Promotion.js
module.exports = {
    attributes: {
        title : {
            type : 'string',
            required : true
        },
        tagline : {
            type : 'string'
        },
        text : {
            type : 'string',
            required : true
        },
        validFrom : {
            type : 'date',
            required : true
        },
        validUntil : {
            type : 'date',
            required : true
        },
        active : {
            type : 'boolean',
            defaultsTo : true
        }
    }
};
