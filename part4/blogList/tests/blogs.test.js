const list_helper = require('../utils/list_helper')


describe('dummy', () => {
	test('of an array always returns 1', () => {
		expect(list_helper.dummy([23,2])).toBe(1)})

	test('of an empty array is 1', () => {
		expect(list_helper.dummy([])).toBe(1)})
})

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
	  _id: '5a422aa71b54a676sf23d17f8',
      title: 'Machine learning',
      author: 'Reza',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
	},
	{
	  _id: '5aasdf2aa71b54a67sfas3f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Python',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
	}

]


describe('sum', () => {
	test('of testData should be 14', () => {
		expect(list_helper.totalLikes(testData)).toBe(14)
	})
})

describe('favoriteBlog', () => {
	test('of testData should be Python blog', () => {
		expect(list_helper.favoriteBlog(testData)).toEqual(testData[2])
	})
})