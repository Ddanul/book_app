const pg = require('pg');
const validator = require('validator');
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
        res.render('pages/show', { book: data.rows[0] });
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
  res.render('pages/new');
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
    console.log(descriptionSanitized);
    let values = [
      req.body.title,
      req.body.author,
      req.body.isbn,
      descriptionSanitized,
      req.body.image_url
    ];
    console.log(values);
    client
      .query(SQL, values)
      .then(data => res.redirect(`/book/${data.rows[0].id}`))
      .catch(err => next(createError(500, 'Error while saving to DB')));
  }
}

module.exports = {
  getBooks,
  getDetails,
  handleError,
  handleConnectionError,
  handle404,
  addBookToDb,
  newBookForm
};
