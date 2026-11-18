
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const TodoRoutes = require("./routes/Routes");

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.use("/api/todos", TodoRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "TODO API is running"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
