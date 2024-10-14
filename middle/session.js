function verifySession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.message = 'Your session has expired. Please log in again.';
    res.redirect('/');
  }
}
module.exports = verifySession;