'use strict';

var blueprint = require ('@onehilltech/blueprint')
  ;
var token;
var FName;
var userInfo = {
  "firstName" : '',
  "lastName" : '',
  "email" : '',
  "handle" : '',
  "created" : '',
  "updated" : ''
};
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

UserController.prototype.showMe = function () {
  return function (req, res) {
    token = req.user
    request
        .post('localhost:5000/api/v1/users/me')
        .type("json")
        .set('Authorization', 'JWT '+token)
        .end(function (error, resp){
          if(error){
            if(error.status == '400')
              console.log("Error: "+error);
              else if(error.status == '401')
                console.log("Error: "+error);
          }
          else{
            userInfo.firstName = resp.body.firstName;
            userInfo.lastName = resp.body.lastName;
            userInfo.email = resp.body.emailAddress;
            userInfo.handle = resp.body.handle;
            userInfo.created = resp.body.createdAt;
            userInfo.updated = resp.body.updatedAt;
            console.log(userInfo.firstName);
            console.log(userInfo.lastName);
            console.log(userInfo.email);
            console.log(userInfo.handle);
            console.log(userInfo.created);
            console.log(userInfo.updated);
            res.render ('dashboard.pug', {welcome: 'Welcome '+userInfo.firstName});
          }
        });

  }
};
