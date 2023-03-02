const userSessionConfig = {
  secret: "userSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false},
  name: "userSession"
}

module.exports = userSessionConfig