function authenticateUser(req, res, next) {
  if (req.session.userId) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/authentication-login'); // Replace with the actual login page route
  }
}

module.exports = authenticateUser;
