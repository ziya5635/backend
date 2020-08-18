const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const logger = require('../utils/logger')

const api = supertest(app)

const initialUsers = [
	{
		username: 'reza5635',
		name: 'Reza',
		password: 'Reyhan'
	},
	{
		username: 'sina8102',
		name: 'Sina',
		password: 'lasfj23'
	}

]

beforeEach(async () => {
	try {
		await User.deleteMany()
		const promises = initialUsers.map(async user => {
		const result = await api.post('/api/users').send(user)
		return result
	})
		await Promise.all(promises)
	} catch(err) {
		logger(err.message);
	}

})

test('successful login, creates tokens', async () => {
	const user = {username: 'sina8102', password: 'lasfj23'}
	const res = await api.post('/api/login').send(user)
	expect(res.body.token).toBeDefined()
	expect(res.body.username).toBeDefined()
	logger.info(res.body)
})

test('failed login, send 401 error code', async () => {
	const user = {username: 'Miina', password: '23jsd'}
	const res = await api.post('/api/login').send(user)
	expect(401)
	expect(res.body.token).toBeUndefined()
	expect(res.body.username).toBeUndefined()
})

afterAll(async () => {
	await mongoose.connection.close()
})