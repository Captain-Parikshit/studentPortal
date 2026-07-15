const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"unauthorized",
                success:false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"invalid token",
                success:false
            })
        }
        req.id = decode.UserID;
        next();
    }catch(error){
        console.log(error);
    }
}

module.exports = isAuthenticated;