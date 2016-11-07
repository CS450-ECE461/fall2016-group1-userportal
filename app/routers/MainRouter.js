var passport = require ('passport')
;
module.exports = exports = {
  '/home' : {
    get  : { view   : 'home.pug' }
  },
  '/login': {
    get  : { view : 'login.pug'},
    post : {
      before: [passport.authenticate ('local', {failureRedirect: '/register'})],
      action: 'LoginController@completeLogin'
    },
  },
  '/register': {
    get  : { view : 'register.pug'},
    post : { action: 'RegisterController@completeSignUp'}
  },
  '/dashboard' : {
    get  : { view : 'dashboard.pug' }
  }
};
