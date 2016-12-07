const jwt = require('jwt-simple');
const User = require('../models/user'); 
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); 
}

exports.signin = function(req, res, next){
	// User has already had their email and password auth'd
	// We just need to give them a token
	console.log('inside exports.signin'); 

	res.send({ token: tokenForUser(req.user) }); 
}; 
 
exports.signup = function(req, res, next) {
	console.log('inside exports.signup'); 
	//res.send({ success: 'true' });
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password '}); 
	}

	// See if a user with the given email exists
	User.findOne({ email: email }, function(err, existingUser) {
		if (err) { return next(err); }

		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({error: 'Email is in use' });
		}

		// If a user with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: password
		});

		// Save record to database
		user.save(function(err) {
			if (err) {	return next(err); }

			// Respond to request indicating the user was created
			
			//res.json(user); //send the entire user response from the database back
			//send back a success
			res.json({ token: tokenForUser(user) }); 
		});

	});

};