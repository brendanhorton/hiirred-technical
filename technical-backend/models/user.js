const mongoose = require('mongoose');

// schema for Users in mongoDB
const userSchema = mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  email: String,
  created_at: String,
  updated_at: String,
});

// when converting toJSON for server I add a updated_at property which is set to the intial creation date
// this property is updated if a user is updated otherwise it will match created_at
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (!returnedObject.updated_at) {
      returnedObject.updated_at = returnedObject.created_at;
    }
    delete returnedObject.id;
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Users', userSchema);
