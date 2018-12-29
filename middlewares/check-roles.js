
const checkAdmin=(req,res,next)=> {
    let adminToken=req.headers["admin-token"];
    if (adminToken!==undefined && process.env.ADMIN_CODE===adminToken){
        next()
    }
    else{
        res.status(403).json({"message":"unAuthorize"})
    }
};
module.exports={
    checkAdmin
}