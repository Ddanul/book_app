'use strict';

var createError = require('http-errors');
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
  createError(error.status, 'DB Connection Error');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.get('/', (req, res) => res.redirect('/books'));

//grabbing and returning all book objects from database
app.get('/books', (req, res) => {
  client
    .query('SELECT * FROM books;')
    .then(data => {
      client.query('select count(*) from books;').then(cntVal => {
        res.render('index', { count: cntVal.rows[0].count, books: data.rows });
      });
    })
    .catch(err => {
      console.error(err);
      createError(500, 'DB Read Error');
    });
});

app.get('/book/:id', (req, res) => {
  let SQL = 'select * from books where id = $1';
  let values = [req.params.id];
  client
    .query(SQL, values)
    .then(data => res.render('pages/show', { book: data.rows[0] }))
    .catch(err => {
      console.error(err);
      createError(500, 'DB Read Error');
    });
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { code: err.status, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
