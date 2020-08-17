const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')

const api = supertest(app)


initialData = [
	{
		username: 'Reza',
		password: 'rey5635',
		name: 'reza'
	},
	{
		username: 'Anssi',
		password: 'aldkjf23',
		name: 'Anssi Teroi'
	},
	{
		username: 'Mikko',
		password: 'kjkas282',
		name: 'Mikko Lehtevara'
	}


]

beforeEach(async () => {
	logger.info('inserting new data to db.')
	try {
		await User.deleteMany({})
		const users = await User.create(initialData)
		if (users) {
			logger.info('inital data added to db successfully.')
		} else {
			logger.error('Oops, an error occured while adding initialData to db.')
		}
	} catch(err) {
		logger.error(err.message);
	}
})

describe('testing with inital data', () => {
	test('all users returned in json', async() => {
		const allUsers = await api.get('/api/users')
		logger.info(allUsers.body)
		await api.get('/api/users')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	})
})

describe('testing with data that has invalid password and username', () => {
	
	test('return 400 code when using too short username', async() => {
		const newUser = {username: 'ks', password: '23kjsdf', name: 'Juha'}
		await api.post('/api/users')
		.send(newUser)
		.expect(400)
	})

	test('return 400 code when using too short password', async() => {
		const newUser = {username: 'Rose', password: 'R3', name: 'Rose Rautianen'}
		await api.post('/api/users')
		.send(newUser)
		.expect(400)
	})

	test('return validation error when username is not provided', async() => {
		const newUser = {name: 'Jack', password: 'sldkfj2381'}
		await api.post('/api/users')
		.send(newUser)
		.expect(400)
	})

	test('return validation error when password in not provided', async () => {
		const newUser = {name: 'Sina', username:'sina5635'}
		await api.post('/api/users')
		.send(newUser)
		.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})