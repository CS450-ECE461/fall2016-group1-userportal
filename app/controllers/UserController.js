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
    res.render ('user.pug', {user: req.user});
  }
};
