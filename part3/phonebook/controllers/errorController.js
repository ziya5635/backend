module.exports = {
	report: (error, req, res, next) => {
		
		 if (error.name === 'CastError') {
    		return response.status(400).send({ error: 'malformatted id' });

 		 } else if (error.name === 'ValidationError') {
 		 		res.status(406).send('Name must be unique.');
 		 }
		else {
			next(error);
		}
	}
}