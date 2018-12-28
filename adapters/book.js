const bookSchema = require('../db/models/book').bookModel;


const createBook = (bookData) => {
    console.log("bookData:",bookData);
    return bookSchema.findOneAndUpdate(
        {
            "title": bookData.title
        },
        bookData,
        {upsert: true}
    )
};


const findBookByCategory = (category, begin, total) => {
    return bookSchema.find({"category": category}).sort({"title": -1}).skip(begin).limit(total)
};


const searchBookByDetails = (details, begin, total) => {
     return bookSchema.find({$text: {$search: details}}).sort({"title": -1}).skip(begin).limit(total)
};


const findBookByTitle = (details, begin, total) => {
     return bookSchema.find({$text: {$search: details}}).sort({"title": -1}).skip(begin).limit(total)
};


const findBookById = (id) => {
     return bookSchema.findOne({id: id})
};

const updateBookData = (data) => {
    return bookSchema.findOneAndUpdate(
        {
            "title": data.title,
            "bookName": data.bookName,
            "cost": data.cost,
            "description": data.description,
            "publisher": data.publisher,
            "author": data.author,
            "publishedYear": data.publishedYear,
            "translator": data.translator,
            "voiceActor": data.voiceActor,
            "category": data.category,
            "tags": data.tags,
            "language": data.language,
            "type": data.type,
            "cover": data.cover,
            "parts": data.parts,
            "sourceLink": data.sourceLink
        },
        data
    )
};

module.exports = {
    findBookByTitle,
    findBookByCategory,
    createBook,
    findBookById,
    searchBookByDetails,
    updateBookData
};