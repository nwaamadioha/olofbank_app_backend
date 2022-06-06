import express from "express";
import { updateUser, updateUserPassword, deleteUser, getUser, getUsers } from "../controllers/users.js"
// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE BY ADMIN
router.put("/:id", updateUser)

//UPDATE PASSWORD BY USER
router.put("/password/:id", updateUserPassword)

//DELETE
router.delete("/:id", deleteUser)

//GET
router.get("/:id",  getUser)

//GET ALL
router.get("/",  getUsers)

export default router;