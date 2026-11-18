import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";
import type { Todo } from "../types/todo";

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

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error("Failed to fetch dashboard tasks:", error);
                setError("Unable to load dashboard statistics.");
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const totalTasks = todos.length;

    const completedTasks = todos.filter((todo) => todo.done).length;

    const activeTasks = totalTasks - completedTasks;

    const completionRate =
        totalTasks > 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

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
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
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

        </div>
    );
};

export default Dashboard;