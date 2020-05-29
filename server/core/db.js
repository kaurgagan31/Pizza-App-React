const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);

let db;

const connectDB = async () => {

  if (db)
    return db

  try {
    db = await mongoose.connect( process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/react-data' : process.env.MONGO_URI )
    console.log('MongoDB is connected.')
    return db
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  connectDB
}