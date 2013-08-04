//console.log for BETTER UNDERSTANDING WHILE EXECUTING ON LOCAL MACHINE!
//Module dependencies

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema




//User Schema
var LoginSchema = new Schema({
name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
	hashed_password: { type: String, default: '' },
 salt: { type: String, default: '' }
});


//Virtuals
LoginSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })


//Validations

var validatePresenceOf = function (value) {
  return value && value.length
}

LoginSchema.path('name').validate(function (name) {
	console.log("Checking name");
    return name.length
}, 'Name cannot be blank')

LoginSchema.path('email').validate(function (email) {
  
  return email.length
}, 'Email cannot be blank')



LoginSchema.path('username').validate(function (username) {
 
  return username.length
}, 'Username cannot be blank')



LoginSchema.path('email').validate(function (email, fn) {
  var Login = mongoose.model('Login')
 if (this.isNew || this.isModified('email')) {
   Login.find({ email: email }).exec(function (err, users) {
      fn(err || users.length === 0)
    })
  } else fn(true)
}, 'Email already exists')




LoginSchema.path('hashed_password').validate(function (hashed_password) {
 
  return hashed_password.length
}, 'Password cannot be blank')




//Schema Methods

LoginSchema.methods = {

//authenticate to check passwords

authenticate: function (plainText) {
	console.log("in Login.js: ")
	console.log(plainText+" encrypted to "+this.encryptPassword(plainText));
	console.log("db stored encryption"+this.hashed_password);
    return this.encryptPassword(plainText) === this.hashed_password
  },



 makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },





  encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
	console.log("In encryption of password: "+err);
      return ''
    }
  }



}


mongoose.model('Login', LoginSchema);
