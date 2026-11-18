
import { useEffect, useState } from "react";
import { Plus, ListTodo, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";
import type { Todo } from "../types/todo";

import {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
} from "../api/todoApi";

import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
});

const AllTasks = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    // Fetch all tasks
    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            setError("Unable to load tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Create or update task
    const handleSubmit = async (data: {
        title: string;
        description: string;
    }) => {
        try {
            setError("");

            if (editingTodo) {
                const updatedTodo = await updateTodo(editingTodo._id, data);

                setTodos((previousTodos) =>
                    previousTodos.map((todo) =>
                        todo._id === updatedTodo._id ? updatedTodo : todo
                    )
                );

                await Toast.fire({
                    icon: "success",
                    title: "Task updated successfully!",
                });

            } else {
                const newTodo = await createTodo(data);

                setTodos((previousTodos) => [
                    newTodo,
                    ...previousTodos,
                ]);

                await Toast.fire({
                    icon: "success",
                    title: "Task created successfully!",
                });

            }

            setShowForm(false);
            setEditingTodo(null);
        } catch (error) {
            console.error("Failed to save task:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Unable to save task. Please try again.",
                confirmButtonColor: "#2563eb",
            });
        }
    };

    // Toggle task completion
    const handleToggle = async (id: string) => {
        try {
            setError("");

            const updatedTodo = await toggleTodo(id);

            setTodos((previousTodos) =>
                previousTodos.map((todo) =>
                    todo._id === id ? updatedTodo : todo
                )
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
                text: "Unable to update task. Please try again.",
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

            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted successfully.",
                icon: "success",
                confirmButtonColor: "#2563eb",
            });

        } catch (error) {
            console.error("Failed to delete task:", error);

            Swal.fire({
                title: "Error!",
                text: "Unable to delete the task. Please try again.",
                icon: "error",
                confirmButtonColor: "#2563eb",
            });
        }
    };

    // Open edit form
    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setShowForm(true);
    };

    // Open create form
    const handleCreate = () => {
        setEditingTodo(null);
        setShowForm(true);
    };

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        All Tasks
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        View and manage all your tasks in one place.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add New Task
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div
                    role="alert"
                    className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={fetchTodos}
                        className="font-semibold underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Task Form */}
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

            {/* Task List */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ListTodo size={21} className="text-blue-600" />

                        <h3 className="text-lg font-semibold text-slate-800">
                            Task List
                        </h3>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {todos.length}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={fetchTodos}
                        disabled={loading}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
                        aria-label="Refresh tasks"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>

                {loading ? (
                    <div className="py-12 text-center text-sm text-slate-500">
                        Loading tasks...
                    </div>
                ) : todos.length === 0 ? (
                    <div className="py-12 text-center">
                        <ListTodo
                            size={40}
                            className="mx-auto mb-3 text-slate-300"
                        />

                        <h4 className="font-semibold text-slate-700">
                            No tasks yet
                        </h4>

                        <p className="mt-2 text-sm text-slate-500">
                            Create your first task to get started.
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

export default AllTasks;
