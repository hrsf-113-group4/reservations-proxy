const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

const overview = axios.create({
  baseURL: 'http://ec2-18-220-248-250.us-east-2.compute.amazonaws.com/'
});

const comp3002 = axios.create({
  baseURL: 'http://ec2-18-144-51-121.us-west-1.compute.amazonaws.com/'
});

const menu = axios.create({
  baseURL: 'http://ec2-13-52-98-101.us-west-1.compute.amazonaws.com/'
});

const reviews = axios.create({
  baseURL: 'http://ec2-54-161-76-60.compute-1.amazonaws.com/'
});

app.get('/api/restaurants/:id/reviews', (req, res) => {
  reviews.get(`api/restaurants/${req.params.id}/reviews`)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (error) => {
      res.send(error);
    })
});

app.get('/api/restaurants/:id/filters', (req, res) => {
  reviews.get(`api/restaurants/${req.params.id}/filters`)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (error) => {
      res.send(error);
    })
});

app.get('/menu/:id', (req, res) => {
  menu.get(`menu/${req.params.id}`)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (error) => {
      res.send(error);
    })
})

app.use('/api/restaurant/:id', (req, res) => {
  overview.get(`api/restaurant/${req.params.id}`)
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
