

let people = [
	{
		name: 'Reza',
		number: '234232',
		id: 1
	},
	{
		name: 'Sina',
		number: '0932421242',
		id: 2
	},
	{
		name: 'Aleksi',
		number: '234234234',
		id:3
	}

]

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

module.exports = {
	index: (req, res) => {
		res.json(people);
	},

	info: (req, res) => {
		const date = new Date();
		res.send(`<p>Phonebook has info for ${people.length} people.</p>
			<p>${date.toUTCString()}</p>`);
		
	},
	show: (req, res, next) => {
		const id = req.params.id;
		const person = people.find(pr => pr.id == id);
		if (person) {
			res.json(person)
		} else {
			next();
		}
	},
	delete: (req, res) => {
		const id = req.params.id;
		people = people.filter(person => person.id != id);
		res.status(204).send('Item deleted successfully.');
	},
	create: (req, res) => {
		const data = req.body;console.log(data);
		people = people.concat({name:data.name, number: data.number, id: getRandomInt(1000000)});
		res.json(people);
	}
}