const express = require("express");
const {protect} = require("../middleware/auth.middleware.js");
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/auth.controller.js");
const upload = require("../middleware/multer.middleware.js");


const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/getUser",protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req,res) =>{

    console.log('idhar aaya',req.file);
    if(!req.file)
    {
        return res.status(400).json({message: "No file uploaded"});
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
    }`;

    return res.status(200).json({imageUrl});
})

module.exports = router