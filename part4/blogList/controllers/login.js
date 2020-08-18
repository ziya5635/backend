const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async(req, res, next) => {
	try {
		const body = req.body
		const user = await User.findOne({username: body.username})
		const password = user === null ? false : await bcrypt.compare(body.password, user.password)
		if (!(user && password)) {
			return res.status(401).send('invalid credintials given, try again.')
		}
		const userForToken = {username: user.username, id: user._id}
		const token = jwt.sign(userForToken, config.SECRET)
		res.status(200).send({token: token, username: user.username, name: user.name})
	} catch(err) {
		console.log(err.message)
		next(err)
	}
})

module.exports = loginRouter