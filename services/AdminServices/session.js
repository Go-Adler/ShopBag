const session = require("express-session")

const adminSessionConfig = {
  secret: "adminSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false},
  name: "adminSession"
}

const adminSession = session({ ...adminSessionConfig, name: "adminSession" })

module.exports = { adminSession }