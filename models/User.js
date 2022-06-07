import mongoose from "mongoose"


const Schema = mongoose.Schema

const userSchema = new Schema ({
    userID: {
        type: Number,
        required: true
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    transactions: {String},
    accountBalance: {
        type: Number,
        required: true
    },
    transactionCount: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model("User", userSchema)
export default User;