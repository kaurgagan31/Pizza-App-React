const { connectDB } = require('../core/db');

const connect = async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    return res.status(500).json({message: 'Failed to connect to db.'})
  }
}

module.exports = connect;
