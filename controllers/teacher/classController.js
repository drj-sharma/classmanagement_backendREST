const mongoose = require('mongoose');
const ClassModel = require('../../db_models/classModel');
const { classAddValidator } = require('../../validations/classAddValidator');
const { classUpdateValidator } = require('../../validations/classUpdateValidator');

/**
 * @param {*} req class body
 */
const addClass = async (req, res) => {
  const { error } = classAddValidator(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(422).send({ errorMessage });
  }
  const classDTO = { ...req.body };
  const myClass = new ClassModel();
  myClass._id = mongoose.Types.ObjectId();
  myClass.className = classDTO.className;
  myClass.description = classDTO.description;
  myClass.teacherID = classDTO.teacherID;
  myClass.startTime = classDTO.startTime;
  myClass.endTime = classDTO.endTime;
  myClass
    .save()
    .then(() => {
      res.status(201).send({ result: 'Success' });
    })
    .catch(() => res.status(500).send({ errorMessage: 'Unexpected server error!' }));
};

/**
 * @param {*} req {id} in params
 * @returns class data
 */
const getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ClassModel.findById(id).populate('teacherID', 'username');
    if (!data) {
      return res.status(404).send('Invalid class!!');
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send('Something went wrong!!');
  }
};

/**
 * @param {*} req class data
 * @param {*} res
 * @returns
 */
const editClass = async (req, res) => {
  const data = req.body;
  const { error } = classUpdateValidator(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(422).send({ errorMessage });
  }
  try {
    const { _id } = data;
    const myClass = await ClassModel.findById(_id);
    Object.assign(myClass, data);
    await myClass.save();
    return res.status(200).send({ result: 'Success' });
  } catch (e) {
    res.status(403).send({ errorMessage: 'Unexpected Error' });
  }
};

/**
 * @param {*} req {id} in params
 * @param {*} res statusCode 200/403
 */
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const myClass = await ClassModel.findById(id);
    await myClass.remove();
    res.status(200).send({ result: 'Success' });
  } catch (err) {
    res.status(403).send({ errorMessage: 'Unexpected Error!!' });
  }
};

module.exports = {
  addClass,
  getClass,
  editClass,
  deleteClass
};
