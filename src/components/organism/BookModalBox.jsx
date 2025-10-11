import FormField from "../molecules/FormField";
import FormFieldSelect from "../molecules/FormFieldSelect";
import { useState, useEffect } from "react";   
import Button from "../atoms/Button"; 
import { alertError, alertSuccess } from "../../lib/alert/sweetAlert";

export default function BookModalBox({title, onSuccess, selectedBook=null, mode}) {
    const [categories, setCategories] = useState([]);
    const [isbnExists, setIsbnExists] = useState(false);
    const [userChangedIsbn, setUserChangedIsbn] = useState(false);
    const [form, setForm] = useState({
        judulBuku: "",
        penulis: "",
        penerbit: "",
        tanggalTerbit: "",
        jumlahHalaman: 0,
        noisbn: "",
        stokBuku: 0,
        idKategori: "",
    });

    useEffect(() => {
        if (selectedBook) {
            setForm({
                judulBuku: selectedBook.judulBuku || "",
                penulis: selectedBook.penulis || "",
                penerbit: selectedBook.penerbit || "",
                tanggalTerbit: selectedBook.tanggalTerbit ? selectedBook.tanggalTerbit.split("T")[0] : "",
                jumlahHalaman: selectedBook.jumlahHalaman || 0,
                noisbn: selectedBook.noisbn || "",
                stokBuku: selectedBook.stokBuku || 0,
                idKategori: selectedBook.idKategori || "",
            });
            setUserChangedIsbn(false);
        }
    }, [selectedBook]);

    // 🔍 Cek ISBN unik dengan debounce
    useEffect(() => {
        if ((mode === "create" || userChangedIsbn) && form.noisbn.trim() !== "") {
            const delay = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/books/check-isbn?noisbn=${form.noisbn}`);
                    const { exists } = await res.json();
                    setIsbnExists(exists);
                } catch (err) {
                    console.error("Gagal cek ISBN:", err);
                }
            }, 500);
            return () => clearTimeout(delay);
        } else {
            setIsbnExists(false);
        }
    }, [form.noisbn, mode, userChangedIsbn]);
    
    async function handleSubmit(e) {
        e.preventDefault();

        // Validasi ISBN
        if (isbnExists) {
            await alertError(["Nomor ISBN sudah digunakan!"]);
            return;
        }

        const res = await fetch(
            mode === "edit" ? `/api/books/${selectedBook.id}` : "/api/books",
            {
                method: mode === "edit" ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }
        );
        
        if (res.ok) {
            await alertSuccess(mode === "edit" ? "Data Buku Berhasil Diperbarui" : "Data Buku Berhasil Ditambahkan");
            if (onSuccess) onSuccess();
            // Reset form setelah tambah buku
            if (mode === "create") {
                setForm({
                    judulBuku: "",
                    penulis: "",
                    penerbit: "",
                    tanggalTerbit: "",
                    jumlahHalaman: 0,
                    noisbn: "",
                    stokBuku: 0,
                    idKategori: "",
                });
                setIsbnExists(false);
            }
        } else {
            const err = await res.json()
            await alertError(err.error || ["Terjadi kesalahan"]);
        }
    }

    // Digunakan untuk mengisi data kategori di select box kategori buku
    const getCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch(e) {
            console.error("Gagal mendapatkan data kategori buku", e);   
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
                        value={form.idKategori}
                        onChange={(e) => setForm({...form, idKategori: e.target.value})}
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
                        value={form.judulBuku}
                        onChange={(e) => setForm({...form, judulBuku: e.target.value})}
                        type="text"
                        label="Judul Buku"
                        name="judulBuku"
                        id="judulBuku"
                        icon="fa fa-book"
                        placeholder="Masukkan Judul Buku">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={form.penulis}
                        onChange={(e) => setForm({...form, penulis: e.target.value})}
                        type="text"
                        label="Nama Penulis"
                        name="penulis"
                        id="penulis"
                        icon="fa fa-user"
                        placeholder="Masukkan Nama Penulis">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={form.penerbit}
                        onChange={(e) => setForm({...form, penerbit: e.target.value})}
                        type="text"
                        label="Penerbit"
                        name="penerbit"
                        id="penerbit"
                        icon="fa fa-building"
                        placeholder="Masukkan Penerbit">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={form.tanggalTerbit}
                        onChange={(e) => setForm({...form, tanggalTerbit: e.target.value})}
                        type="date"
                        label="Tanggal Terbit"
                        name="tanggalTerbit"
                        id="tanggalTerbit"
                        icon="fa fa-calendar"
                        placeholder="Masukkan Tanggal Terbit">
                    </FormField>
                    <FormField
                        readOnly={mode === "view"}
                        value={form.jumlahHalaman}
                        onChange={(e) => setForm({...form, jumlahHalaman: e.target.value})}
                        type="number"
                        label="Jumlah Halaman"
                        name="jumlahHalaman"
                        id="jumlahHalaman"
                        icon="fa fa-file"
                        placeholder="Masukkan Jumlah Halaman">
                    </FormField>
                    <div>
                        <FormField
                            readOnly={mode === "view"}
                            value={form.noisbn}
                            onChange={(e) => setForm({...form, noisbn: e.target.value})}
                            type="text"
                            label="No ISBN"
                            name="noisbn"
                            id="noisbn"
                            icon="fa fa-barcode"
                            placeholder="Masukkan No ISBN">
                        </FormField>
                        {isbnExists && <p className="text-xs text-red-500">Nomor ISBN ini sudah digunakan.</p>}
                    </div>
                    <FormField
                        readOnly={mode === "view"}
                        value={form.stokBuku}
                        onChange={(e) => setForm({...form, stokBuku: e.target.value})}
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