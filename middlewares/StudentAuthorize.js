const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;
  res.locals.user = null;
  if (!token) {
    return res.send(401);
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    res.locals.user = payload;
    if (payload.Role !== 'student') {
      return res.status(401).send({ errorMessage: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.stattus(401).send({ errorMessage: 'Unauthorized' });
  }
};
