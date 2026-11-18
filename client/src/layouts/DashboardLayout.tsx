
import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Header */}
                <header className="flex min-h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">

                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
                            Task Management
                        </h1>

                        <p className="text-xs text-slate-500 sm:text-sm">
                            Organize your work and stay productive.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 sm:gap-5">

                        <button
                            type="button"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                            aria-label="Notifications"
                        >
                            <Bell size={21} />
                        </button>

                        <div className="flex items-center gap-3 border-l border-slate-200 pl-3 sm:pl-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 sm:h-10 sm:w-10">
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
                <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;
