const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentClasses = new Schema({
  studentId: {
    type: String,
    ref: 'user',
    required: true
  },
  classId: {
    type: String,
    ref: 'class',
    required: true
  }
}, {
  timestamps: false,
  versionKey: false
});

module.exports = mongoose.model('studentClass', studentClasses);
