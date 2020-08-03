const mongoose = require('mongoose');


const password = process.argv[2],
	name = process.argv[3],
	number = process.argv[4];



mongoose.connect(`mongodb+srv://fullstack:${password}@cluster0.0i6mi.mongodb.net/phonebook?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});


const personSchema = mongoose.Schema({name: String, number: Number});
const Person = mongoose.model('Person', personSchema);

const create = (name, number) => {
	Person.create({name: name, number: number})
		.then(res => {
			console.log(`Added ${name} number ${number} to phonebook.`);
			mongoose.connection.close();
		})
		.catch(err => console.log(err.message));

}

if (process.argv.length === 3) {
	Person.find({})
		.then(res => {
			res.map(item => console.log(`${item.name} ${item.number}`));
			mongoose.connection.close();
		})
		.catch(err => console.log(err.message));
} else {
	create(name, number);
}




