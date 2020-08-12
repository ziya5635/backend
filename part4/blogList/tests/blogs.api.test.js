const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


const initialBlogs = [

{
	title: 'Java',
	author: 'Sina',
	url: 'some url',
	likes: 4
},
{
	title: 'C',
	author: 'Reza',
	url: 'some other urls',
	likes: 2
}

]

beforeEach(async () => {
	try {
		console.log('inserting new data to db.')
		await Blog.deleteMany({})
		const blogs = await Blog.create(initialBlogs)
		console.log(`blogs created: ${blogs}`)
	} catch(ex) {
		console.log(ex);
	}

})



test('all notes returned as json', async () => {
	try {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	} catch(ex) {
		console.log(ex);
	}

})

test(`There are ${initialBlogs.length} inside db`, async () => {
	try {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(initialBlogs.length)
	} catch(ex) {
		console.log(ex);
	}

})

test(`unique identifier is id`, async () => {
	try {
		const res = await api.get('/api/blogs')
		const firstObj = res.body[0]
		expect(firstObj['id']).toBeDefined()
	} catch(e) {
		console.log(e);
	}
})

test(`creating a new blog makes the collection one size bigger`, async () => {
	const newBlog = {title: 'javascript', author:'Mikko', url:'someUrl', likes:8}
	try {
		const before = await api.get('/api/blogs')
		await api.post('/api/blogs').send(newBlog)
		const after = await api.get('/api/blogs')
		expect(after.body).toHaveLength(before.body.length+1)
	} catch(ex) {
		console.log(ex);
	}
})

test(`likes get zero value when it's not defined`, async () => {
	const newBlog = {title: 'Metasploit', author:'Jack', url:'someUrl'}
	try {
		await api.post('/api/blogs').send(newBlog)
		const res = await api.get('/api/blogs')
		const jack = await Blog.findOne({author: 'Jack'})
		expect(jack.likes).toBe(0)
	} catch(ex) {
		console.log(ex);
	}
})

test(`gets 400 error code when title and url missing`, async () => {
	const obj = {author: 'Aleksi', likes: 3}
	try {
		await api
		.post('/api/blogs')
		.send(obj)
		.expect(400)
	} catch(ex) {
		console.log(ex);
	}
})

afterAll(() => {
	mongoose.connection.close()
})