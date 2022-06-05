import express from "express";
import { updateUser, updateUserPassword, deleteUser, getUser, getUsers } from "../controllers/users.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE BY ADMIN
router.put("/:id", verifyAdmin, updateUser)

//UPDATE PASSWORD BY USER
router.put("/password/:id", verifyUser, updateUserPassword)

//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id",  getUser)

//GET ALL
router.get("/",  getUsers)

export default router;