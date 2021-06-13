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

const authRoutes = require('./routes/authRoutes');

// db connect and listen for requests
(() => {
  dbConnect(app);
})();
app.use('/auth', authRoutes);
