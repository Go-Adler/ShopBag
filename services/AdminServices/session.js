const adminSessionConfig = {
  secret: "adminSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false},
  name: "adminSession"
}

module.exports = adminSessionConfig