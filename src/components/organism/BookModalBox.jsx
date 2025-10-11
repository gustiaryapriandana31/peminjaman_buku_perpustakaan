import FormField from "../molecules/FormField";
import FormFieldSelect from "../molecules/FormFieldSelect";
import { useState, useEffect } from "react";   
import Button from "../atoms/Button"; 
import { alertError, alertSuccess } from "../../lib/alert/sweetAlert";

export default function BookModalBox({title, onSuccess, selectedBook=null, mode}) {
    const [categories, setCategories] = useState([]);
    const [judulBuku, setJudulBuku] = useState("");
    const [penulis, setPenulis] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [tanggalTerbit, setTanggalTerbit] = useState("");
    const [jumlahHalaman, setJumlahHalaman] = useState(0);
    const [noisbn, setNoIsbn] = useState("");
    const [stokBuku, setStokBuku] = useState(0);
    const [idKategori, setIdKategori] = useState("");

    useEffect(() => {
        if (selectedBook) {
            setJudulBuku(selectedBook.judulBuku || "");
            setPenulis(selectedBook.penulis || "");
            setPenerbit(selectedBook.penerbit || "");
            setTanggalTerbit(selectedBook.tanggalTerbit ? selectedBook.tanggalTerbit.split("T")[0] : "");
            setJumlahHalaman(selectedBook.jumlahHalaman || 0);
            setNoIsbn(selectedBook.noisbn || "");
            setStokBuku(selectedBook.stokBuku || 0);
            setIdKategori(selectedBook.idKategori || "");
        }
    }, [selectedBook]);
    
    const createBook = async (judulBuku, penulis, penerbit, tanggalTerbit, jumlahHalaman, noisbn, stokBuku, idKategori) => {
        try {
            const res = await fetch("/api/books", {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    judulBuku, 
                    penulis, 
                    penerbit,
                    tanggalTerbit, 
                    jumlahHalaman, 
                    noisbn, 
                    stokBuku, 
                    idKategori
                })
            });
            const data = await res.json();
            setJudulBuku("");
            setPenulis("");
            setPenerbit("");
            setTanggalTerbit("");
            setJumlahHalaman("");
            setNoIsbn("");
            setStokBuku("");
            setIdKategori("");
            return {res, data};
        } catch(e) {
            console.error("Gagal Menambahkan Data Buku", e);   
            return { res: { status: 500 }, data: { errors: ["Terjadi kesalahan"] } };
        } 
    };

    const updateBook = async (id, dataBuku) => {
        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "PUT",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataBuku)
            });
            const data = await res.json();
            return { res, data };
        } catch(e) {
            console.error("Gagal Mengupdate Data Buku", e);   
            return { res: { status: 500 }, data: { errors: ["Terjadi kesalahan"] } };
        }
    };
    
    async function handleSubmit(e) {
        e.preventDefault();

        const dataBuku = { judulBuku, penulis, penerbit, tanggalTerbit, jumlahHalaman, noisbn, stokBuku, idKategori };

        let res, data;
        if (mode === "edit" && selectedBook) {
            ({ res, data } = await updateBook(selectedBook.id, dataBuku));
        } else if(mode ==="create") {
            ({ res, data } = await createBook(judulBuku, penulis, penerbit, tanggalTerbit, jumlahHalaman, noisbn, stokBuku, idKategori));
        }

        if (res.ok) {
            await alertSuccess(mode === "edit" ? "Data Buku Berhasil Diperbarui" : "Data Buku Berhasil Ditambahkan");
            if (onSuccess) onSuccess();
        } else {
            await alertError(data.errors || ["Terjadi kesalahan"]);
        }
    }

    
    // Digunakan untuk mengisi data kategori di select box kategori buku
    const getCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch(e) {
            console.error("Failed to fetch categories", e);   
        } 
    };
    
    useEffect(() => {
        getCategories();
    }, []);
    
    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-blue-900 shadow sm:p-6 rounded-xl">
                <h1>{title}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldSelect
                        disabled={mode === "view"}
                        label="Kategori Buku"
                        name="idKategori"
                        id="idKategori"
                        value={idKategori}
                        onChange={(e) => setIdKategori(e.target.value)}
                        icon="fa fa-list">
                        <option className="text-white" value="" disabled>
                            Pilih kategori Buku
                        </option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.namaKategori}
                            </option>
                        ))}
                    </FormFieldSelect>
                    <FormField
                        readOnly={mode === "view"}
                        value={judulBuku}
                        onChange={(e) => setJudulBuku(e.target.value)}
                        type="text"
                        label="Judul Buku"
                        name="judulBuku"
                        id="judulBuku"
                        icon="fa fa-book"
                        placeholder="Masukkan Judul Buku">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        type="text"
                        label="Nama Penulis"
                        name="penulis"
                        id="penulis"
                        icon="fa fa-user"
                        placeholder="Masukkan Nama Penulis">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={penerbit}
                        onChange={(e) => setPenerbit(e.target.value)}
                        type="text"
                        label="Penerbit"
                        name="penerbit"
                        id="penerbit"
                        icon="fa fa-building"
                        placeholder="Masukkan Penerbit">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={tanggalTerbit}
                        onChange={(e) => setTanggalTerbit(e.target.value)}
                        type="date"
                        label="Tanggal Terbit"
                        name="tanggalTerbit"
                        id="tanggalTerbit"
                        icon="fa fa-calendar"
                        placeholder="Masukkan Tanggal Terbit">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={jumlahHalaman}
                        onChange={(e) => setJumlahHalaman(e.target.value)}
                        type="number"
                        label="Jumlah Halaman"
                        name="jumlahHalaman"
                        id="jumlahHalaman"
                        icon="fa fa-file"
                        placeholder="Masukkan Jumlah Halaman">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={noisbn}
                        onChange={(e) => setNoIsbn(e.target.value)}
                        type="text"
                        label="No ISBN"
                        name="noisbn"
                        id="noisbn"
                        icon="fa fa-barcode"
                        placeholder="Masukkan No ISBN">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={stokBuku}
                        onChange={(e) => setStokBuku(e.target.value)}
                        type="number"
                        label="Stok Buku"
                        name="stokBuku"
                        id="stokBuku"
                        icon="fa fa-boxes-stacked"
                        placeholder="Masukkan Stok Buku">
                    </FormField>
                    {mode !== "view" && (
                        <Button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                            {mode === "edit" ? "Perbarui Data" : "Simpan Data"}
                        </Button>
                    )}
                </div>
            </form>
        </>
    )

}