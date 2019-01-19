const jwt = require('jsonwebtoken');



const jwtGenerator = ({ payload }) => {
    const token = jwt.sign(
        {
            ...payload,
            // algorithm:process.env.JWT_ALGORITHM
        },
        process.env.JWT_SECRET
    );
    return { token }
};

const verifyJwt = (jwt_token) => {
    try {
        return jwt.verify(jwt_token, process.env.JWT_SECRET);

    } catch (e) {
        console.log("verifyJwt ERROR: ", e.message)
        return false
    }
}

const decodeJwt = ({ jwt_token }) => {
    return jwt.decode(jwt_token, { complete: true })
};

const startsWithBearer = ({ jwt_token }) => {
    return jwt_token.startsWith(JWT_BEARER)
};

const removeBearer = ({ jwt_token }) => {
    return {
        token: jwt_token.split(' ')[1]
    }
};

module.exports = {
    jwtGenerator,
    verifyJwt,
};