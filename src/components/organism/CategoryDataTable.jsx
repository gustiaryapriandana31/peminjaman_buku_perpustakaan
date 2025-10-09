"use client";

import { useState, useEffect } from "react";
import React from "react";

export default function CategoryDataTable({categories, setCategories}) {
    const [expandedRows, setExpandedRows] = useState([]);

    const getCategories = async () => {
        try {
            const res = await fetch("/api/categories", {
                method: "GET",
                headers: { "Accept": "application/json" },
            });
            const data = await res.json();
            setCategories(data);
        } catch(e) {
            console.error("Failed to fetch categories", e);   
        } 
    };
    
    useEffect(() => {
        getCategories();
    }, []);

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    return (
        <div className="p-4 bg-white border shadow-lg sm:p-6 rounded-2xl">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-3 py-2 text-xs text-left text-gray-500 uppercase sm:text-sm">
                            No
                        </th>
                        <th className="px-3 py-2 text-xs text-left text-gray-500 uppercase sm:text-sm">
                            Nama Kategori
                        </th>
                        <th className="hidden px-3 py-2 text-xs text-center text-gray-500 uppercase md:table-cell sm:text-sm">
                            Jumlah Bukunya
                        </th>
                        <th className="hidden px-3 py-2 text-xs text-left text-gray-500 uppercase md:table-cell sm:text-sm">
                            Tanggal Dibuat
                        </th>
                        <th className="px-3 py-2 text-xs text-left text-gray-500 uppercase sm:text-sm">
                            Aksi
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category, index) => (
                        <React.Fragment key={category.id}>
                            <tr
                            className="transition cursor-pointer hover:bg-gray-50 md:cursor-default"
                            onClick={() => toggleRow(category.id)}
                            >
                            <td className="px-3 py-2 text-sm sm:text-base">{index + 1}</td>
                                <td className="px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm">
                                    {category.namaKategori}
                                </td>
                                <td className="hidden px-3 py-2 text-center md:table-cell">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-white bg-orange-400 rounded-full sm:text-sm">
                                    {category.count}
                                    </span>
                                </td>
                                <td className="hidden px-3 py-2 text-sm text-gray-500 md:table-cell">
                                    {category.createdAt}
                                </td>
                                <td className="px-3 py-2">
                                    <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-start">
                                    <a
                                        href="#"
                                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition bg-blue-500 rounded-lg sm:text-sm hover:bg-blue-600"
                                    >
                                        <i className="mr-1 fa-solid fa-book"></i> Lihat
                                    </a>
                                    <button
                                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition bg-red-500 rounded-lg sm:text-sm hover:bg-red-600"
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                            confirm(
                                            "Menghapus kategori ini akan menghapus pengetahuannya juga. Yakin?"
                                            )
                                        ) {
                                            // logic hapus
                                        }
                                        }}
                                    >
                                        <i className="mr-1 fa-duotone fa-trash-can"></i> Hapus
                                    </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Collapsible row for mobile */}
                            {expandedRows.includes(category.id) && (
                            <tr className="transition md:hidden bg-gray-50">
                                <td colSpan={5} className="px-3 py-2 text-sm text-gray-700">
                                    <div className="flex flex-col gap-1">
                                        <div>
                                        <strong>Jumlah Pengetahuan:</strong> {category.count}
                                        </div>
                                        <div>
                                        <strong>Tanggal Dibuat:</strong> {category.createdAt}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            )}
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
