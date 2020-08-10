const list_helper = require('../utils/list_helper')


let testData = [
	{
	  _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
	},
	{
	  _id: '5aasdf2aa71b54a67sfas3f8',
      title: 'Python',
      author: 'Mike',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
	},
	{
	  _id: '5aasdf2aa71b5sfaljksfas3f8',
      title: 'C++',
      author: 'Mike',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
	},
	{
	  _id: '5a422aa71b54a676sf23d17f8',
      title: 'Machine learning',
      author: 'Reza',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
	},
	{
	  _id: '5a422aa71b54a6762347flji8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
	},
	{
	  _id: '5a422aa71b54a67sfaw4d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
	}

]

describe('dummy', () => {
	test('of an array always returns 1', () => {
		expect(list_helper.dummy([23,2])).toBe(1)})

	test('of an empty array is 1', () => {
		expect(list_helper.dummy([])).toBe(1)})
})


describe('sum', () => {
	test('of testData should be 20', () => {
		expect(list_helper.totalLikes(testData)).toBe(30)
	})
})

describe('favoriteBlog', () => {
	test('of testData should be Python blog', () => {
		expect(list_helper.favoriteBlog(testData)).toEqual(testData[1])
	})
})

describe('mostBlogs', () => {
	test('of testData should be Edsger W.', () => {
		expect(list_helper.mostBlogs(testData)).toEqual({author:'Edsger W. Dijkstra', blogs:3})
	})
})