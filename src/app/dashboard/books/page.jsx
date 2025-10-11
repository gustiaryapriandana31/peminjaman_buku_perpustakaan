"use client";

import { useState, useEffect } from "react";
import DisplayData from "../../../components/template/DisplayData";
import ModalBox from "../../../components/template/ModalBox";
import BookModalBox from "../../../components/organism/BookModalBox";
import BookDataTable from "../../../components/organism/BookDataTable";

export default function BookPage() {
    return (
        <DisplayData title="Manajemen Buku">
            <BookDataTable/>
        </DisplayData>
    );
}
