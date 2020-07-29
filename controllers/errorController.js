module.exports = {
	not_found: (req, res) => {
		res.status(404).send('Oops, resource not found!');
	}
}