const casbinHelper = require('../helpers/casbin');
const jwtHelper = require('../helpers/jwt');


const checkAdmin = (req, res, next) => {
    let adminToken = req.headers["admin-token"];
    if (adminToken !== undefined && process.env.ADMIN_CODE === adminToken) {
        next()
    } else {
        res.status(403).json({"message": "unAuthorize"})
    }
};


const checkRolesAccess = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    const token = jwtHelper.removeBearer(authorizationHeader);
    const act = req.method.toLowerCase();
    const obj = req.baseUrl.split('/')[3];
    const checkRoleAccess = await casbinHelper.checkRoleAccess(token, obj, act);
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