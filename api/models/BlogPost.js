// api/models/Promotion.js
module.exports = {
    attributes: {
        title : 'string',
        image : 'string',
        body : 'string',
        category : {
            model: 'blogcategory',
            required: true
        },
        createdAt : {
            type: 'datetime',
            defaultsTo: function() {return new Date();}
        },
        updatedAt : {
            type: 'datetime',
            defaultsTo: function() {return new Date();}
        }
    },
    beforeUpdate:function(values,next) {
        values.updatedAt= new Date();
        next();
    }
};
