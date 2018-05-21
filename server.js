const express = require('express');
const app = express();

var bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.use(express.static('public'));

app.locals.title = 'Photo Keeper';

app.get('/', (request, response) => {

});

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
    .then(photos => {
      response.status(200).json(photos)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/photos', (request, response) => {
  console.log('request', request.body)
  const photos = request.body;

  for (let requiredParameter of ['title', 'photo_url']) {
    if (!photos[requiredParameter]) {
      console.log('here')
      return response
        .status(422)
        .send({
          error: `Expected format: { title: <String>, photo_url: <String>. You are missing a ${requiredParameter} property.`
        })
    }
  }
  database('photos').insert(photos, 'id')
    .then( photo => {
      response.status(201).json({ id: photo[0] })
    })
    .catch( error => {
      response.status(500).json({error})
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
})

module.exports = app;
