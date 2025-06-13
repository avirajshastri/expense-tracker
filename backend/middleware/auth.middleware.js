const jwt = require("jsonwebtoken")
const User = require("../models/user.models.js");

exports.protect = async (req,res,next) =>{
    let token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(400).json({message:"Not authorized, Token does not exist"});

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password");

        req.user = user;
        console.log("token verification done");
        next();
    } catch (error) {
        return res.status(400).json({message:"Not authorized, token failure"});
    }
}