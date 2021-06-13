const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;
  const payload = jwt.verify(token, process.env.SECRET);
  if (payload) {
    return res.status(404).send({ errorMessage: 'Already Logged In!!' });
  }
  next();
};
