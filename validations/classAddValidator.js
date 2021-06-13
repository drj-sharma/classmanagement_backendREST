const JOI = require('joi');

const classAddSchema = JOI.object({
  className: JOI.string()
    .required(),
  description: JOI.string()
    .required(),
  teacherID: JOI.string()
    .required(),
  startTime: JOI.date()
    .required(),
  endTime: JOI.date()
    .required()
});
const classAddValidator = (data) => classAddSchema.validate(data);

module.exports.classAddValidator = classAddValidator;
