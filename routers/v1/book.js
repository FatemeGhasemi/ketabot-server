const express = require('express');
app = express();
const book = require("../../repository/book");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require("../../middlewares/check-roles");


const addNewBook = async (req, res) => {
    try {
        await book.createBook(req.body);
        res.json({"message": "book successfully added"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const updateBook = async (req, res) => {
    try {
        const result = await book.updateBookData(req.body);
        res.json({"message": result + " updated"})

    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const searchBookByCategory = async (req, res) => {
    try {
        const beginNum = parseInt(req.query.begin)||0;
        const totalNum = parseInt(req.query.total)||10;
        const category = req.query.category;
        const result = await book.findBookByCategory(category, beginNum, totalNum);
        res.json({"message": "your search result is: " ,books: result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const searchBookById = async (req, res) => {
    try {
        const result = await book.findBookById(req.query._id);
        res.json({message: result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

const searchBookByTitle = async (req, res) => {
    try {
        const result = await book.findBookByTitle(req.query.title);
        res.json({"message": "your search result is: " + result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const searchBookByDetails = async (req, res) => {
    try {
        let beginNum = parseInt(req.query.begin)||0;
        let totalNum = parseInt(req.query.total)||10;
        let details = req.query.details;
        const result = await book.searchBookByDetails(details, beginNum, totalNum);
        res.json({"message": "your search result is: " ,books: result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const returnAllBooks = async (req, res) => {
    try {
        let beginNum = parseInt(req.query.begin)||0;
        let totalNum = parseInt(req.query.total)||10;
        const result = await book.returnAllBooks(beginNum, totalNum);
        res.json({"message": "your search result is: " + result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }

}


const searchBookController = async (req, res) => {
    try {
        console.log(req.query)
        if (req.query._id !== undefined) {
            await searchBookById(req, res)
        }
        if (req.query.category !== undefined) {
            await searchBookByCategory(req, res)
        }
        if (req.query.details !== undefined) {
            const result=await searchBookByDetails(req, res);
            console.log("category result:",result)
        }

        if ( req.query.title !== undefined) {
            await searchBookByTitle(req, res)
        }
        // if (req.query.this === undefined) {
        //     await returnAllBooks(req, res)
        // }

    } catch (e) {
        res.json({'message': e.message});
    }
};


router.post('/', checkAdminRole.checkAdmin,  addNewBook);
router.put('/', checkAdminRole.checkAdmin, updateBook);
router.get('/', searchBookController);
module.exports = router;