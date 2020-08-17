const mongoose = require('mongoose')
const Schema = mongoose.Schema



const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: {type:Number, default:0},
  user: {type:Schema.Types.ObjectId, ref:'User'}
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)