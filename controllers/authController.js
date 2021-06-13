const jwt = require('jsonwebtoken');
const User = require('../db_models/userModel');
const { teacherLoginValidator } = require('../validations/teacherLoginValidator');
const { teacherSignupValidator } = require('../validations/teacherSignupValidator');

/**
 * @param {*} req @body (Login Credentials)
 * @param {*} res ('authorized', 'unauthorized')
 */
const loginPost = async (req, res) => {
  console.log(req.body);
  const { error } = teacherLoginValidator(req.body);
  let errorMessage;
  if (error) {
    res.statusCode = 401;
    errorMessage = error.details[0].message;
    return res.send({ errorMessage });
  }
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err) {
      console.log('ds');
      res.statusCode = 401;
      return res.send({ errorMessage: 'Unauthorized' });
    }
    console.log(user);
    const isValid = await user.compareHash(password, user.password);
    if (!isValid) {
      return res.status(401).send({ errorMessage: 'Unauthorized' });
    }
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '3 days' });
    res.locals.user = {
      _id: user._id,
      username: user.username
    };
    // cookie age 3 days, can't access through the dom access only transferred via http protocol
    res.cookie('accessToken', token, { maxAge: 1000 * 60 * 60 * 72, httpOnly: true });
    res.status = 200;
    return res.send({ result: 'Success' });
  });
};

/**
 * @param {*} req @body Signup Credentials
 * @param {*} res 'success'/'fail'
 * @returns
 */
const signupPost = async (req, res) => {
  res.locals.user = null;
  const { error } = teacherSignupValidator(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(401).send({ errorMessage });
  }
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists) {
    const errorMessage = 'Email Already Exists!';
    return res.status(403).send({ errorMessage });
  }
  const { username, email, password } = req.body;
  const user = new User();
  user.username = username;
  user.email = email;
  try {
    user.password = await user.generateHash(password);
  } catch (err) {
    res.status(500).send('Something went wrong', err);
  }
  res.locals.user = {
    _id: user._id,
    username: user.username
  };
  user
    .save()
    .then(() => {
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '3 days' });
      res.cookie('accessToken', token, { maxAge: 1000 * 60 * 60 * 72, httpOnly: true });
      res.status(201).send({ result: 'Success' });
    })
    .catch(() => res.status(500).send('Something went wrong!'));
};

module.exports = {
  loginPost,
  signupPost
};
