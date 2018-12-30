const userSchema = require('../models/user').userModel;


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

const listUsers = () => {
    return userSchema.find({})
};


module.exports = {
    updateDownloadCount,
    createUser,
    listUsers,
    getDownloadCount
};