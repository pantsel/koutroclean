module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    alias: {
      type: 'text',
      unique : true
    },

    imeId: {
      type: 'string',
      primaryKey: true,
      unique : true,
      required: true
    },

    platforms: {
      type: 'array',
      required: true
    },

    versions : {
      collection: 'version',
      via: 'application'
    },

    iconUrl: {
      type: 'string'
    },

    iconFd: {
      type: 'string'
    }
  },
  afterValidate: function(values,next){
    values.alias = values.name.toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
    ;
    return next();
  },
  beforeCreate: function (values, cb) {

    Application.findOne({
      imeId: values.imeId
    }).exec(function(err,app){
      if(err) return cb(err)
      if(app) return cb(new Error('Application with imeId ' + values.imeId + ' already exists'))

      Version.findOne({
        name: values.name,
        application: values.application
      }).exec(function(err, existingDoc){
        if(err) return cb(err);
        console.log('existingDoc',existingDoc)
        if(existingDoc) return cb(new Error('Duplicate: Version with the same name already exists for the defined application'));

        return cb(null,values)

      });

    })
  },
  autoPK: false
};
