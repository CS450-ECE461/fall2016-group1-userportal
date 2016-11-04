var passport = require ('passport')
;
module.exports = exports = {
  '/home' : {
    get  : { view   : 'home.pug' }
  },
  '/login': {
    get  : { view : 'login.pug'},
    post : {
      before: [passport.authenticate ('local', {failureRedirect: '/login'})],
      action: 'LoginController@completeLogin'
    },
  },
  '/register': {
    get  : { view : 'register.pug'}
  }
};
