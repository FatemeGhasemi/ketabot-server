const sendSms = require('../services/kave-negar');
const redis = require('../db/redis');
const utils = require('./utils');


const sendOtpMessage = async (phoneNumber, message) => {
    await sendSms.send(phoneNumber, message)
};


const isOtpValid = async (otp, phoneNumber) => {
    return await redis.getFromRedis(phoneNumber);
};


const generateOtp = async (payload, expireTimeSecond) => {
    const otp = utils.getRandomFourDigitNumber();
    const redisKey = payload.phoneNumber;
    await redis.setInRedis(redisKey, payload, expireTimeSecond);
    return otp;
};


const sendOtpHandler = async (payload) => {
    if (payload.phoneNumber) {
        const otpCode = await generateOtp(payload, 15 * 60 * 60);
        await sendOtpMessage(payload.phoneNumber,otpCode)
        return otpCode
    } else {
        console.log("sendOtpHandler ERROR: dont have phoneNumber ");
        return false
    }
};


module.exports = {
    isOtpValid, sendOtpHandler
};