const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    "title": {type: String, index: true},
    "path": {required: true, unique: true, type: String},
    "cost": String,
    "description": {type: String, index: true},
    "publisher": String,
    "author": {type: String, index: true},
    "publishedYear": Number,
    "translator": String,
    "voiceActor": {type: String, index: true},
    "category": String,
    "tags": Array,
    "language": String,
    "downloadCount": Number,
    "type": String,
    "cover": String,
    "parts": {required: true, type: Array},
    "sourceLink": String,
    "isActive": {type: Boolean, default: true}

})


bookSchema.index({title: 1});
bookSchema.index({bookName: 1});
bookSchema.index({
    title: 'text', description: 'text', author: 'text',
    voiceActor: "text", tags: 'text', type: "text"
});

module.exports = {bookModel: mongoose.model('book', bookSchema, 'book')};


