exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
}

exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      console.log('You are not authorized')
      return res.redirect('/users/'+req.profile.id)
    }
    next()
  }
}

exports.lab = {
  hasAuthorization : function (req, res, next) {
    if (req.lab.user != req.user.id) {
	console.log("Inside hasAuthorisation"+req.lab.user);
	console.log(req.user.id);
      req.flash('info', 'You are not authorized')
      return res.redirect('/labs/'+req.lab.id)
    }
    next()
  }
}


