const express = require('express');
app = express();
const userAdapter = require("../../adapters/user");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require("../../middlewares/check-roles").checkAdmin;


const createNewUser = async (req, res) => {
    try {
        console.log("request body", req.body);
        await userAdapter.createUser(req.body);
        res.json({message: "user created"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const getListOfUsers = async (req, res) => {
    try {
        const result = await userAdapter.listUsers();
        res.json({message: result})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const userDownloadCountIncrement = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        let telegramId = req.body.telegramId;
        await userAdapter.updateDownloadCount(telegramId);
        res.json({message: "download count incremented"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


router.post('/',createNewUser);
router.put('/',checkAdminRole, userDownloadCountIncrement);
router.get('/',checkAdminRole, getListOfUsers);
module.exports = router;

