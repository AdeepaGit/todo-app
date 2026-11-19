
import { useState, useEffect } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";
import TodoForm from "../components/TodoForm";
import type { Todo } from "../types/todo";
import { getApiErrorMessage } from "../utils/apiError";

import {
    getTodos,
    updateTodo,
    toggleTodo,
    deleteTodo,
} from "../api/todoApi";

import TodoItem from "../components/TodoItem";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
});

const CompletedTasks = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    // Fetch completed tasks
    const fetchCompletedTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTodos();
            setTodos(data.filter((todo) => todo.done));
        } catch (error) {
            console.error("Failed to fetch completed tasks:", error);

            setError(
                getApiErrorMessage(
                    error,
                    "Unable to load completed tasks. Please try again."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompletedTasks();
    }, []);

    // Create or update task
    const handleSubmit = async (data: {
        title: string;
        description: string;
    }) => {
        if (!editingTodo) return;

        try {
            const updatedTodo = await updateTodo(editingTodo._id, data);
            setTodos((prevTodos) => prevTodos.map((todo) =>
                (todo._id === editingTodo._id ? updatedTodo : todo)));

            setEditingTodo(null);
            setShowForm(false);

            await Toast.fire({
                icon: "success",
                title: "Task updated successfully!",
            });
        } catch (error) {
            console.error("Failed to update task:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: getApiErrorMessage(
                    error,
                    "Unable to update task. Please try again."
                ),
                confirmButtonColor: "#2563eb",
            });
        }
    };

    // Toggle task completion
    const handleToggle = async (id: string) => {
        try {
            const updatedTodo = await toggleTodo(id);

            // Remove it from completed tasks
            setTodos((previousTodos) =>
                previousTodos.filter((todo) => todo._id !== updatedTodo._id)
            );

            await Toast.fire({
                icon: "success",
                title: "Task marked as active!",
            });
        } catch (error) {
            console.error("Failed to update task status:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: getApiErrorMessage(
                    error,
                    "Unable to update task status. Please try again."
                ),
                confirmButtonColor: "#2563eb",
            });
        }
    };
    // Delete task
    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteTodo(id);

            setTodos((previousTodos) =>
                previousTodos.filter((todo) => todo._id !== id)
            );

            await Toast.fire({
                icon: "success",
                title: "Task deleted successfully!",
            });
        } catch (error) {
            console.error("Failed to delete task:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: getApiErrorMessage(
                    error,
                    "Unable to delete task. Please try again."
                ),
                confirmButtonColor: "#2563eb",
            });
        }
    };
    // Edit task
    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setShowForm(true);
    };

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Completed Tasks
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Review and manage your completed tasks.
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                    <CheckCircle2 size={18} />
                    {todos.length} Completed
                </div>
            </div>
            {/* Reusable Todo Form */}
            {showForm && (
                <TodoForm
                    editingTodo={editingTodo}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTodo(null);
                    }}
                />
            )}
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center gap-2 py-12 text-slate-500">
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Loading completed tasks...</span>
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
                    <p className="text-sm text-red-600">{error}</p>

                    <button
                        type="button"
                        onClick={fetchCompletedTasks}
                        className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Completed Tasks List */}
            {!loading && !error && (
                <div className="space-y-4">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <CheckCircle2
                                size={42}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-slate-700">
                                No completed tasks yet
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Your completed tasks will appear here.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompletedTasks;