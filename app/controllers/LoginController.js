var blueprint = require ('@onehilltech/blueprint')
      request =  require ('superagent')
  ;

function LoginController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (LoginController);

LoginController.prototype.completeLogin = function () {
  return function (req, res) {
      return res.redirect('/dashboard');
  };
};

LoginController.prototype.logout = function () {
  return function (req, res) {
    res.redirect ('/login');
  }
};

module.exports = LoginController;
