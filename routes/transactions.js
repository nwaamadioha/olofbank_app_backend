import express from "express";
import { createTransaction, updateTransaction, deleteTransaction, getTransaction, getTransactions, makeTransfer } from "../controllers/transactions.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE TRANSACTIONS
router.post("/:userid", verifyUser, createTransaction)

//TRANSFER
router.post("/transfer/:userid", makeTransfer)

//UPDATE TRANSACTIONS
router.put("/:id", verifyUser, updateTransaction)

//DELETE TRANSACTIONS
router.delete("/:id/:userid", verifyUser, deleteTransaction)

//GET TRANSACTION
router.get("/:id", getTransaction)

//GET TRANSACTIONS
router.get("/", getTransactions)

export default router;