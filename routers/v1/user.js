const express = require('express');
app = express();
const userAdapter = require("../../repository/user");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require("../../middlewares/check-roles");
const jwt = require('../../helper/jwt');


const createNewUser = async (req, res) => {
    try {
        console.log("request body", req.body);
        const userData = await userAdapter.createUser(req.body);
        let jwtToken;
        if (userData.phoneNumber) {
            jwtToken = jwt.jwtGenerator({
                payload: {
                    password: userData.password,
                    phoneNumber: userData.phoneNumber,
                    userName: userData.username
                }
            })
        } else jwtToken = jwt.jwtGenerator({
            payload: {
                username: userData.username
            }
        });
        console.log(userData.username, ": ", jwtToken);

        res.json({ message: 'success', tokenType: 'Bearer', accessToken: jwtToken })
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


router.post('/', createNewUser);
// router.post('/',checkAdminRole.checkAdmin,createNewUser);
router.put('/', checkAdminRole.checkAdmin, userDownloadCountIncrement);
router.get('/', checkAdminRole.checkRolesAccess, getListOfUsers);
module.exports = router;

