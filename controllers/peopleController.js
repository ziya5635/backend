const people = [
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

module.exports = {
	index: (req, res) => {
		res.json(people);
	},

	info: (req, res) => {
		const date = new Date();
		res.send(`<p>Phonebook has info for ${people.length} people.</p>
			<p>${date.toUTCString()}</p>`);
		
	}
}