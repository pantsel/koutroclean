

module.exports = {

  attributes: {

    email : {
      type : 'string',
      unique: true,
      required : true
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

  beforeValidate: function(values, cb) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(values.email)) {

      return cb(new Error('Το email δεν είναι έγκυρο'));
    }

    Email.findOne({email: values.email}).exec(function (err, record) {
      var uniqueEmail = !err && !record;

      if(!uniqueEmail) {
        cb({
          data : {
            "message" : "Το email υπάρχει ήδη και ανήκει σε κάποιον άλλο χρήστη"
          }});
      }else{
        cb();
      }


    });
  },

  beforeUpdate:function(values,next) {
    values.updatedAt= new Date();
    next();
  }


};
