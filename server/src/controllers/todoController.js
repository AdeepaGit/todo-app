const Todo = require("../models/Todo");

// GET: Retrieve all TODOs
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve TODOs",
            error: error.message
        });
    }
};

// POST: Create a new TODO
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.create({
            title,
            description
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create TODO",
            error: error.message
        });
    }
};

// PUT: Update a TODO
const updateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description
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
        res.status(400).json({
            message: "Failed to update TODO",
            error: error.message
        });
    }
};

// PATCH: Toggle TODO completion status
const toggleTodoDone = async (req, res) => {
    try {
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
        res.status(400).json({
            message: "Failed to toggle TODO status",
            error: error.message
        });
    }
};

// DELETE: Remove a TODO
const deleteTodo = async (req, res) => {
    try {
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
        res.status(400).json({
            message: "Failed to delete TODO",
            error: error.message
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
