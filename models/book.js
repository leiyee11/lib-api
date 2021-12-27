var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    author:{
        type: String,
        required: true
    },
    publisher:{
        type: String,
    },
    pages:{
        type: String,
    },
    image_url:{
        type: String,
    },
    pdf_url:{
        type: String,
        required: true
    },
    create_Date:{
        type: Date,
        default: Date.now
    }
})
var Book = module.exports = mongoose.model('Book', bookSchema)

// //Get Books
// module.exports.getBook = function(callback, limit){
//     Book.find(callback).limit(limit);
// }

// //Get Books by id
// module.exports.getBookById = function(id, callback){
//     Book.findById(id, callback)
// }
