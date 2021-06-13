const JOI = require('joi');

const teacherLoginSchema = JOI.object({
  email: JOI.string()
    .email()
    .required(),
  password: JOI.string()
    .min(8)
    .max(128)
    .required()
});
const teacherLoginValidator = (data) => teacherLoginSchema.validate(data);

module.exports.teacherLoginValidator = teacherLoginValidator;
