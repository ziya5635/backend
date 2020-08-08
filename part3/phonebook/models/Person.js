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
	if (num < 10000000) {
		return false;
	}return true;
}


/*https://mongoosejs.com/docs/middleware.html#notes

personSchema.pre('', async function(next){console.log('hey');
	const docToUpdate = await this.model.findOne(this.getQuery());
	if (docToUpdate < 10000000) {
		throw mongoose.Error.ValidationError();
	}else {
		next();
	}
})

schema.pre('findOneAndUpdate', async function() {
  const docToUpdate = await this.model.findOne(this.getQuery());
  console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
});*/


module.exports = mongoose.model('Person', personSchema);