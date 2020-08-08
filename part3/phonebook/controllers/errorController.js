module.exports = {
	report: (error, req, res, next) => {
		
		if (error.name === 'CastError') {
			return res.status(400).send({ error: 'malformatted id' });

		}else if (error.name === 'ValidationError') {
			res.status(400).json(error.message);
			
		}else if (error.name === 'MongoError' && error.code === 11000) {
			res.status(422).send(error.message);

		}else if (error.name === 'RangeError') {
			res.status(400).json(error.message);
		}
		else {
			console.log(error.message);
			next(error);
		}
	}
};