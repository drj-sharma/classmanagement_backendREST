const JOI = require('joi');

const teacherSignupSchema = JOI.object({
  username: JOI.string()
    .min(3)
    .required(),
  email: JOI.string()
    .email()
    .required(),
  password: JOI.string()
    .min(8)
    .max(128)
    .required()
});
const teacherSignupValidator = (data) => teacherSignupSchema.validate(data);

module.exports.teacherSignupValidator = teacherSignupValidator;
