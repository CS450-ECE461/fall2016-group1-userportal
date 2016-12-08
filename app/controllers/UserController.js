'use strict';

var blueprint = require ('@onehilltech/blueprint')
request =  require ('superagent')
  ;
var token;
var FName;
var userInfo = {
  '_id' : '',
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

// save user information in userInfo
UserController.prototype.showMe = function () {
  return function (req, res) {
    token = req.user
    console.log(token);
    request
        .post('http://prattle.bdfoster.com/api/v1/users/me')
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

            userInfo._id = resp.body._id;
            userInfo.firstName = resp.body.firstName;
            userInfo.lastName = resp.body.lastName;
            userInfo.email = resp.body.emailAddress;
            userInfo.handle = resp.body.handle;
            userInfo.created = resp.body.createdAt;
            userInfo.updated = resp.body.updatedAt;
            console.log('ID: '+userInfo._id);
            res.render ('dashboard.pug', {welcome: 'Welcome '+userInfo.firstName});
          }
        });

  }
};

// Display user info
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

// Display the users that have already registered
UserController.prototype.renderUsers = function () {
    return function (req, res) {
      request
          .get('http://prattle.bdfoster.com/api/v1/users')
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
      var message = {
        message : {
         "channel": { "receiver" : req.body.receiver },
         "expireAt" : (Date.now() + parseInt(req.body.expireAt)),
         "content" : req.body.content
       }

     };
      var userFound = false;
      
      // api will accept the id of the user instead of the username,
      // find the user by their username and change the value to its
      // corresponding id.
      userArr.forEach(function(value) {
        if(value.handle == message.message.channel.receiver){
          message.message.channel.receiver = value._id;
          userFound = true;
        }
      });
    
      if(userFound){
        request
          .post('http://prattle.bdfoster.com/api/v1/messages')
          .type("json")
          .set('Authorization', 'JWT '+token)
          .send(message)
          .end(function (error, resp){
            if(error){
              if(error.status == '422'){
                res.render ('sendMessage.pug', {users: userArr, error_message: "The request didn't contain all necessary information"});
              }
              else if(error.status == '401'){
                res.render ('sendMessage.pug', {users: userArr, error_message: "The request didn't contain a valid JWT Header."});
              }
            }
            else{
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

UserController.prototype.viewMessage = function () {
   return function (req, res) {
     request
         .get("http://prattle.bdfoster.com/api/v1/channels?members="+userInfo._id)
         .type("json")
         .set('Authorization', 'JWT '+token)
         .end(function (error, resp){
           if(error){
             message.content = "You have no messages";
             console.log(error);
             res.render ('viewMessages.pug', {messages: channels});
           }
           else{
             getMessagesFromChannels(resp.body.channels, res);
           }
         });
   };
};
function getMessagesFromChannels(channels, res){
  var messages = {};
  var count = 0;
  // api returns a list of channels, we do not want to render view unless all messages have been read by messages
  for (let channel of channels) {
   request
     .get("http://prattle.bdfoster.com/api/v1/messages?channel="+channel._id)
     .type("json")
     .set('Authorization', 'JWT '+token)
     .end(function (error, resp){
        if(error){
          message.content = "You have no messages";
          console.log(error);
          return res.render ('viewMessages.pug', {messages: messages})
        }
        else{
          // store each message received by backend
          messages[channel._id] = resp.body.messages;
          if (++count == channels.length) {
             return res.render ('viewMessages.pug', {messages: messages})
          }
        }
    });
  }
};
