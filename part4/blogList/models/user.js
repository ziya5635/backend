const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	name: {
		type: String
	},
	password: {
		type: String,
		required: true,
	}
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})

userSchema.plugin(uniqueValidator)

module.exports = new mongoose.model('user', userSchema)