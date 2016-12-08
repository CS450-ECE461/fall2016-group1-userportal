'use strict';
var passport      = require ('passport')
  , LocalStrategy = require ('passport-local').Strategy

  ;

module.exports = initPassport;

function initPassport (app) {
  var User = app.models.User;
  var opts = {session: true};
  
  // call the passport serializer
  passport.use (new LocalStrategy (opts, authorize));
  
  // receive the jwt from the api
  function authorize (username, password, done) {
    var newUser = {
      "username" : username,
      "password" : password
    };
    request
        .post('http://prattle.bdfoster.com/api/v1/auth/jwt')
        .type("json")
        .set("Accept", "application/json")
        .send(newUser)
        .end(function (error, resp){
          if(error){
            if(error.status == '422')
              console.log(error);
          }
          else{
            var token = resp.body.jwt;
            return done (null, token);
          }
          return done(null, false);
        });
  }
}
