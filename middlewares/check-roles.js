
const checkAdmin=(req,res,next)=> {
    let adminToken=req.headers["admin-token"];
    if (process.env.ADMIN_TOKEN===adminToken){
        next()
    }
    else{
        res.status(403).json({"message":"unAuthorize"})
    }
};
module.exports={
    checkAdmin
}