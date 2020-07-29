const express = require('express'),
	noteController = require('./controllers/peopleController'),
	errorController = require('./controllers/errorController');

const app = express()

app.set('port', process.env.PORT || 3000);
//app.use(express.json());





app.get('/api/people', noteController.index);
app.get('/api/people/:id', noteController.show, errorController.not_found);
app.get('/info', noteController.info);

app.listen(app.get('port'), () => {
	console.log(`App is running on port ${app.get('port')}`);
});