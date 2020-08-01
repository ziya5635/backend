const express = require('express'),
	peopleController = require('./controllers/peopleController'),
	errorController = require('./controllers/errorController'),
	morgan = require('morgan');

const app = express()

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('combined'));





app.get('/api/people', peopleController.index);
app.get('/api/people/:id', peopleController.show, errorController.not_found);
app.get('/info', peopleController.info);
app.delete('/api/people/:id', peopleController.delete);
app.post('/api/people', peopleController.create);

app.listen(app.get('port'), () => {
	console.log(`App is running on port ${app.get('port')}`);
});