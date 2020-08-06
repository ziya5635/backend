const mongoose = require('mongoose'),
	{Schema} = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new Schema({
	name: {type: String, unique: true},
	number: Number
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);