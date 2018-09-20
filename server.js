'use strict';

const express = require('express');
const path = require('path');
// const ejs = require('ejs');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const tasks = require('./tasks');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.get('/', (req, res) => res.redirect('/books'));

//grabbing and returning all book objects from database
app.get('/books', tasks.getBooks);
//add new book to DB
app.post('/books', tasks.addBookToDb);
//details for one book
app.get('/book/:id', tasks.getDetails);
//display form
app.get('/new_book', tasks.newBookForm);

app.use(tasks.handle404);

// error handler
app.use(tasks.handleError);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});


