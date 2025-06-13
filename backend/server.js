require("dotenv").config();
const express = require("express")
const cors = require("cors")
const path = require("path");
const connectDB= require("./config/db.js")
const authRoutes = require("./routes/auth.routes.js")
const incomeRoutes = require("./routes/income.routes.js")
const expenseRoutes = require("./routes/expense.routes.js")
const dashBoardRoutes = require("./routes/dashboard.routes.js")

const app = express()


//Middleware for CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json())

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense" ,expenseRoutes);
app.use("/api/v1/dashboard",dashBoardRoutes);

// serve upoads folder

app.use("/uploads", express.static(path.join(__dirname,"uploads")))

const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))