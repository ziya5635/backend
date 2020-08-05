const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,
 	{useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
	.then(res => {console.log('Successfuly connected to MongoDB.')})
	.catch(err => console.log(`failed to connect to MongoDB because ${err.message}`));

mongoose.Promise = global.Promise;

module.exports = mongoose.connection;