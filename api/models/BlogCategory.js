var slugify = require('slugify')

module.exports = {
    attributes: {
        title : 'string',
        alias : 'string',
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
    beforeCreate:function(values,next) {
        values.alias = slugify(values.title)
        next();
    },
    beforeUpdate:function(values,next) {
        values.alias = slugify(values.title)
        values.updatedAt= new Date();
        next();
    },
    seedData:[
        {
            title: 'Νέα',
            description : 'Τα νέα της εταιρείας μας',
        },
        {
            title: 'Καθαριότητα',
            description : '',
        },
        {
            title: 'Συμβουλές',
            description : 'Τα νέα της εταιρείας μας',
        },
        {
            title: 'Γενικά',
            description : 'Τα νέα της εταιρείας μας',
        }]
};
