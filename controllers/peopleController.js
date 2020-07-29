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
	}
}