const mongoose = require('mongoose'),
	{Schema} = mongoose;
const uniqueValidator = require('mongoose-unique-validator');


let personSchema = new Schema({
	name: {
		type: String,
		unique: true,
		minlength: 3
	},
	number: {
		type: Number,
		min: 10000000
	}
	
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

personSchema.plugin(uniqueValidator);

personSchema.statics.checkNumberValidity = function(num){
	if (num < 10000000 || !Number(num)) {
		return false;
	}return true;
}


module.exports = mongoose.model('Person', personSchema);