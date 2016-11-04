var blueprint = require ('@onehilltech/blueprint')
  , util      = require ('util')
  ;

function HomeController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (HomeController);

HomeController.prototype.echoName = function () {
  var self = this;

  return function (req, res) {
    return res.render ('home.pug', {name: req.body.name});
  };
};

module.exports = exports = HomeController;
