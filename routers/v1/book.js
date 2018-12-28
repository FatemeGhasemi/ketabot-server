const express = require('express');
app = express();
const book = require("../../adapters/book");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require("../../middlewares/check-roles").checkAdmin;


const addNewBook = async (req, res) => {
    try {
        await book.createBook(req.body);
        res.json({"message": "book successfully added"})
    } catch (e) {
        throw e
    }
};


const updateBook = async (req, res) => {
    try {
        const result = await book.updateBookData(req.body);
        res.json({"message": result + " updated"})

    } catch (e) {
        throw e
    }
};


const searchBookByCategory = async (req, res) => {
    try {
        const beginNum = parseInt(req.query.begin);
        const totalNum = parseInt(req.query.total);
        const category = req.query.category;
        const result = await book.findBookByCategory(category, beginNum, totalNum);
        res.json({"message": "your search result is: " + result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const searchBookById = async (req, res) => {
    try {
        const result = await book.findBookById(req.query.id);
        res.json({"message": "your search result is: " + result})
    } catch (e) {
        throw e
    }
};

const searchBookByTitle = async (req, res) => {
    try {
        const result = await book.findBookByTitle(req.query.title);
        res.json({"message": "your search result is: " + result})
    } catch (e) {
        throw e
    }
};


const searchBookByDetails = async (req, res) => {
    try {
        let beginNum = parseInt(req.query.begin);
        let totalNum = parseInt(req.query.total);
        let details = req.query.details;
        const result = await book.searchBookByDetails(details, beginNum, totalNum)
        res.json({"message": "your search result is: " + result})
    } catch (e) {
        throw e
    }
};


const searchBookController = async (req,res) => {
    try {
        if (req.query.id != null || req.query.id !== undefined) {
            await searchBookById(req,res)
        }
        if (req.query.category != null || req.query.category !== undefined) {
            await searchBookByCategory(req,res)
        }
        if (req.query.details != null || req.query.details !== undefined) {
            await searchBookByDetails(req,res);
        if(req.query.title !=null || req.query.title !==null){
            await searchBookByTitle(req,res)
        }
        }
    }catch (e) {
        res.status(500).json({message: e.message});
        throw e
    }
};


router.post('/', checkAdminRole, addNewBook);
router.put('/', checkAdminRole, updateBook);
router.get('/', searchBookController);
module.exports = router;