const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const validateTodo = require("../utils/validateTodo");

// GET: Retrieve all TODOs
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });

        res.status(200).json(todos);

    } catch (error) {
        console.error("Get TODOs error:", error);

        res.status(500).json({
            message: "Failed to retrieve TODOs"
        });
    }
};

// POST: Create a new TODO
const createTodo = async (req, res) => {
    try {
        const validation = validateTodo(req.body);

        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors
            });
        }

        const { title, description } = req.body;

        const todo = await Todo.create({
            title: title.trim(),
            description: description?.trim() || ""
        });

        res.status(201).json(todo);

    } catch (error) {
        console.error("Create TODO error:", error);

        res.status(500).json({
            message: "Failed to create TODO"
        });
    }
};

// PUT: Update a TODO
const updateTodo = async (req, res) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid TODO ID"
            });
        }

        // Validate request data
        const validation = validateTodo(req.body);

        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors
            });
        }

        const { title, description } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                description: description?.trim() || ""
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "TODO not found"
            });
        }

        res.status(200).json(todo);

    } catch (error) {
        console.error("Update TODO error:", error);

        res.status(500).json({
            message: "Failed to update TODO"
        });
    }
};

// PATCH: Toggle TODO completion status
const toggleTodoDone = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid TODO ID"
            });
        }

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "TODO not found"
            });
        }

        todo.done = !todo.done;

        await todo.save();

        res.status(200).json(todo);

    } catch (error) {
        console.error("Toggle TODO error:", error);

        res.status(500).json({
            message: "Failed to toggle TODO status"
        });
    }
};

// DELETE: Remove a TODO
const deleteTodo = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid TODO ID"
            });
        }

        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "TODO not found"
            });
        }

        res.status(200).json({
            message: "TODO deleted successfully"
        });

    } catch (error) {
        console.error("Delete TODO error:", error);

        res.status(500).json({
            message: "Failed to delete TODO"
        });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodoDone,
    deleteTodo
};
