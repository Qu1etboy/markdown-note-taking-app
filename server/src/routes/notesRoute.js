const express = require("express");
const router = express.Router();

const {
  createNote,
  getAllNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

router.post("/", createNote);
router.get("/:userId", getAllNote);
router.patch("/:userId/:noteId", updateNote);
router.get("/:userId/:noteId", getNoteById);
router.delete("/:userId/delete", deleteNote);

module.exports = router;
