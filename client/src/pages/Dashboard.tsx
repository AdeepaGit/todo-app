import {
    CheckCircle2,
    CircleDot,
    ListTodo,
    TrendingUp,
} from "lucide-react";

const Dashboard = () => {
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
                        0
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
                        0
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
                        0
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
                        0%
                    </h3>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;