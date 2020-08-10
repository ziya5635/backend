const dummy = blogs => 1

const likes = blogs => {
	res = []
	blogs.forEach(blog => {res.push(blog.likes)})
	return res
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => sum + item
	return likes(blogs).reduce(reducer, 0)
}



module.exports = {dummy, totalLikes}