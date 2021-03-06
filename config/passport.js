var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , Login=mongoose.model('Login');



module.exports = function (passport, config) {

 // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  // and then obviously deserialize sessions
  passport.deserializeUser(function(id, done) {
    Login.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
	console.log("In passport.js: Passport local strategy.. "+email+" "+password);
      Login.findOne({ email: email }, function (err, user) {
        if (err) { console.log("err");
			return done(err) }
        if (!user) { console.log("unknown user");
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) { console.log("in passport.js: invalid password: "+password);
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))


}
