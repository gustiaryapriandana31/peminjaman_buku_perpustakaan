"use client";

import { useState, useEffect } from "react";
import DisplayData from "../../../components/template/DisplayData";
import ModalBox from "../../../components/template/ModalBox";
import CategoryModalBox from "../../../components/organism/CategoryModalBox";
import CategoryDataTable from "../../../components/organism/CategoryDataTable";

export default function CategoryPage() {

    return (
        <DisplayData title="Manajemen Kategori Buku">
            <CategoryDataTable/>
        </DisplayData>
    );
}
