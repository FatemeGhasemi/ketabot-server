const casbinHelper = require('../helper/casbin');

const checkAdmin = (req, res, next) => {
    let adminToken = req.headers["admin-token"];
    if (adminToken !== undefined && process.env.ADMIN_CODE === adminToken) {
        next()
    } else {
        res.status(403).json({"message": "unAuthorize"})
    }
};


const checkRolesAccess = async (req,res,next)=>{
    let accessToken = req.headers["access-token"];
    const checkRoleAccess = await casbinHelper.checkRoleAccess(accessToken,req.query.object,req.query.act);
    console.log("checkRoleAccess: ",checkRoleAccess);
    if(checkRoleAccess){
        next()
    }else {
        res.status(403).json({"message": "unAuthorize"})
    }
};

module.exports = {
    checkAdmin,
    checkRolesAccess
};