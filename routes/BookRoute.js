const express = require('express')
const book = require('../controllers/BookController')
const router = express.Router()

router.post('/books', book.getBook)

module.exports = router