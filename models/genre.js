var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_Date:{
        type: Date,
        default: Date.now
    }
})
var Genre = module.exports = mongoose.model('Genre', genreSchema)

//Get Genres
module.exports.getGenre = function(callback, limit){
    Genre.find(callback).limit(limit);
}
//Add Genres
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}

