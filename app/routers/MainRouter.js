var passport = require ('passport')
;

function userLoggedIn (req,res,next) {
    if (req.isAuthenticated ())
        return next ();
    res.redirect ('/login');
}

module.exports = exports = {
  '/login': {
    get  : { view : 'login.pug'},
    post : {
      before: [passport.authenticate('local', {failureRedirect:'/login'})],
      action: 'LoginController@completeLogin'},
  },
  '/register': {
    get  : { view : 'register.pug'},
    post : { action: 'RegisterController@completeSignUp'}
  },
  '/dashboard' : {
    use : userLoggedIn,
    get  : { view : 'dashboard.pug' },
    post : { action: 'RegisterController@completeSignUp'}
  },
  '/signout' : {
    get  : {  action: 'UserController@signout'}
  },
  '/' :{
    get : { view : 'login.pug' }
  },
  '/images/User_picture' :{
    get : { view : 'app/images/User_picture.svg'}
  }
};
