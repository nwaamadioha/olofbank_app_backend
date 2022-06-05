import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import transactionsRoute from "./routes/transactions.js"
import contactRoute from "./routes/contact.js"

dotenv.config();
const app = express();

//DATABASE CONNECTION
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error;
    }
};

//MIDDLEWARES
app.use(cors());
app.use(cookieParser())
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/transactions", transactionsRoute)
app.use("/api/contact", contactRoute)


//ERROR HANDLING
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack,
    });
});






app.listen(5000, function(){
    connect();
    console.log("Server started on Port 5000");
})