const Person = require('../models/Person');
const db = require('./dbController');

//const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const checkNull = obj => {
	if (obj.name && obj.number) {
		return true
	}return false
}
//const checkRepetition = (name, phonebook) => phonebook.filter(person => person.name === name);

module.exports = {
	index: (req, res) => {
		Person.find({})
			.then(people => {
				res.json(people);
			})
				.catch(err => console.log(err.message));
	},

	info: (req, res) => {
		const date = new Date();
		Person.find({})
			.then(people => {
				res.send(`<p>Phonebook has info for ${people.length} people.</p><p>${date.toUTCString()}</p>`);
			})
				.catch(err => {console.log(err.message)});
		
	},
	show: (req, res) => {
		const id = req.params.id;
		Person.findById(id)
			.then(person => {res.json(person)})
				.catch(err => {res.status(404).send('resource not found.')});
	},
	delete: (req, res) => {
		const id = req.params.id;
		Person.findByIdAndDelete(id)
			.then(person => {res.status(204).send(`${person.name} deleted successfully.`)})
				.catch(err => console.log(err.message));
	},
	create: (req, res) => {
		const data = req.body;
		const newPerson = {name:data.name, number: data.number};
		if (!checkNull(data)) {
			res.status('406').send('Name and number required.');
		}
		Person.findOne({name: data.name})
			.then(response => {
				if (!response) {
					Person.create(newPerson)
						.then(item => {res.json(item)})
							.catch(err => {console.log(err.message)})
				} else {
					res.status('406').send('Name must be unique.');
				}
			})
			.catch(err => {console.log(err.message)});

	},
	update: (req, res) => {
		const id = req.params.id;
		const data = req.body;
		Person.findByIdAndUpdate(id, data)
			.then(response => res.json(response))
				.catch(err => {console.log(err.message)});
	}
}