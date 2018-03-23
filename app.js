require('dotenv').config() 
const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

const model = require('./model');
const API = 'kmsmvb3ab2guzyrn9srj7xq7';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post('/zip', (req, res) => {
  let zipCode = '';

  if (req.body.zip_code) {
    const zip = req.body.zip_code;

    zipCode = `&zip=${zip}`;
  }

  const url = `http://data.tmsapi.com/v1.1/movies/showings?startDate=2018-03-22${zipCode}&api_key=${API}`;
  const list = request(url, (err, response, body)=> {
    if (err) throw err;

    const data = JSON.parse(body);
    const build = [];
    const obj = {};

    for (let i = 0; i < data.length; i += 1) {
      const rootId = data[i].rootId;

      obj[rootId] = data[i].title;
      build.push(obj);
    }

    res.send(build);
  });
});

app.get('/movie/:rootId', (req, res) => {
  let rootId = '';

  if (req.params.rootId) {
    const Id = req.params.rootId;

    rootId = Id;
  } else {
    throw new Error('No Movie Id');
  }

  let modelData;

  model.getMovieData(rootId, (res) => {
    modelData = res;
  });

  //
  // Get zip code from front end cookie/cache
  // 
  const zipCode = '&zip=33331';
  const url = `http://data.tmsapi.com/v1.1/movies/showings?startDate=2018-03-22${zipCode}&api_key=${API}`;
  const list = request(url, (err, response, body)=> {
    if (err) throw err;
    
    const data = JSON.parse(body);
    const build = [];

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].rootId === rootId) {
        data[i].stats = modelData;

        build.push(data[i]);
      }
    }

    res.send(build);
  });
});

app.get('/', (req, res) =>{
  console.log(req.body);
})

app.post('/meter', (req, res) => {
  console.log(req.body);
});

app.post('/category', (req, res) => {

});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  
  // console.log(list);
  // let results = JSON.parse(list.getBody('utf8'));
});