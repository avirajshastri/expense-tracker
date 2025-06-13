const User = require("../models/user.models.js")

const jwt = require("jsonwebtoken");

//generate token

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: "1h"});
}

//register user

exports.registerUser = async( req, res)=> {

    console.log("request body",req.body);
    const reqBody = req.body || {};
    const {fullName, email, password, profilePic} = reqBody;

    //validate
    if(!fullName || !email || !password){
        return res.status(400).json({message: "Please fill in all fields"})
    }

    try {
        //check if email already exist
        const user = await User.findOne({email});

        // console.log(user);

        if(user)
        {
            return res.status(400).json({message: "User already exist"})
        }

        //create user

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic
        })

        return res.status(201).json({
            id: newUser._id,
            newUser,
            token: generateToken(newUser._id),
        })
    } catch (error) {
        return res.status(500).json({message: "Error registering user"})
    }
}

//login user
exports.loginUser = async (req, res) => {
    const reqBody = req.body;
    const {email,password} = reqBody;

    console.log("login req body",req.body)
    //check if user does not exist

    

    try {
        // console.log(email)
        const user = await User.findOne({email});

        console.log(user);

        if(!user)
        {
            return res.status(400).json({message:"User does not exist"});
        }

        //validate password
        if(!(await user.comparePassword(password))){
            // console.log("wrong password")
            return res.status(400).json({message:"Incorrect password"});
        }
        console.log("password verified")
        return res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
        
    } catch (error) {
        return res.status(500).json({message:"Not able to log in"})
    }
}

//get user
exports.getUserInfo = async (req,res) =>{
    try {
        // console.log(req.user);
        const user = await User.findById(req.user.id).select("-password");
        console.log(user);
        if(!user)
        {
            return res.status(400).json({message:"User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:"Not able to get user info"});
    }
}