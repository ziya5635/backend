const express = require('express'),
	peopleController = require('./controllers/peopleController'),
	errorController = require('./controllers/errorController');

const app = express()

app.set('port', process.env.PORT || 3000);
//app.use(express.json());





app.get('/api/people', peopleController.index);
app.get('/api/people/:id', peopleController.show, errorController.not_found);
app.get('/info', peopleController.info);
app.delete('/api/people/:id', peopleController.delete);

app.listen(app.get('port'), () => {
	console.log(`App is running on port ${app.get('port')}`);
});