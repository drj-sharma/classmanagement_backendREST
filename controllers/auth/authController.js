const jwt = require('jsonwebtoken');
const User = require('../../db_models/userModel');
const { teacherLoginValidator } = require('../../validations/teacherLoginValidator');
const { teacherSignupValidator } = require('../../validations/teacherSignupValidator');

/**
 * @param {*} req @body (Login Credentials) for teacher
 * @param {*} res ('authorized', 'unauthorized')
 */
const loginTeacherPost = async (req, res) => {
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
    const token = jwt.sign({ _id: user._id, username: user.username, Role: 'teacher' }, process.env.SECRET, { expiresIn: '3 days' });
    // res.locals is used only to save credentials for server side
    // rendering, like if we are using ejs then
    // username can be shown on nav bar
    res.locals.user = {
      _id: user._id,
      username: user.username,
      Role: 'teacher'
    };
    // cookie age 3 days, can't access through the dom access only transferred via http protocol
    res.cookie('accessToken', token, { maxAge: 1000 * 60 * 60 * 72, httpOnly: true });
    res.status = 200;
    return res.send({ result: 'Success' });
  });
};

/**
 * @param {*} req @body Signup Credentials for teacher
 * @param {*} res 'success'/'fail'
 * @returns
 */
const signupTeacherPost = async (req, res) => {
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
  // res.locals is used only to save credentials for server side
  // rendering, like if we are using ejs then
  //  username can be shown on nav bar
  res.locals.user = {
    _id: user._id,
    username: user.username,
    Role: 'teacher'
  };
  user
    .save()
    .then(() => {
      const token = jwt.sign({ _id: user._id, username: user.username, Role: 'teacher' }, process.env.SECRET, { expiresIn: '3 days' });
      res.cookie('accessToken', token, { maxAge: 1000 * 60 * 60 * 72, httpOnly: true });
      res.status(201).send({ result: 'Success' });
    })
    .catch(() => res.status(500).send('Something went wrong!'));
};

/**
 * @param {*} req @body (Login Credentials)  for student
 * @param {*} res ('authorized', 'unauthorized')
 */
const loginStudentPost = async (req, res) => {
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
    const token = jwt.sign({ _id: user._id, username: user.username, Role: 'student' }, process.env.SECRET, { expiresIn: '3 days' });
    // res.locals is used only to save credentials for server side
    // rendering, like if we are using ejs then
    // username can be shown on nav bar
    res.locals.user = {
      username: user.username,
      Role: 'student'
    };
    // cookie age 3 days, can't access through the dom access only transferred via http protocol
    res.cookie('accessToken', token, { maxAge: 1000 * 60 * 60 * 72, httpOnly: true });
    res.status = 200;
    return res.send({ result: 'Success' });
  });
};

/**
 * @param {*} req @body Signup Credentials for student
 * @param {*} res 'success'/'fail'
 * @returns
 */
const signupStudentPost = async (req, res) => {
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
  // res.locals is used only to save credentials for server side
  // rendering, like if we are using ejs then
  // username can be shown on nav bar
  res.locals.user = {
    _id: user._id,
    username: user.username,
    Role: 'student'
  };
  user
    .save()
    .then(() => {
      const token = jwt.sign({ _id: user._id, username: user.username, Role: 'student' }, process.env.SECRET, { expiresIn: '3 days' });
      res.cookie('accessToken', token, { maxAge: 1000 * 60 * 60 * 72, httpOnly: true });
      res.status(201).send({ result: 'Success' });
    })
    .catch(() => res.status(500).send('Something went wrong!'));
};

const logout = (req, res) => {
  res.cookie('accessToken', '', { maxAge: 1 });
  return res.status(200).send({ result: 'Success' });
};

module.exports = {
  loginTeacherPost,
  signupTeacherPost,
  loginStudentPost,
  signupStudentPost,
  logout
};
