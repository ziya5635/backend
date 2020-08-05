module.exports = {
	report: (error, req, res, next) => {
		console.log(error.message);
		 if (error.name === 'CastError') {
    		return response.status(400).send({ error: 'malformatted id' });
 		 } 
		next(error);
	}
}