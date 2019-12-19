const userSchema = require('../models/user').userModel;
const jwt = require('../helpers/jwt');


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
    return userSchema.findOneAndUpdate(
        {
            "telegramId": userData.telegramId
        },
        userData,
        {upsert: true}
    )
};


const isUserRegistered = (data) => {
    if (data.phoneNumber) {
        return userSchema.findOne({"phoneNumber": data.phoneNumber, "password":data.password}, data)
    }
    else {
        return userSchema.findOne({"username": data.username}, data)
    }
};


const listUsers = () => {
    return userSchema.find({})
};


module.exports = {
    updateDownloadCount,
    createUser,
    listUsers,
    isUserRegistered,
    getDownloadCount
};