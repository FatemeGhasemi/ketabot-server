const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    "telegramId"        : {type: String, unique: true, require: true},
    "telegramUserName"  : String,
    "firstName"         : String,
    "lastName"          : String,
    "downloadCount"     : {type: Number, default: 0},
    "phoneNumber"       : String,
    "password"          : String

});
module.exports = {
    userModel: mongoose.model('user', userSchema, 'user'),
};