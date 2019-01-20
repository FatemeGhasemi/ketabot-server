const casbin = require('casbin');
const jwt = require('./jwt');

const checkRoleAccess = async (jwtToken, object, act) => {
    try {
        const enforcer = await casbin.newEnforcer('./configs/model.conf', './configs/policy.csv');
        let userName = jwt.verifyJwt(jwtToken).username;
        return enforcer.enforce(userName, object, act)

    } catch (e) {
        console.log("checkRoleAccess ERROR: ", e.message)
    }
};

const getRoles = async (username) => {
    try {
        const enforcer = await casbin.newEnforcer('./configs/model.conf', './configs/policy.csv');
        return enforcer.getRoles(username)
    } catch (e) {
        console.log("getRoles ERROR: ", e.message)
    }

}

module.exports = {checkRoleAccess, getRoles};