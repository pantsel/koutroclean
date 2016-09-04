// api/models/Promotion.js
module.exports = {
    attributes: {
        title : 'string',
        description : 'string',
        posts: {
            collection: 'blogpost',
            via: 'id'
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
    },
    seedData:[
        {
            title: 'Νέα',
            description : 'Τα νέα της εταιρείας μας',
        }]
};
