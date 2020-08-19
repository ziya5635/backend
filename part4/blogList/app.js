const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')


logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
	.then(res => {logger.info('Successfully connected to MONGODB.')})
	.catch(err => {logger.error(`Failed to connect to MONGODB because ${err.message}`)})


app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
//app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app;