const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true, // value will be trimmed
    min: 6,
    max: 128,
    required: true
  },
  email: {
    type: String,
    trim: true,
    min: 8,
    max: 255,
    required: true, // field is so required
    unique: true // this also enables indexing
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 255,
    required: true
  },
  Role: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.methods.generateHash = async (password) => {
  const hashedKey = await bcrypt.hash(password, 10);
  return hashedKey;
};
userSchema.methods.compareHash = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};
module.exports = mongoose.model('user', userSchema);
