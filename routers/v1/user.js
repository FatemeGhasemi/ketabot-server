const express = require('express');
app = express();
const userAdapter = require("../../repositories/user");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require("../../middlewares/check-roles");
const jwtHelper = require('../../helpers/jwt');
const utils = require('../../helpers/utils');
const otpHelper = require('../../helpers/otp');


const getOtp = async (req, res) => {
    try {
        console.log("request body", req.body);
        const otpCode = await otpHelper.sendOtpHandler(req.body);
        res.status(200).json({message: otpCode})
    } catch (e) {
        console.log("getOtp ERROR: ", e.message);
        res.status(500).json({message: e.message})
    }
};


const createNewUser = async (req, res) => {
    try {
        if(req.body.phoneNumber && req.body.otp){
            if(await otpHelper.isOtpValid(req.body.otp, req.body.phoneNumber)){
                const userData = await userAdapter.createUser(req.body);
                res.json({message: userData.username + ' registered successfully'})
            }
            else res.status(403).json({message:"un authorize"})
        }
        else {
            const userData = await userAdapter.createUser(req.body);
            res.json({message: userData.username + ' registered successfully'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};


const loginUser = async (req, res) => {
    try {
        console.log("request body", req.body);
        let userData = await userAdapter.isUserRegistered(req.body)
        const jwtToken = utils.isAppLoginOrBot(userData);
        console.log(userData.username, ": ", jwtToken);
        res.json({message: 'success', tokenType: 'Bearer', accessToken: jwtToken})

    } catch (e) {
        console.log("loginUser ERROR: ", e.message)
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
router.get('/', loginUser);
router.get('/', checkAdminRole.checkRolesAccess, getListOfUsers);
module.exports = router;

