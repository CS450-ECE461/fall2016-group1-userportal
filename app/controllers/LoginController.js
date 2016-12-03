var blueprint = require ('@onehilltech/blueprint')
      request =  require ('superagent')
  ;

function LoginController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (LoginController);

LoginController.prototype.completeLogin = function () {
  return function (req, res) {
     var newUser = {
        "username" : req.body.username,
        "password" : req.body.password,
      };
      request
          .post('localhost:5000/api/v1/auth/jwt')
          .send(newUser)
          .end(function (err, resp){
            if(err){
              if(err.status == '422')
                res.render('login.pug', {login_error_message: 'Email or password incorrect.'});
              else
                console.log(err);
            }
            else{
              var jwt = resp.body.jwt;
              console.log(jwt);
              return  res.redirect('/dashboard');
            }
          });
  };
};

LoginController.prototype.logout = function () {
  return function (req, res) {
    //req.logout ();
    res.redirect ('/login');
  }
};

module.exports = LoginController;
