const acl = require('../helper/casbin');

const checkAdmin = (req, res, next) => {
    let adminToken = req.headers["admin-token"];
    if (adminToken !== undefined && process.env.ADMIN_CODE === adminToken) {
        next()
    } else {
        res.status(403).json({"message": "unAuthorize"})
    }
};


const checkRolesAccess = (req,res,next)=>{
    let accessToken = req.headers["access-token"]
    if(acl.checkRoleAccess(accessToken,req.object,req.act)){
        next()
    }else {
        res.status(403).json({"message": "unAuthorize"})
    }
};

module.exports = {
    checkAdmin,
    checkRolesAccess
};