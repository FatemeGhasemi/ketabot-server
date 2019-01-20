const express = require('express');
app = express();
const userAdapter = require("../../../repositories/user");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const checkAdminRole = require("../../../middlewares/check-roles");
const jwt = require('../../../helpers/jwt');


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

const loginUser = async (req,res)=>{
    try{
        console.log("request body", req.body);
        let userData = await userAdapter.isUserRegistered(req.body)
        if (userData){
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

        }
        else {
            res.status(403).json({message:"user not registered before"})
        }
    }catch (e) {
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

