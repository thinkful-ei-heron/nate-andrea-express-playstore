/* eslint-disable strict */
const express = require('express'); 
const morgan = require('morgan');

const app = express(); 

app.use(morgan('common'));

const apps = require('./playstoreData.js');

app.get('/apps', (req, res) => {
  let appData= apps;
  const { sort } = req.query;

  //sort parameter with value rating or app
  if (sort){
    if(!['Rating', 'App'].includes(sort)) {
      return res
        .status(400) 
        .send('Sort must be a rating or app');
    }
  }
  if(sort){
    appData
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }
  else{
    appData = apps;
  }

  if('genre' in req.query) { 
    if(['action','puzzle','strategy','casual','arcade','card'].indexOf(req.query.genre)
    >= 0
    ){
      appData = appData.filter(test => test.Genres.toLowerCase().includes(req.query.genre));
    }
    else {
      res.status(400).json({error: 'genre Invalid'});
    }
  }

  res.json(appData); 
});

app.listen(8000, () => {
  console.log('listening on 8000....');
});

