'use strict';

const pg = require('pg');
const express = require('express');
const path = require('path');
// const ejs = require('ejs');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', error => {
  console.error(error);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));
app.get('/', (req, res) => {
  res.render('index', { title: 'Danul and Alex Book App' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
