require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const dc = require('./controllers/dogController');
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.get('/api/dogs', dc.favoriteDogs);
app.put('/api/dogs/:id', dc.updateRating);
app.post('/api/dogs', dc.addDog);
app.delete('/api/dogs/:id', dc.deleteDog);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
