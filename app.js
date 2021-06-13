const express = require('express');
require('dotenv').config();
// const debug = require('debug')('app');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { dbConnect } = require('./config/dbConfig');

const app = express();
app.use(morgan('tiny'));
app.use(cors());

// body-parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

const authRoutes = require('./routes/auth/authRoutes');
const studentRoutes = require('./routes/student/studentRoutes');
const classRoutes = require('./routes/teacher/classRoutes');
const homeRoutes = require('./routes/home/HomeRoutes');

// db connect and listen for requests
(() => {
  dbConnect(app);
})();
app.use('/home', homeRoutes);
app.use('/auth', authRoutes);
app.use('/class', classRoutes);
app.use('/u', studentRoutes);
