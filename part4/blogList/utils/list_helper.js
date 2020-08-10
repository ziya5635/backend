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
		}
	})
	return blogs[index]
}

module.exports = {dummy, totalLikes, favoriteBlog}