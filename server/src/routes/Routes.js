const express = require("express");

const {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodoDone,
    deleteTodo
} = require("../controllers/todoController");

const router = express.Router();

// GET all TODOs
router.get("/", getTodos);

// POST a new TODO
router.post("/", createTodo);

// PUT update a TODO
router.put("/:id", updateTodo);

// PATCH toggle TODO completion
router.patch("/:id/done", toggleTodoDone);

// DELETE a TODO
router.delete("/:id", deleteTodo);

module.exports = router;