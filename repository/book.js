const bookSchema = require('../models/book').bookModel;


const createBook = async (bookData) => {
    console.log("bookData:",bookData);
    return await bookSchema.findOneAndUpdate(
        {
            "title": bookData.title
        },
        bookData,
        {upsert: true}
    )
};


const findBookByCategory = async (category, begin, total) => {
    return await bookSchema.find({"category": category}).sort({"title": -1}).skip(begin).limit(total)
};


const searchBookByDetails = async (details, begin, total) => {
     return await bookSchema.find({$text: {$search: details}}).sort({"title": -1}).skip(begin).limit(total)
};

const returnAllBooks = async (begin, total) => {
    return await bookSchema.find({}).sort({"title": -1}).skip(begin).limit(total)
};


const findBookByTitle = async (details, begin, total) => {
     return await bookSchema.find({$text: {$search: details}}).sort({"title": -1}).skip(begin).limit(total)
};


const findBookById = async (id) => {
     return await bookSchema.findOne({_id: id})
};

const updateBookData = async (data) => {
    return await bookSchema.findOneAndUpdate(
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
    updateBookData,
    returnAllBooks
};