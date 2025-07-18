const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.MONGO_URL, {}); 
       console.log("MongoDB connected")
    } catch (error) {
        console.error("Error connecting DB",err)
        process.exit(1)
    }
}

module.exports = connectDB