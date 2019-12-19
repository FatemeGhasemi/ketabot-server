const express = require('express');
app = express();
const userAdapter = require("../../repositories/user");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require('../../middlewares/check-roles')




const createNewUser = async (req, res) => {
    try {
            const userData = await userAdapter.createUser(req.body);
            res.json({message: userData.username + ' registered successfully'})
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

router.post('/', createNewUser);
router.get('/', checkAdminRole.checkAdmin(), getListOfUsers);
module.exports = router;

