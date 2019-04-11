const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

const overview = axios.create({
  baseURL: 'http://localhost:3001'
});

const comp3002 = axios.create({
  baseURL: 'http://localhost:3002'
});

const comp3003 = axios.create({
  baseURL: 'http://localhost:3003'
});

const reviews = axios.create({
  baseURL: 'http://localhost:3004'
});

app.use('/api/restaurant/:id', (req, res) => {
  overview.get(`api/restaurant/${req.params.id}`)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (error) => {
      res.send(error);
    })
});

app.use('/api/restaurant/:id/reviews', (req, res) => {
  reviews.get(`api/restaurant/${req.params.id}/reviews`)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (error) => {
      res.send(error);
    })
});

app.use('/api/restaurant/:id/filters', (req, res) => {
  reviews.get(`api/restaurant/${req.params.id}/filters`)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (error) => {
      res.send(error);
    })
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
