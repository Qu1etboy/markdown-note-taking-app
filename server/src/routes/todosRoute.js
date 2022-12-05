const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

router.get("/:userId", getTodo);
router.post("/:userId", createTodo);
router.delete("/:userId/:todoId", deleteTodo);
router.patch("/:userId/:todoId", updateTodo);

module.exports = router;
