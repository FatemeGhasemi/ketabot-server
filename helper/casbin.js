const casbin = require('casbin');
const jwt = require('./jwt');

const checkRoleAccess = async (jwtToken, object, act) => {
    try {
        const enforcer = await casbin.newEnforcer('./config/model.conf', './config/policy.csv');
        let userName = jwt.verifyJwt(jwtToken).username;
        return enforcer.enforce(userName, object, act)
    } catch (e) {
        console.log(e.message)
    }
};

const getRoles = async (username) => {
    try {
        const enforcer = await casbin.newEnforcer('./config/model.conf', './config/policy.csv');
        return enforcer.getRoles(username)
    } catch (e) {
        console.log(e.message)
    }

}

module.exports = {checkRoleAccess, getRoles};