var blueprint = require ('@onehilltech/blueprint')
      request =  require ('superagent')
  ;

function RegisterController () {
  blueprint.BaseController.call (this);
}

blueprint.controller (RegisterController);


RegisterController.prototype.completeSignUp = function () {
  return function (req, res) {
     var user = {
       "firstName" : req.body.firstName,
       "middleName" : req.body.middleName,
       "lastName" : req.body.lastName,
       "emailAddress" :  req.body.emailAddress,
       "password" : req.body.password,
        "handle" : req.body.username,
    };
    var regExp = /^[a-zA-Z]+$/;
    request
        .post('localhost:5000/api/v1/users')
        .send({ user: user})
        .end(function (error, resp){
            if(req.body.firstName.search(regExp) == -1 || req.body.middleName.search(regExp) == -1 || req.body.lastName.search(regExp) == -1){
                res.render('register.pug', {error_message: 'First/middle/last name should contain letters only'});
              }
              if(error){
                if(error.status == '422'){
                   res.render('register.pug', {error_message: 'Username and or email have been used already.'});
                }
                else if(error.status == '409') {
                  res.render('register.pug', {error_message: 'Email has already been used.'});
                }
                else{
                  res.render('register.pug', {error_message: 'Something went wrong, try again.'});
                }
              }else{
                return  res.redirect('/login');
              }

        });
  };

};

module.exports = RegisterController;
