import session from 'express-session'

const userSessionConfig = {
  secret: 'userSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  name: 'userSession',
}

export const userSession = session({
  ...userSessionConfig,
  name: 'userSession',
})