import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js";

export const register = async (req, res, next) => {
    const saltRounds = 10;
    if (req.body.password === undefined) req.body.password = "0000";
    let hashed = await bcrypt.hash(req.body.password, saltRounds);    
    try { 
        const newUser = new User({
            userID: req.body.userID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashed,
            accountNumber: req.body.accountNumber,
            accountBalance: req.body.accountBalance,
            isAdmin: req.body.isAdmin,
            email: req.body.email
        });  

        const savedUser = await newUser.save();

        const newTransaction = new Transaction({
            date: new Date().toLocaleDateString(),
            recieverName: req.body.firstName,
            accountNumber: req.body.accountNumber,
            amount: req.body.accountBalance,
            transactionType: "Deposit",
            status: "Completed"
        });
        try {
            const savedTransaction = await newTransaction.save()
            await User.findByIdAndUpdate(savedUser._id, {$push: {transactions: savedTransaction._id}});
        } catch (error) {
            next(error);
        }  
        
        // res.status(200).json(savedUser);
        res.status(200).send("User created successfully");
    } catch (error) {
        next(error);
    }
   
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({userID: req.body.userID})
        if(!user) return next(createError(404, "User not found !"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong Password !"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const { password,  ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {httpOnly: true})
          .status(200)
          .json({details:{...otherDetails}})
    } catch (error) {
        next(error)
    }
};