'use strict';

var blueprint = require ('@onehilltech/blueprint')
  ;

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
    var jwt = req.token;
    console.log("Hello my token is: "+ req.token);
    res.render ('dashboard.pug', {users: req.token});
  }
};
