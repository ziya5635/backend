const Person = require('../models/Person');
const db = require('./dbController');

const checkNull = obj => {
	if (obj.name && obj.number) {
		return true
	}return false
}

module.exports = {
	index: (req, res, next) => {
		Person.find({})
			.then(people => {
				res.json(people);
			})
			.catch(err => {
				next(err);
			});
	},

	info: (req, res, next) => {
		const date = new Date();
		Person.find({})
			.then(people => {
				res.send(`<p>Phonebook has info for ${people.length} people.</p><p>${date.toUTCString()}</p>`);
			})
			.catch(err => {
				next(err);
			});
		
	},
	show: (req, res, next) => {
		const id = req.params.id;
		Person.findById(id)
			.then(person => {
				if (person) {
					res.json(person);
				} else {
					res.status(404).send('resource not found.');
				}
			
			})
			.catch(err => {
				next(err);
			});
	},
	delete: (req, res, next) => {
		const id = req.params.id;
		Person.findByIdAndDelete(id)
			.then(person => {
				console.log(`${person.name} deleted.`);
				if (person) {
					res.status(204).send(`${person.name} deleted successfully.`);
				} else {
					res.status(404).send('resource not found.');
				}
				})
			.catch(err => {
				next(err);
			});
	},
	create: (req, res, next) => {
		const data = req.body;
		if (!checkNull(data)) {
			res.status('406').send('Name and number required.');
		}
		Person.create(data)
			.then(response => {res.json(response)})
				.catch(err => {next(err)});

	},
	update: (req, res, next) => {
		const id = req.params.id;
		const data = req.body;
		Person.findByIdAndUpdate(id, data, {new: true})
			.then(response => {
				if (response) {
					res.json(response);
				} else {
					res.status('404').send('resource not found.');
				}
			})
			.catch(err => {
				next(err);
			});
	}
}