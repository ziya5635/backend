const express = require('express');
const noteController = require('./controllers/peopleController');

const app = express()

app.set('port', process.env.PORT || 3000);
//app.use(express.json());





app.get('/api/people', noteController.index);


app.listen(app.get('port'), () => {
	console.log(`App is running on port ${app.get('port')}`);
});