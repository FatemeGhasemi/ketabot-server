const userSchema = require('../models/user').userModel;
const jwt = require('../helper/jwt');


const updateDownloadCount = (telegramId) => {
    let downloadCount = 0;
    downloadCount++;
    return userSchema.findOneAndUpdate(
        {"telegramId": telegramId},
        {
            $inc: {
                "downloadCount": downloadCount
            }
        })
};


const getDownloadCount = (telegramId) => {
    return userSchema.findOne(
        {"telegramId": telegramId}
    );
};


const createUser = (userData) => {
    if (userData.phoneNumber) {
        jwt.jwtGenerator({password: userData.password, phoneNumber: userData.phoneNumber})
    }
    return userSchema.findOneAndUpdate(
        {
            "telegramId": userData.telegramId
        },
        userData,
        {upsert: true}
    )
};


const login = (jwtToken,{data})=>{
     const info = jwt.verifyJwt(jwtToken)
    if (info.password === data.password && info.phoneNumber ===data.password) {
        return true
    }
    else return false
};


const listUsers = () => {
    return userSchema.find({})
};


module.exports = {
    updateDownloadCount,
    createUser,
    listUsers,
    getDownloadCount
};