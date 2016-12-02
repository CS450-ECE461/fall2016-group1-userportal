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
            res.render ('dashboard.pug', {welcome: 'Welcome '+userInfo.firstName});
          }
        });

  }
};

UserController.prototype.userInfo = function () {
    return function (req, res) {
        return res.render('userInfo.pug',
          {
            fName: 'First Name: '+ userInfo.firstName,
            lName: 'Last Name: '+userInfo.lastName,
            email: 'Email: '+userInfo.email,
            handle : 'Username: '+userInfo.handle,
            created : 'Your account was created on: '+userInfo.created,
            updated : 'Your account was last updated at '+userInfo.updated
          });
    };
};

UserController.prototype.renderUsers = function () {
  var userArr = {};
    return function (req, res) {
      request
          .get('localhost:5000/api/v1/users')
          .type("json")
          .end(function (error, resp){
            if(error){
              if(error.status == '404')
                console.log("Error: "+error);
            }
            else{
              userArr = resp.body.users;
              userArr.forEach(function(value){
                console.log(value.firstName);
              });
              res.render ('sendMessage.pug', {users: 'Welcome '});
            }
          });
    };
};
