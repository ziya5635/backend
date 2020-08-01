const express = require('express'),
	peopleController = require('./controllers/peopleController'),
	errorController = require('./controllers/errorController'),
	morgan = require('morgan');

const app = express()

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));





app.get('/api/people', peopleController.index);
app.get('/api/people/:id', peopleController.show, errorController.not_found);
app.get('/info', peopleController.info);
app.delete('/api/people/:id', peopleController.delete);
app.post('/api/people', peopleController.create);

app.listen(app.get('port'), () => {
	console.log(`App is running on port ${app.get('port')}`);
});