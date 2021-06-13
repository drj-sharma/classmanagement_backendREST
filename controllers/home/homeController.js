const classes = require('../../db_models/classModel');

const getClasses = async (req, res) => {
  try {
    const data = await classes.find();
    for (let i = 0; i < data.length; i += 1) {
      classes.findById(data[i]._id).populate('teacherID', 'username').then((data1) => {
        data[i] = (data1);
      });
    }
    return res.status(200).send({ data });
  } catch (err) {
    res.status = 404;
    res.send('Something went wrong, try again after some time!');
  }
};

module.exports.getClasses = getClasses;
