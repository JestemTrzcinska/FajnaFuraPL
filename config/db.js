const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
