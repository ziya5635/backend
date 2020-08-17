const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  } catch(ex) {
    next(ex)
  }
  
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const user = await User.findOne({})
    const newBlog = request.body
    newBlog.user = user._id
    const blog = new Blog(newBlog)
    if (!request.body.url && !request.body.title) {
        response.status(400).end()
    } else {
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    }

  } catch(ex) {
      next(ex)
  }

})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const deleted = await Blog.findByIdAndDelete(id)
    if (deleted) {
      res.status(204).end()
    } else {
      res.status(400).end()
    }
    
  } catch(ex) {
    next(ex)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const updated = await Blog.findByIdAndUpdate(id, data, {new: true})
    if (updated) {
      res.status(200).end()
    } else {
      res.status(400).end()
    }
  } catch(ex) {
    console.log(ex);
  }
})

module.exports = blogsRouter