import mongoose from "mongoose"

const Schema = mongoose.Schema

const transactionSchema = new Schema ({

    date: {
        type: String,
        required: true
    },
    recieverName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "In progress"
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction;