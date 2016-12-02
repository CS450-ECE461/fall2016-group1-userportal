'use strict';

var blueprint = require ('@onehilltech/blueprint')
  ;
var token;

module.exports = UserController;

function UserController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (UserController);

UserController.prototype.signout = function () {
    return function (req, res) {
        req.logout ();
        return res.render('login.pug', {login_error_message: 'You have been successfully logged out.'});

    };
};
function getName(){
  var newUser = {
    "username" : username,
    "password" : password
  };
  console.log("Username: "+newUser.username);
  console.log("Password: "+newUser.password);
  console.log("New User: "+ newUser )
  request
      .post('localhost:5000/api/v1/auth/jwt')
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
          console.log(token);
          return done (null, token);
        }
        return done(null, false);
      });
}

UserController.prototype.showMe = function () {
  return function (req, res) {
    token = req.user

    res.render ('dashboard.pug', {welcome:"Welcome "+name });
  }
};
