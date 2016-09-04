// api/models/User.js
module.exports = {
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id'
        },
        name: {
            type: 'string',
            columnName: 'name'
        },
        password: {
            type: 'string',
            columnName: 'password'
        },
        email: {
            type: 'email',
            unique: true,
            columnName: 'email'
        }
    }
};
