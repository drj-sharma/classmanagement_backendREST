/* eslint-disable new-cap */
const studentClasses = require('../../db_models/studentClasses');
/**
 * @param {*} req class body
 */
const getMyClasses = async (req, res) => {
  const { _id } = res.locals.user;
  if (!_id) {
    try {
      const data = await studentClasses.find({ studentId: _id });
      res.status(200).send(data);
    } catch (e) {
      res.status(404);
    }
  } else {
    res.status(401).send({ errorMessage: 'Unauthorized' });
  }
};

const addToMySchedule = async (req, res) => {
  const { _id } = res.locals.user;
  if (!_id) {
    try {
      const { id } = req.body;
      const studentClass = new studentClasses();
      studentClass.studentId = _id;
      studentClass.classId = id;
      await studentClass.save();
      res.status(201).send({ result: 'Success' });
    } catch (e) {
      res.send(404);
    }
  } else {
    res.status(401).send({ errorMessage: 'Unauthorized' });
  }
};

const deleteFromMySchedule = async (req, res) => {
  const { _id } = res.locals.user;
  try {
    const { classid } = req.params;
    const myClass = await studentClasses.findOne({ studentId: _id, classId: classid });
    await myClass.remove();
    res.status(200).send({ result: 'Success' });
  } catch (err) {
    res.status(401).send('Something went wrong!!');
  }
};

module.exports = {
  getMyClasses,
  addToMySchedule,
  deleteFromMySchedule
};
