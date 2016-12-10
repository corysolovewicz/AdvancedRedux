

export function signinUser({ email, password}) {
	//returning a function, istead of an object with action type,
	// because we are utilizing react-thunk
	return function() {
	// Submit email/password to the server

	// If request is good....
	// - Update state to indicate user is authenticated
	// - Save the JWT token
	// - redirect to the route / feature

	// If request is bad...
	// - Show an error to the user
	}
	
}