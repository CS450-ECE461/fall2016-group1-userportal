var passport = require ('passport')
;
module.exports = exports = {
  '/login': {
    get  : { view : 'login.pug'},
    post : {action: 'LoginController@completeLogin'},
  },
  '/register': {
    get  : { view : 'register.pug'},
    post : { action: 'RegisterController@completeSignUp'}
  },
  '/dashboard' : {
    get  : { view : 'dashboard.pug' }
  }
};
