const session = require("express-session")

const userSessionConfig = {
  secret: "userSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false},
  name: "userSession"
}

const userSession = session({ ...userSessionConfig, name: "userSession" })

module.exports = { userSession }