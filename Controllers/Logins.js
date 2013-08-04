//console.log for BETTER UNDERSTANDING WHILE EXECUTING ON LOCAL MACHINE!
var mongoose = require('mongoose'),
Login = mongoose.model('Login'),
utils = require('../lib/utils');



exports.login = function (req, res) {
  req.flash('errors','Invalid username or password');

  res.redirect('/login')
}



exports.signup = function (req, res) {
  res.render('../Views/users/signup.jade', {
    title: 'Sign up',
    login: new Login()
  })

}



exports.logout = function (req, res) {
  req.logout()
  res.redirect('/')
}



exports.session = function (req, res) {
  
  res.redirect('/loggedin')
}


exports.create = function (req, res) {

  var login = new Login(req.body)
console.log("In Logins.create "+req.body);
  login.save(function (err) {
    if (err) {
 	console.log("ERROR!! in create")
      return res.render('../Views/users/signup.jade', {
        errors: utils.errors(err.errors),
        login: login,
        title: 'Sign up'
      })

    }


    req.logIn(login, function(err) {
     if (err) return next(err)
	console.log("Logged in");      
	return res.redirect('/loggedin')
    })
  })
}



exports.show = function (req, res) {
  var login = req.user
  res.render('../Views/users/show.jade', {
    title: login.name,
    login: login
  })
}


exports.user = function (req, res, next, id) {
  Login
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}



