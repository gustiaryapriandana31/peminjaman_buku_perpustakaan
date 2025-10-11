"use client";

import { useState, useEffect } from "react";
import DisplayData from "../../../components/template/DisplayData";
import ModalBox from "../../../components/template/ModalBox";
import CategoryModalBox from "../../../components/organism/CategoryModalBox";
import CategoryDataTable from "../../../components/organism/CategoryDataTable";

export default function CategoryPage() {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);

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

    return (
        <DisplayData title="Manajemen Kategori Buku">
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Tambah Kategori
            </button>

            <ModalBox
                title="Tambah Kategori Buku"
                show={showModal}
                onClose={() => setShowModal(false)}>
                    <CategoryModalBox
                        onSuccess={() => {
                            fetchCategories();
                            setShowModal(false);
                        }}
                    />  
            </ModalBox>
            <CategoryDataTable categories={categories} onDeleteSuccess={fetchCategories}/>
        </DisplayData>
    );
}
