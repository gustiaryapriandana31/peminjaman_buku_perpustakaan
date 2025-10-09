"use client";

import { useState } from "react";
import DisplayData from "../../../components/template/DisplayData";
import CategoryModalBox from "../../../components/organism/CategoryModalBox";
import CategoryDataTable from "../../../components/organism/CategoryDataTable";

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);

    const addCategory = (newCategory) => {
        setCategories(prev => [...prev, newCategory]);
    };

    return (
        <DisplayData title="Manajemen Buku">
            <CategoryModalBox onAddCategory={addCategory} />
            <CategoryDataTable categories={categories} setCategories={setCategories}/>
        </DisplayData>
    );
}
