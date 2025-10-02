import express from "express";
import { createANote, deleteNote, getAllNotes, updateNote, getNoteWithId } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteWithId);
router.post("/", createANote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);



export default router;