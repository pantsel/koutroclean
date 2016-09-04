// api/models/Service.js
module.exports = {
    attributes: {
        title : 'string',
        description: {
            type: 'string',
            defaultsTo: ''
        },
        ordering : 'integer',
        details : 'array'
    }
};
