const bookSchema = require('../models/book').bookModel;


const createBook = async (bookData) => {
    try {

        console.log("bookData:", bookData);
        const result = await bookSchema.findOneAndUpdate(
            {
                "title": bookData.title
            },
            bookData,
            {upsert: true}
        )
        console.log('result of create book ', result.title)
        return result
    } catch (e) {
        console.log("createBook ERROR: ", e.message, bookData.title)
    }
};


const findBookByCategory = async (category, begin, total) => {
    try {
        const result = await bookSchema.find({"category": category}).sort({"title": -1}).skip(begin).limit(total)
        console.log('result of findBookByCategory: ', result.title);
        return result
    } catch (e) {
        console.log("findBookByCategory ERROR: ", e.message)
    }
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