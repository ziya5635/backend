module.exports = {
	not_found: (error, req, res) => {
		res.status(404).send(`Oops, resource not found!`);
	}
}