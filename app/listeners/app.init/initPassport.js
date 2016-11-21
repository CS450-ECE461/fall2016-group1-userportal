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
      "username" : req.body.username,
      "password" : req.body.password,
    };
    request
        .post('localhost:5000/api/v1/auth/jwt')
        .send(newUser)
        .end(function (err, resp){
          if(err){
            if(err.status == '422')
              res.render('login.pug', {login_error_message: 'Email or password incorrect.'});
            else
              console.log(err);
          }
          else{
            var jwt = resp.body.jwt;
            console.log(jwt);
          }
        });
  }
}
