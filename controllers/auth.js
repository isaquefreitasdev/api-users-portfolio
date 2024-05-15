const jwt = require("jsonwebtoken")

const verifiyLogin = (req,res,next)=>{
    const token = req.header("authorization-token");
    if(!token){
        return res.status(401).json({
            error:"Logue para acessar"
        })
    }
   try {
    const veriftoken = jwt.verify(token,process.env.SECRET)
    req.user = veriftoken
   } catch (error) {
    return res.status(401).json({
        error:"Token Invalido"
    })
   }
}


module.exports = {verifiyLogin}