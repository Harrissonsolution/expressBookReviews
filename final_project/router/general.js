Skip to content
Michael-Moulana
/
expressBookReviews

Type / to search

Code
Pull requests
Actions
Projects
Security
Insights
Pane width
Use a value between 14% and 49%

17
Change width
Files
Go to file
t
final_project
router
auth_users.js
booksdb.js
general.js
README.md
index.js
package-lock.json
package.json
.DS_Store
.gitignore
LICENSE
README.md
package-lock.json
Documentation • Share feedback
BreadcrumbsexpressBookReviews/final_project/router
/general.js
Latest commit
Michael-Moulana
Michael-Moulana
small changes
c9af31d
 · 
6 months ago
History
File metadata and controls

Code

Blame
82 lines (71 loc) · 2.36 KB
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function getBooks() {
  return new Promise((resolve, reject) => {
    resolve(books)
  })
}

function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    const isbnNumber = parseInt(isbn)
    if (books[isbnNumber]) {
      resolve(books[isbnNumber])
    } else {
      reject({ status: 404, message: `ISBN '${isbn}' not found` })
    }
  })
}

public_users.post("/register", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password })
      return res.status(200).json({ message: "User successfully registred. Now you can login" })
    } else {
      return res.status(404).json({ message: "User already exists!" })
    }
  }

  return res.status(404).json({ message: "Unable to register user." })
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const books = await getBooks();
    res.send(JSON.stringify(books));
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn
  getBookByISBN(isbn)
    .then(result => res.send(result))
    .catch((error) => res.status(error.status).json({ message: error.message }))
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author
  getBooks()
    .then(rows => Object.values(rows))
    .then(books => books.filter((book) => book.author === author))
    .then(filteredBooks => res.send(filteredBooks))
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title
  getBooks()
    .then(rows => Object.values(rows))
    .then(books => books.filter((book) => book.title === title))
    .then(filteredBooks => res.send(filteredBooks))
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn
  return res.send(JSON.stringify(books[isbn]['reviews'], null, 4))
});

module.exports.general = public_users;
Symbols
Find definitions and references for functions and other symbols in this file by clicking a symbol below or in the code.
Filter symbols
r
func
getBooks
func
getBookByISBN
expressBookReviews/final_project/router/general.js at main · Michael-Moulana/expressBookReviews
