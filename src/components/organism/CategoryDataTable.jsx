"use client";

import { useState, useEffect } from "react";
import React from "react";
import Button from "../atoms/Button";
import ModalBox from "../template/ModalBox";
import { alertConfirm, alertError, alertSuccess, alertWarning } from "../../lib/alert/sweetAlert";
import CategoryModalBox from "./CategoryModalBox";

export default function CategoryDataTable() {
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mode, setMode] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories", {
                method: "GET",
                headers: { "Accept": "application/json" },
            });
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Gagal memuat kategori:", error);
        }
    }
    
    useEffect(() => {
        fetchCategories();
    }, []);

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
        } catch(error) {
            console.error("Gagal Menghapus Data", error);   
            return { res: { status: 500 }, data: { errors: ["Terjadi kesalahan"] } };
        } 
    };

    async function handleCategoryEdit(id) {
        try {
            const res = await fetch(`/api/categories/${id}`);
            const data = await res.json()
            setSelectedCategory(data);
            setMode("edit");
            setShowModal(true);
        } catch(error) {
            console.error("Gagal Mengambil Data Kategori untuk Diedit", error);   
            await alertError(error.error || "Gagal mengambil data kategori untuk diedit.");
        }
    }

    async function handleCategoryDelete(category) {
        // 🔹 1️⃣ Cek dulu apakah kategori masih punya buku
        if (category._count?.buku > 0) {
            await alertWarning(
                `Kategori "${category.namaKategori}" tidak dapat dihapus karena masih memiliki ${category._count.buku} buku.`
            );
            return;
        }

        // 🔹 2️⃣ Jika aman (tidak punya buku), tampilkan konfirmasi
        const confirmed = await alertConfirm(
            `Apakah kamu yakin ingin menghapus kategori "${category.namaKategori}"?`
        );

        if (!confirmed) return;

        const {res, data} = await deleteCategory(category.id);
        if (res.ok) {
            await alertSuccess("Kategori berhasil dihapus!");
            fetchCategories(); // 🔁 Refresh data di parent
        } else {
            await alertError(data.error || "Gagal menghapus kategori.");
        } 
    }

    return (
        <>
            <Button type="button" onClick={() => {
                    setMode("create")
                    setSelectedCategory(null)
                    setShowModal(true)
                }} 
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <i className="mr-2 fas fa-plus" /> Tambah Data Kategori
            </Button>
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
                                onClick={() => toggleRow(category.id)}>
                                    <td className="px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm">
                                        {category.namaKategori}
                                    </td>
                                    <td className="hidden px-3 py-2 text-center md:table-cell">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold text-white bg-orange-400 rounded-full sm:text-sm">
                                        {category._count.buku}
                                        </span>
                                    </td>
                                    <td className="hidden px-3 py-2 text-sm text-gray-500 md:table-cell">
                                        {category.createdAt}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-start">
                                            <Button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCategoryEdit(category.id)
                                                }} 
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition bg-orange-400 rounded-lg sm:text-sm hover:bg-orange-500">
                                                <i className="mr-2 fas fa-trash-alt" /> Ubah
                                            </Button>
                                            <Button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCategoryDelete(category)
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
                                            <strong>Jumlah Buku:</strong> {category._count.buku}
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
                
                {/* Modal: tampil saat lihat atau edit */}
                {showModal && (
                    <ModalBox
                    show={showModal}
                    onClose={() => setShowModal(false)}>
                        <CategoryModalBox
                            title={
                                mode === "create"
                                    ? "Tambah Data Kategori"
                                    : "Edit Data Kategori"
                            
                            }
                            mode={mode}
                            selectedCategory={selectedCategory}
                            onSuccess={() => {
                                fetchCategories();
                                setShowModal(false);
                            }}
                        />
                    </ModalBox>
                )} 
            </div>
        </>
    );
}
