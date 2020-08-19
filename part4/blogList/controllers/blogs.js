const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    return response.json(blogs)
  } catch(ex) {
    next(ex)
  }
  
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const token = request.token
    if (!token) {
      return response.status(401).json({error: 'token missing.'})
    }
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid.'})
    }
    const user = await User.findById(decodedToken.id)
    body.user = user._id
    const blog = new Blog(body)
    if (!request.body.url && !request.body.title) {
        return response.status(400).end()
    } else {
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      return response.status(201).json(result)
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
      return res.status(204).end()
    } else {
      return res.status(400).end()
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
      return res.status(200).end()
    } else {
      return res.status(400).end()
    }
  } catch(ex) {
    console.log(ex);
  }
})

module.exports = blogsRouter