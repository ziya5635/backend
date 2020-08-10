const _ = require('lodash')


const dummy = blogs => 1

const likes = blogs => {
	res = []
	blogs.forEach(blog => {res.push(blog.likes)})
	return res
}

const totalLikes = blogs => {
	const reducer = (sum, item) => sum + item
	return likes(blogs).reduce(reducer, 0)
}

const favoriteBlog = blogs => {
	let max = 0
	let index = 0
	blogs.forEach((blog, i) => {
		if (blog.likes > max) {
			index = i
			max = blog.likes
		}
	})
	return blogs[index]
}

const mostBlogs = blogs => {
	const authors = []
	blogs.forEach(blog => {authors.push(blog.author)})
	const authors_frequency = _.countBy(authors)
	const name = Object.keys(authors_frequency).reduce((a, b) => authors_frequency[a] > authors_frequency[b] ? a : b)
	return	{author: name, blogs:authors_frequency[name]}
}

const mostLikes = blogs => {
	const selected = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
	return {author: selected.author, likes: selected.likes}
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}