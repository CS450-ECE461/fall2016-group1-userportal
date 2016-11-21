'use strict';
var passport      = require ('passport')
  , LocalStrategy = require ('passport-local').Strategy

  ;

module.exports = initPassport;

function initPassport (app) {

  var opts = {session: true};

  passport.use (new LocalStrategy (opts, authorize));

  function authorize (username, password, done) {
    var newUser = {
      "username" : username,
      "password" : password,
    };
    console.log("Username: "+newUser.username);
    console.log("Password: "+newUser.password);
    request
        .post('localhost:5000/api/v1/auth/jwt')
        .send({newUser})
        .end(function (error, resp){
          if(error){
            if(error.status == '422')
              //res.render('login.pug', {login_error_message: 'Email or password incorrect.'});
              console.log(error);
          }
          else{
            var jwt = resp.body.jwt;
            console.log(jwt);
            return done (null, jwt);
          }
          return done(null, false);
        });
  }
}
