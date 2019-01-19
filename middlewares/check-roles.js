const casbinHelper = require('../helper/casbin');
const jwtHelper = require('../helper/jwt');


const checkAdmin = (req, res, next) => {
    let adminToken = req.headers["admin-token"];
    if (adminToken !== undefined && process.env.ADMIN_CODE === adminToken) {
        next()
    } else {
        res.status(403).json({"message": "unAuthorize"})
    }
};


const checkRolesAccess = async (req, res, next) => {
    let authorizationHeader = req.header('Authorization');
    console.log("authorizationHeader: ", authorizationHeader);
    const token = jwtHelper.removeBearer(authorizationHeader);
    console.log("token: ", token);
    const act = req.method.toLowerCase();
    const obj = req.baseUrl.split('/')[3];
    const checkRoleAccess = await casbinHelper.checkRoleAccess(token, obj, act);
    console.log("checkRoleAccess: ", checkRoleAccess);
    if (checkRoleAccess) {
        next()
    } else {
        res.status(403).json({"message": "unAuthorize"})
    }
};

module.exports = {
    checkAdmin,
    checkRolesAccess
};