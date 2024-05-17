// auth.js
const jwt = require("jsonwebtoken");

const verifyLogin = (req,res,next)=>{
    const header = req.header('authorization-token');
    if(!header){
        res.status(403).json({msg:"Logue para acessar"})
    }else{
        try {
            const tokenVerified = jwt.verify(header,process.env.SECRET)
            req.user = tokenVerified
            next();
        } catch (error) {
            res.status(403).json({msg:"Logue novamente"});
        }
    }
}

module.exports = { verifyLogin };
