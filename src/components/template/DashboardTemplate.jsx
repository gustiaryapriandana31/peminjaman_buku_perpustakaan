"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardTemplate({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const menuItems = [
        { name: "Dashboard", icon: "fa-solid fa-gauge", href: "/dashboard" },
        { name: "Buku", icon: "fa-solid fa-book", href: "/dashboard/books" },
        { name: "Kategori", icon: "fa-solid fa-tags", href: "/dashboard/categories" },
        { name: "Peminjam", icon: "fa-solid fa-users", href: "/dashboard/borrowers" },
        { name: "Pengaturan", icon: "fa-solid fa-gear", href: "/dashboard/settings" },
    ];

    return (
        <div className="flex min-h-screen text-white bg-gray-900">
        {/* Sidebar */}
        <aside
            className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
            {/* Header Sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-lg font-bold text-sky-400">
                <i className="mr-2 fa-solid fa-library" />
                Library System
            </h1>
            <button className="text-gray-400 lg:hidden" onClick={toggleSidebar}>
                <X className="w-6 h-6" />
            </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
                <a
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium transition-all duration-150 rounded-md hover:bg-sky-700"
                >
                <i className={`${item.icon} w-5 text-sky-400 mr-3 text-base`} />
                {item.name}
                </a>
            ))}
            </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 shadow-md bg-sky-700">
            <div className="flex items-center gap-3">
                <button className="text-white lg:hidden" onClick={toggleSidebar}>
                <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>

            {/* Profil user di kanan */}
            <div className="flex items-center gap-4">
                <i className="text-lg cursor-pointer fa-solid fa-bell hover:text-sky-200"></i>
                <div className="flex items-center gap-2 cursor-pointer hover:text-sky-200">
                <i className="text-2xl fa-solid fa-circle-user"></i>
                <span className="text-sm font-medium">Admin</span>
                </div>
            </div>
            </header>

            {/* Main Area */}
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>

            {/* Footer */}
            <footer className="py-2 text-sm text-center text-gray-400 bg-gray-800">
            © 2025 Library Management System
            </footer>
        </div>
        </div>
    );
}
