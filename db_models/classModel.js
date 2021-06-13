const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  className: {
    type: String,
    trim: true, // value will be trimmed
    min: 4,
    max: 128,
    required: true
  },
  description: {
    type: String,
    trim: true,
    min: 8,
    required: true
  },
  teacherID: {
    type: String,
    required: true,
    ref: 'user'
  },
  studentsID: {
    type: [String],
    default: [],
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('class', classSchema);
