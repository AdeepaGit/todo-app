
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    ListTodo,
    CircleDot,
    CheckCircle2,
    ClipboardList,
    Menu,
    X,
} from "lucide-react";

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: LayoutDashboard,
        },
        {
            name: "All Tasks",
            path: "/tasks",
            icon: ListTodo,
        },
        {
            name: "Active Tasks",
            path: "/tasks/active",
            icon: CircleDot,
        },
        {
            name: "Completed Tasks",
            path: "/tasks/completed",
            icon: CheckCircle2,
        },
    ];

    const renderNavigation = () => (
        <nav className="space-y-2">
            {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === "/"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`
                        }
                    >
                        <Icon size={19} />
                        <span>{item.name}</span>
                    </NavLink>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Mobile Navigation */}
            <div className="relative z-20 w-full border-b border-slate-200 bg-white px-4 py-3 md:hidden">

                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-600 p-2 text-white">
                            <ClipboardList size={22} />
                        </div>

                        <h1 className="text-xl font-bold tracking-tight text-slate-800">
                            TaskFlow
                        </h1>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        aria-label={
                            isMobileMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>

                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        id="mobile-navigation"
                        className="mt-4 border-t border-slate-100 pt-4"
                    >
                        <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400">
                            MENU
                        </p>

                        {renderNavigation()}
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 md:sticky md:top-0 md:flex">

                {/* Logo */}
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="rounded-xl bg-blue-600 p-2 text-white">
                        <ClipboardList size={24} />
                    </div>

                    <h1 className="text-xl font-bold tracking-tight text-slate-800">
                        TaskFlow
                    </h1>
                </div>

                {/* Navigation */}
                <div className="flex-1">
                    <p className="mb-4 px-3 text-xs font-semibold tracking-wider text-slate-400">
                        MENU
                    </p>

                    {renderNavigation()}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-700">
                        TaskFlow
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        Task Management System
                    </p>
                </div>

            </aside>
        </>
    );
};

export default Sidebar;
