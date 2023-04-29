const mongoose = require('mongoose');
const uri = process.env.DB_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connection to MongoDB Atlas established'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err.message));

module.exports = mongoose;


