const session = require('express-session');

const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    secure: true, // Set to true if using HTTPS
  },
});

module.exports = sessionMiddleware;
