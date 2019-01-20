const sendSms = require('../services/kave-negar');


const sendOtpMessage = async (cellphone,message) => {
    await sendSms.send(cellphone,message,process.env.KAVE_NEGAR_SENDER_PHONE)
};

const isOtpValid = async (otp, cellphone)=> {
    return await redisAdapter.getFromRedis(cellphone)

}

const generateOtp = async (payload, expireTimeSecond) => {
    const otp = getRandomFourDigitNumber();
    const redisKey = payload.cellphone;
    await redisAdapter.setInRedis(redisKey, payload, expireTimeSecond)
    return otp;
}


function getRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

module.exports = {
    sendOtpMessage,
    generateOtp,
    isOtpValid
}