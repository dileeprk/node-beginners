
var Logins = require('../Controllers/Logins')
   , labs = require('../Controllers/labs')
   , auth = require('./middlewares/authorization')



var labAuth = [auth.requiresLogin, auth.lab.hasAuthorization]

module.exports = function (app, passport) {

app.get('/login', function(req, res){
	
  res.render('../Views/users/login.jade', {
    title: 'Login'
	})
	});

app.get('/faillogin', Logins.login);
app.get('/signup',Logins.signup);
app.get('/logout', Logins.logout)
app.post('/Logins', Logins.create);
app.get('/loggedin', labs.index)
app.post('/Logins/session',
    passport.authenticate('local', {
      failureRedirect: '/faillogin',
      failureFlash: 'Invalid email or password.'
    }), Logins.session)
app.get('/Logins/:userId', Logins.show)
app.get('/', function(req, res){
res.render('../Views/users/welcome.jade');
});
app.param('userId', Logins.user)
app.get('/labs/new', auth.requiresLogin, labs.new)
app.get('/labs', labs.index)
app.post('/labs/search',labs.searchpat)
app.post('/labs', auth.requiresLogin, labs.create)
app.get('/labs/:id', labs.show)
app.get('/labs/:id/edit',  labs.edit)
app.put('/labs/:id', labs.update)
app.del('/labs/:id', auth.lab.hasAuthorization,labs.destroy)
app.param('id', labs.load)
}
