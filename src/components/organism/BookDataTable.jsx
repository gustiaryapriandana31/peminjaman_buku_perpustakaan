"use client";

import { useState, useEffect } from "react";
import React from "react";
import Button from "../atoms/Button";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert/sweetAlert";
import BookModalBox from "./BookModalBox";
import ModalBox from "../template/ModalBox";

export default function BookDataTable() {
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [mode, setMode] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState([]);

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const fetchBooks = async () => {
        try {
            const res = await fetch("/api/books", {
                method: "GET",
                headers: { "Accept": "application/json" },
            });
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.error("Gagal memuat data buku:", error);
        }
    }
    
    useEffect(() => {
        fetchBooks();
    }, []);

    const deleteBook = async (id) => {
        try {
            const res = await fetch(`/api/books/${id}`, {
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

    async function handleBookView(id) {
        try {
            const res = await fetch(`/api/books/${id}`);
            const data = await res.json()
            setSelectedBook(data);
            setMode("view");
            setShowModal(true);
        } catch(error) {
            console.error("Gagal Mengambil Detail Data Buku", e);   
            await alertError(data.error || "Gagal mengambil data buku.");
        }
    }
    
    async function handleBookEdit(id) {
        try {
            const res = await fetch(`/api/books/${id}`);
            const data = await res.json()
            setSelectedBook(data);
            setMode("edit");
            setShowModal(true);
        } catch(error) {
            console.error("Gagal Mengambil Data Buku untuk Diedit", e);   
            await alertError(data.error || "Gagal mengambil data buku untuk diedit.");
        }
    }

    async function handleBookDelete(id) {
        if (!await alertConfirm("Ingin hapus data buku ini?")) return;

        const { res, data } = await deleteBook(id);
        if (res.ok) {
            await alertSuccess("Data Buku berhasil dihapus!");
            fetchBooks();
        } else {
            await alertError(data.error || "Gagal menghapus data buku.");
        }
    }

    return (
        <>
            <Button type="button" onClick={() => {
                setMode("create")
                setSelectedBook(null)
                setShowModal(true)
            }} 
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <i className="mr-2 fas fa-plus" /> Tambah Data Buku
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
                                Kategori Buku
                            </th>
                            <th className="px-3 py-2 text-xs text-left text-gray-500 uppercase sm:text-sm">
                                Judul Buku 
                            </th>
                            <th className="hidden px-3 py-2 text-xs text-center text-gray-500 uppercase md:table-cell sm:text-sm">
                                Penulis
                            </th>
                            <th className="hidden px-3 py-2 text-xs text-left text-gray-500 uppercase md:table-cell sm:text-sm">
                                Penerbit
                            </th>
                            <th className="hidden px-3 py-2 text-xs text-left text-gray-500 uppercase md:table-cell sm:text-sm">
                                Nomor ISBN
                            </th>
                            <th className="px-3 py-2 text-xs text-left text-gray-500 uppercase sm:text-sm">
                                Aksi
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.map((book, index) => (
                            <React.Fragment key={book.id}>
                                <tr
                                className="transition cursor-pointer hover:bg-gray-50 md:cursor-default"
                                onClick={() => toggleRow(book.id)}
                                >
                                <td className="px-3 py-2 text-sm sm:text-base">{index + 1}</td>
                                    <td className="px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm">
                                        {book.idKategori}
                                    </td>
                                    <td className="px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm">
                                        {book.judulBuku}
                                    </td>
                                    <td className="hidden px-3 py-2 text-sm text-gray-500 md:table-cell">
                                        {book.penulis}
                                    </td>
                                    <td className="hidden px-3 py-2 text-sm text-gray-500 md:table-cell">
                                        {book.penerbit}
                                    </td>
                                    <td className="hidden px-3 py-2 text-sm text-gray-500 md:table-cell">
                                        {book.noisbn}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-start">
                                            <Button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookView(book.id)
                                                }} 
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition rounded-lg bg-sky-500 sm:text-sm hover:bg-sky-600">
                                                <i className="mr-2 fas fa-trash-alt" /> Lihat
                                            </Button>
                                            <Button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookEdit(book.id)
                                                }} 
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition bg-orange-400 rounded-lg sm:text-sm hover:bg-orange-500">
                                                <i className="mr-2 fas fa-trash-alt" /> Ubah
                                            </Button>
                                            <Button type="button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookDelete(book.id)
                                                }} 
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition bg-red-500 rounded-lg sm:text-sm hover:bg-red-600">
                                                <i className="mr-2 fas fa-trash-alt" /> Hapus
                                            </Button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Collapsible row for mobile */}
                                {expandedRows.includes(book.id) && (
                                <tr className="transition md:hidden bg-gray-50">
                                    <td colSpan={5} className="px-3 py-2 text-sm text-gray-700">
                                        <div className="flex flex-col gap-1">
                                            <div>
                                            <strong>Jumlah Halaman Buku:</strong> {book.jumlahHalaman}
                                            </div>
                                            <div>
                                            <strong>Tanggal Data Dimasukkan:</strong> {book.createdAt}
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
                        <BookModalBox
                            title={
                                mode === "create"
                                    ? "Tambah Data Buku"
                                    : mode === "edit"
                                    ? "Edit Data Buku"
                                    : "Lihat Data Buku"
                            }
                            mode={mode}
                            selectedBook={selectedBook}
                            onSuccess={() => {
                                fetchBooks();
                                setShowModal(false);
                            }}
                        />
                    </ModalBox>
                )} 
            </div>
        </>
    );
}
