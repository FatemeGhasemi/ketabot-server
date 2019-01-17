const jwt = require('jsonwebtoken');

const jwtGenerator=({data})=> {
    return jwt.sign({data}, process.env.JWT_SECRET)
};


const verifyJwt= (jwtCode)=> {
    return jwt.verify(jwtCode, process.env.JWT_SECRET)
};


module.exports = {
    jwtGenerator,
    verifyJwt,
};