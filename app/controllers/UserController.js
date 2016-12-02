'use strict';

var blueprint = require ('@onehilltech/blueprint')
  ;
var token;
var FName;

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

}

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
            FName = resp.body.firstName;
            console.log(FName);
            res.render ('dashboard.pug', {welcome: 'Welcome '+FName});
          }
        });

  }
};
