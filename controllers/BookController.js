const Book = require('../models/book')
const env = require('../DB')

exports.getBook = function (req, res) { 
    Book.find(callback).limit(limit);
}