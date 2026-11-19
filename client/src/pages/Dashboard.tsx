import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";
import type { Todo } from "../types/todo";
import { Link } from "react-router-dom";
import { getApiErrorMessage } from "../utils/apiError";

import {
    CheckCircle2,
    CircleDot,
    ListTodo,
    TrendingUp,
} from "lucide-react";

const Dashboard = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error("Failed to fetch dashboard tasks:", error);

            setError(
                getApiErrorMessage(
                    error,
                    "Unable to load dashboard statistics."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Calculate statistics
    const totalTasks = todos.length;

    const completedTasks = todos.filter((todo) => todo.done).length;

    const activeTasks = totalTasks - completedTasks;

    const completionRate =
        totalTasks > 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

    //Get latest five tasks
    const recentTasks = [...todos]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                    Dashboard Overview
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Manage your tasks and track your productivity.
                </p>
            </div>
            {error && (
                <div
                    role="alert"
                    className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
                >
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={fetchTodos}
                        disabled={loading}
                        className="font-semibold underline disabled:opacity-50"
                    >
                        Retry
                    </button>
                </div>
            )}
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                            Total Tasks
                        </p>
                        <ListTodo className="text-blue-600" size={22} />
                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-slate-800">
                        {loading ? "..." : totalTasks}
                    </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                            Active Tasks
                        </p>
                        <CircleDot className="text-orange-500" size={22} />
                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-slate-800">
                        {loading ? "..." : activeTasks}
                    </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                            Completed Tasks
                        </p>
                        <CheckCircle2 className="text-green-600" size={22} />
                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-slate-800">
                        {loading ? "..." : completedTasks}
                    </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                            Completion Rate
                        </p>
                        <TrendingUp className="text-purple-600" size={22} />
                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-slate-800">
                        {loading ? "..." : `${completionRate}%`}
                    </h3>
                </div>

            </div>

            {/* Task Completion Progress */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Task Completion Progress
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Track your overall task completion.
                        </p>
                    </div>

                    <span className="text-2xl font-bold text-blue-600">
                        {loading ? "..." : `${completionRate}%`}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all duration-500"
                            style={{
                                width: loading ? "0%" : `${completionRate}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Progress Details */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div>
                        <p className="text-sm text-slate-500">
                            Total Tasks
                        </p>
                        <p className="mt-1 text-xl font-semibold text-slate-800">
                            {loading ? "..." : totalTasks}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Completed
                        </p>
                        <p className="mt-1 text-xl font-semibold text-green-600">
                            {loading ? "..." : completedTasks}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Remaining
                        </p>
                        <p className="mt-1 text-xl font-semibold text-orange-500">
                            {loading ? "..." : activeTasks}
                        </p>
                    </div>

                </div>

            </div>

            {/* Recent Tasks */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                {/* Section Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Recent Tasks
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Your latest task activities.
                        </p>
                    </div>

                    <Link
                        to="/tasks"
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        View All
                    </Link>
                </div>

                {/* Recent Tasks List */}
                {loading ? (
                    <p className="py-8 text-center text-sm text-slate-500">
                        Loading recent tasks...
                    </p>
                ) : recentTasks.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {recentTasks.map((todo) => (
                            <div
                                key={todo._id}
                                className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                            >
                                {/* Task Information */}
                                <div className="min-w-0">
                                    <h4 className={`font-medium ${todo.done
                                        ? "text-slate-400 line-through"
                                        : "text-slate-800"
                                        }`}>
                                        {todo.title}
                                    </h4>

                                    {todo.description && (
                                        <p className="mt-1 truncate text-sm text-slate-500">
                                            {todo.description}
                                        </p>
                                    )}

                                    <p className="mt-1 text-xs text-slate-400">
                                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Task Status */}
                                <span
                                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${todo.done
                                        ? "bg-green-50 text-green-700"
                                        : "bg-blue-50 text-blue-700"
                                        }`}
                                >
                                    {todo.done ? "Completed" : "Active"}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-sm font-medium text-slate-600">
                            No tasks available yet.
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Create your first task to see it here.
                        </p>
                    </div>
                )}

            </div>



        </div>
    );
};

export default Dashboard;