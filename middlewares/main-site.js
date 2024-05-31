module.exports = async function (req, res, next) {
  // console.log(req.method + ": " + req.url);
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
};