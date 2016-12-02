'use strict';

var blueprint = require ('@onehilltech/blueprint');
var ResourceClient = require('../../lib/ResourceClient');
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

var userArr = {};
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
              res.render ('sendMessage.pug', {users: userArr});
            }
          });
    };
};

UserController.prototype.sendMessage = function () {
    return function (req, res) {
      var messageClient = new ResourceClient("http://localhost:5000", "messages");
      messageClient.jwt = token;
      var message = {
        "receiver" : req.body.receiver,
        "expireAt" : req.body.expireAt,
        "content" : req.body.content,
      };
      var userFound = false;
      console.log(message.receiver);
      console.log(message.expireAt);
      console.log(message.content);
      userArr.forEach(function(value) {
        if(value.handle == message.receiver){
          console.log("Username found: "+ message.receiver);
          message.receiver = value._id;
          console.log("New value: "+ message.receiver);
          userFound = true;
        }
      });

      if(userFound){
            messageClient.create(message, function (error, resp) {
              if(error){
                if(error.status == '422'){
                  console.log("Error: "+error);
                  res.render ('sendMessage.pug', {users: userArr, error_message: "The request didn't contain all necessary information"});
                }
                else if(error.status == '401'){
                  console.log("Error: "+error);
                  res.render ('sendMessage.pug', {users: userArr, error_message: "The request didn't contain a valid JWT Header."});
                }
              }
              else{
                console.log(resp.body);
                res.render ('dashboard.pug',
                {
                  welcome: 'Welcome '+userInfo.firstName,
                  message: "Message has been successfully sent"
                });
              }
            });
      }
      else {
        res.render ('sendMessage.pug', {users: userArr, error_message: "The username requested does not exist."});
      }
    };
};
