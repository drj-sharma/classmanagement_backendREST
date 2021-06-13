const chalk = require('chalk');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;
const dbConnect = (app) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log(chalk.whiteBright.underline('Connected to db!!')))
    .then(() => {
      app.listen(port, () => console.log(`Server listening on port ${chalk.green.italic(port)}`));
    })
    .catch((err) => console.log(err));
};

module.exports.dbConnect = dbConnect;
