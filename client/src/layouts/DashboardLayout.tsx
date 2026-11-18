import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Header */}
                <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

                    <div>
                        <h1 className="text-xl font-bold text-slate-800">
                            Task Management
                        </h1>

                        <p className="text-sm text-slate-500">
                            Organize your work and stay productive.
                        </p>
                    </div>

                    <div className="flex items-center gap-5">

                        <button
                            type="button"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                            aria-label="Notifications"
                        >
                            <Bell size={21} />
                        </button>

                        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                TF
                            </div>

                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-slate-700">
                                    TaskFlow User
                                </p>

                                <p className="text-xs text-slate-400">
                                    Administrator
                                </p>
                            </div>
                        </div>

                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;