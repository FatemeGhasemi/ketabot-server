const Promise = require('bluebird');
const kaveNegar = require('kavenegar');

const kaveNegarPromisifyApi= Promise.promisifyAll(kaveNegar.KavenegarApi({
        apikey: process.env.KAVE_NEGAR_API_KEY
    })
);
const api = kaveNegarPromisifyApi;

const send = async (receptor,message, sender)=> {
    return api.sendAsync({
        message: message,
        sender: sender,
        receptor: receptor
    });
};



module.exports ={
    send
};