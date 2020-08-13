const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    if (blogs) {
      response.json(blogs)
    } else {
      response.status(400).end()
    }
  } catch(ex) {
    next(ex)
  }
  
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    if (!request.body.url && !request.body.title) {
        response.status(400).end()
    } else {
      const result = await blog.save()
      response.status(201).json(result)
    }

  } catch(ex) {
      next(ex)
  }

})

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch(ex) {
    next(ex)
  }
})

module.exports = blogsRouter