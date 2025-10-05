import express from "express";
import { createANote, deleteNote, getAllNotes, updateNote, getNoteWithId } from "../controllers/notesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNoteWithId);
router.post("/", auth, createANote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);



export default router;