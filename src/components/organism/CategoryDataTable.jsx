"use client";

import { useState, useEffect } from "react";
import React from "react";
import Button from "../atoms/Button";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert/sweetAlert";

export default function CategoryDataTable({categories = [], onDeleteSuccess}) {
    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const deleteCategory = async (id) => {
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
                headers: { 
                    "Accept": "application/json",
                }
            });
            const data = await res.json(); // ✅ baca respon JSON
            return { res, data };
        } catch(e) {
            console.error("Gagal Menghapus Data", e);   
            return { res: { status: 500 }, data: { errors: ["Terjadi kesalahan"] } };
        } 
    };

    async function handleCategoryDelete(id) {
        if(!await alertConfirm("Ingin hapus data kategori ini? Menghapus kategori ini akan menghapus data buku yang kategorinya ini.")) {
            return;
        } 

        const {res, data} = await deleteCategory(id);
        if (res.ok) {
            await alertSuccess("Kategori berhasil dihapus!");
            onDeleteSuccess?.(); // 🔁 Refresh data di parent
        } else {
            await alertError(data.error || "Gagal menghapus kategori.");
        } 
    }

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
                                        <Button type="button" onClick={(e) => {
                                                e.stopPropagation();
                                                handleCategoryDelete(category.id)
                                            }} 
                                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition bg-red-500 rounded-lg sm:text-sm hover:bg-red-600">
                                            <i className="mr-2 fas fa-trash-alt" /> Hapus
                                        </Button>
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
