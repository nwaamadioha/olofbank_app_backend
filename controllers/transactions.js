import Transaction from "../models/Transaction.js"
import User from "../models/User.js";

export const createTransaction = async (req, res, next) => {
    const userID = req.params.userid;
    const newTransaction = new Transaction(req.body);

    try {    
        const savedTransaction = await newTransaction.save()
        try {
            await User.findByIdAndUpdate(userID, {$push: {transactions: savedTransaction._id}});
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedTransaction);
    } catch (error) {
        next(error);
    }
}

// For updating a transaction 
export const updateTransaction = async (req, res, next) => {
    const transactionID = req.params.id
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionID, {$set: req.body}, {new: true});
        // res.status(200).json(updatedTransaction);
        res.status(200).send("Transaction Status updated successfully");
    } catch (error) {
        next(error);
    }
}
export const deleteTransaction = async (req, res, next) => {
    const userID = req.params.userid;
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        try {
            await User.findByIdAndUpdate(userID, {$pull: {transactions: req.params.id}});
        } catch (error) {
            next(error);
        }
        res.status(200).send("Transaction successfully deleted")
    } catch (error) {
        next(error);
    }
}

export const getTransaction = async (req, res, next) => {
    const transactionID = req.params.id;
    try {
        const transaction = await Transaction.findById(transactionID);
        res.status(200).json(transaction);
    } catch (error) {
        next(error)
    }
}

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        next(error)
    }
}

export const makeTransfer = async (req, res, next) => {
    const userid = req.params.userid;
    const withdrawalAmount = req.body.amount;

    try {

        const user = await User.findById(userid)

        if(user.transactionCount < 2){
            if(user.accountBalance < withdrawalAmount){
                res.status(400).send("Insufficient Balance")
            }else{
                user.transactionCount = user.transactionCount + 1
                user.accountBalance = user.accountBalance - withdrawalAmount;
                user.save()    
                res.status(200).send("Transaction successfully initiated")
            }

            const newTransaction = new Transaction({
                date: new Date().toLocaleDateString(),
                recieverName: req.body.recieverName,
                accountNumber: req.body.accountNumber,
                amount: req.body.amount,
                transactionType: "Withdrawal",
            })
            try {
                const savedTransaction = await newTransaction.save()
                await User.findByIdAndUpdate(userid, {$push: {transactions: savedTransaction._id}});
            } catch (error) {
                next(error)
            }
        }
        
        else{
            res.status(200).send("This Account has been frozen")
        }

    } catch (error) {
        next(error)
    }
}