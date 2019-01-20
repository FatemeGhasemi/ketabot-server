const jwt = require('./jwt');


const isAppLoginOrBot =(userData)=>{
    let jwtToken;
    if (userData.phoneNumber) {
        jwtToken = jwt.jwtGenerator({
            payload: {
                password: userData.password,
                phoneNumber: userData.phoneNumber,
                userName: userData.username
            }
        })
    } else jwtToken = jwt.jwtGenerator({
        payload: {
            username: userData.username
        }
    });
    return jwtToken

};

module.exports ={isAppLoginOrBot}