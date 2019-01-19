const jwt = require('jsonwebtoken');


const jwtGenerator = ({payload}) => {
    return jwt.sign(
        {
            ...payload,
            algorithm: process.env.JWT_ALGORITHM
        },
        process.env.JWT_SECRET
    );
};

const verifyJwt = (jwt_token) => {
    try {
        return jwt.verify(jwt_token, process.env.JWT_SECRET);
    } catch (e) {
        console.log("verifyJwt ERROR: ", e.message)
    }
}


const removeBearer = (jwt_token) => {
    return jwt_token.split(' ')[1]

};

module.exports = {
    jwtGenerator,
    verifyJwt,
    removeBearer
};