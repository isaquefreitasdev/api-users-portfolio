// auth.js
const jwt = require("jsonwebtoken");

const verifyLogin = (req,res,next)=>{
    const header = req.header('authorization-token');
    if(!header){
        return res.status(403).json({msg:"Logue para acessar"})
    }
    next()
}
const verifyToken = (req,res,next)=>{
    const header = req.header('authorization-token');

    try {
        const tokenVerified = jwt.verify(header,process.env.SECRET)
        req.user = tokenVerified
        next();
    } catch (error) {
        res.status(401).json({error});
    }
}
module.exports = { verifyLogin,verifyToken };
