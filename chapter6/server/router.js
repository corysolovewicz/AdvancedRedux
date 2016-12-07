const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport'); 

// by default passport wants to make a cookie based session
// since we are using tokens session needs to be false
const requireAuth = passport.authenticate('jwt', { session: false }); 
const requireSignin = passport.authenticate('local', { session: false }); 

module.exports = function (app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ hi: 'there'}); 
	});
	app.post('/signin', requireSignin, Authentication.signin); 
	app.post('/signup', Authentication.signup); 
}; 