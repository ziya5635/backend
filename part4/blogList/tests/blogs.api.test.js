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

test(`creating a new blog`, async () => {
	const newBlog = {title: 'javascript', author:'Mikko', url:'someUrl', likes:8}
	try {
		const before = await api.get('/api/blogs')
		await api.post('/api/blogs').send(newBlog)
		const after = await api.get('/api/blogs')
		expect(after.body).toHaveLength(before.body.length+1)
	} catch(e) {
		console.log(e);
	}
})

afterAll(() => {
	mongoose.connection.close()
})