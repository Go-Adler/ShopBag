import session from 'express-session'

const adminSessionConfig = {
  secret: 'adminSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  name: 'adminSession',
}

export const adminSession = session({
  ...adminSessionConfig,
  name: 'adminSession',
})