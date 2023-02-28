const noCacheMiddleware = (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
};

module.exports = noCacheMiddleware