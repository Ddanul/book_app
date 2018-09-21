// (engine) add user input validation for search form;

const pg = require('pg');
const validator = require('validator');
const superagent = require('superagent');
var createError = require('http-errors');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', handleConnectionError);

//helper functions
function getBooks(req, res) {
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
}

function getDetails(req, res, next) {
  let SQL = 'select * from books where id = $1';
  let values = [req.params.id];
  client
    .query(SQL, values)
    .then(data => {
      if (data.rows.length !== 0) {
        res.render('pages/books/show', { book: data.rows[0], added: req.query.added});
      } else {
        next(createError(500, 'No data in DB'));
      }
    })
    .catch(err => {
      console.error(err);
      createError(500, 'DB Read Error');
    });
}

function handleError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { code: err.status, message: err.message });
}

function handleConnectionError(error) {
  console.error(error);
  createError(error.status, 'DB Connection Error');
}

function handle404(req, res, next) {
  next(createError(404));
}

function newBookForm(req, res) {
  res.render('pages/books/new');
}

function addBookToDb(req, res, next) {
  let SQL =
    'insert into books (title, author, isbn, description, image_url) values($1, $2, $3, $4, $5) returning id;';
  let validationResult =
    validator.isAscii(req.body.title) &&
    validator.isAscii(req.body.author) &&
    validator.isURL(req.body.image_url) &&
    validator.isISBN(req.body.isbn);
  if (!validationResult) next(createError(400, 'Input malformed'));
  else {
    let descriptionSanitized = validator.escape(req.body.description);
    let values = [
      req.body.title,
      req.body.author,
      req.body.isbn,
      descriptionSanitized,
      req.body.image_url
    ];
    client
      .query(SQL, values)
      .then(data => {
        res.redirect(`/book/${data.rows[0].id}?added=true`)
      })
      .catch(err => {
        console.log(err);
        next(createError(500, 'Error while saving to DB'))});
  }
}

function searchBookForm(req, res, next) {
  res.render('pages/searches/new');
}

function searchForBooksExternalApi(req, res, next) {
  let searchTerm = req.query.q;
  if (req.query.inauthor === 'on') {
    searchTerm = `inauthor:${req.query.q}`;
  } else if (req.query.intitle === 'on') {
    searchTerm = `intitle:${req.query.q}`;
  }
  let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
  console.log(url);
  superagent
    .get(url)
    .end((err, data) => {
      // res.send(data.body.items);
      let results = data.body.items.map(item => {
        let author = item.volumeInfo.authors ? item.volumeInfo.authors[0] : '';
        let image_url = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '';
        return {
          title: item.volumeInfo.title,
          author,
          isbn: item.volumeInfo.industryIdentifiers[0].identifier,
          image_url,
          description: item.volumeInfo.description
        };
      });
      res.render('pages/searches/show', { results: results });
    });
}

module.exports = {
  getBooks,
  getDetails,
  handleError,
  handleConnectionError,
  handle404,
  addBookToDb,
  newBookForm,
  searchBookForm,
  searchForBooksExternalApi
};
