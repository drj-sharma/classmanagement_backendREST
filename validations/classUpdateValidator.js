const JOI = require('joi');

const classUpdateSchema = JOI.object({
  _id: JOI.string()
    .required(),
  className: JOI.string()
    .required(),
  description: JOI.string()
    .required(),
  teacherID: JOI.string()
    .required(),
  studentsID: JOI.array()
    .required(),
  startTime: JOI.date()
    .required(),
  endTime: JOI.date()
    .required(),
  createdAt: JOI.date(),
  updatedAt: JOI.date()
});
const classUpdateValidator = (data) => classUpdateSchema.validate(data);

module.exports.classUpdateValidator = classUpdateValidator;
