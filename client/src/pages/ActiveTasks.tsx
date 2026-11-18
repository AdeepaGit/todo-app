
import { useEffect, useState } from "react";
import { CircleDot, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";
import TodoForm from "../components/TodoForm";
import type { Todo } from "../types/todo";

import {
    getTodos,
    updateTodo,
    toggleTodo,
    deleteTodo,
} from "../api/todoApi";

import TodoItem from "../components/TodoItem";
import { getApiErrorMessage } from "../utils/apiError";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
});

const ActiveTasks = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    // Fetch active tasks
    const fetchActiveTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTodos();

            setTodos(data.filter((todo) => !todo.done));
        } catch (error) {
            console.error("Failed to fetch active tasks:", error);

            setError(
                getApiErrorMessage(
                    error,
                    "Unable to load active tasks. Please try again."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveTasks();
    }, []);

    // Create or update task
    const handleSubmit = async (data: {
        title: string;
        description: string;
    }) => {
        if (!editingTodo) return;

        try {
            setError("");

            const updatedTodo = await updateTodo(editingTodo._id, data);

            setTodos((previousTodos) =>
                previousTodos.map((todo) =>
                    todo._id === updatedTodo._id ? updatedTodo : todo
                )
            );

            setShowForm(false);
            setEditingTodo(null);

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

            setTodos((previousTodos) =>
                previousTodos.filter((todo) => todo._id !== id)
            );

            await Toast.fire({
                icon: "success",
                title: updatedTodo.done
                    ? "Task completed!"
                    : "Task marked as active!",
            });
        } catch (error) {
            console.error("Failed to update task:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: getApiErrorMessage(
                    error,
                    "Unable to update task status."
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
            confirmButtonColor: "#2563eb",
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
                    "Unable to delete task."
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
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Active Tasks
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Focus on the tasks you still need to complete.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                    <CircleDot size={18} />
                    {todos.length} Active Tasks
                </div>
            </div>
            {/* Edit Task Form */}
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

            {/* Error Message */}
            {error && (
                <div
                    role="alert"
                    className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={fetchActiveTasks}
                        className="font-semibold underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Active Task List */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                        Your Active Tasks
                    </h3>

                    <button
                        type="button"
                        onClick={fetchActiveTasks}
                        disabled={loading}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
                        aria-label="Refresh active tasks"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>

                {loading ? (
                    <div className="py-12 text-center text-sm text-slate-500">
                        Loading active tasks...
                    </div>
                ) : todos.length === 0 ? (
                    <div className="py-12 text-center">
                        <CircleDot
                            size={40}
                            className="mx-auto mb-3 text-slate-300"
                        />

                        <h4 className="font-semibold text-slate-700">
                            No active tasks
                        </h4>

                        <p className="mt-2 text-sm text-slate-500">
                            All your tasks are completed. Great work!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveTasks;
