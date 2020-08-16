const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

userRouter.get('/', async (req, res, next) => {
	try {
		const users = await User.find({})
		res.status(200).json(users)
	} catch(err) {
		next(err)
	}
})

userRouter.post('/', async (req, res, next) => {
	try {
		const body = req.body
		if (body.password) {
			if (body.password.length < 3) {
				res.status(400).send('password must be at least 3 charecters.')
			}
			const saltRounds = 10
			const hashedPass = await bcrypt.hash(body.password, saltRounds)
			body.password = hashedPass
		}
		const newUser = await User.create(body)
		res.status(200).json(newUser)
	} catch(err) {
		next(err)
	}
})


module.exports = userRouter