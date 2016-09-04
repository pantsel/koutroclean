/**
 * Version.js
 *
 * @description :: Represents a release version, which contains assets and is a member of a channel
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    application : {
      model : 'application',
      required: true
    },

    assets: {
      collection: 'asset',
      via: 'version'
    },

    channel: {
      model: 'channel',
      required: true
    },

    notes: {
      type: 'string'
    }
  },
  beforeCreate: function (values, cb) {

    Application.findOne({
      imeId: values.application
    }).exec(function(err,app){
      if(err) return cb(err)
      if(!app) return cb(new Error('Invalid application specified'))

      //Version.findOne({
      //  name: values.name,
      //  application: values.application
      //}).exec(function(err, existingDoc){
      //  if(err) return cb(err);
      //  console.log('existingDoc',existingDoc)
      //  if(existingDoc) return cb(new Error('Duplicate: Version with the same name already exists for the defined application'));
      //  return cb(null, values);
      //});

      return cb(null, values);

    })
  }

};
