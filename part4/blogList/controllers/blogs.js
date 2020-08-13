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