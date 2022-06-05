import express from "express";
import { createContact, deleteContact, getContact, getContacts } from "../controllers/contact.js";

const router = express.Router();


router.post("/", createContact);
router.get("/:id", getContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact)



export default router;