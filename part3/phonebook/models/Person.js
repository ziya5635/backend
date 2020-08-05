const mongoose = require('mongoose'),
	{Schema} = mongoose;

const personSchema = new Schema({
	name: String,
	number: Number
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Person', personSchema);