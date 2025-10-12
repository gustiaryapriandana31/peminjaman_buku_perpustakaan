import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { useState, useEffect } from "react";
import { alertError, alertSuccess } from "../../lib/alert/sweetAlert";

export default function CategoryModalBox({title, onSuccess, selectedCategory=null, mode}) {
    const [namaKategori, setNamaKategori] = useState("");
    
    useEffect(() => {
        if (selectedCategory) {
            setNamaKategori(selectedCategory.namaKategori || "")
        }
    }, [selectedCategory]);

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(
            mode === "edit" ? `/api/categories/${selectedCategory.id}` : "/api/categories",
            {
                method: mode === "edit" ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({namaKategori}),
            }
        );

        if (res.ok) {
            await alertSuccess(mode === "edit" ? "Kategori Berhasil Diperbarui" : "Kategori Berhasil Ditambahkan");
            if (onSuccess) onSuccess();
            // Reset form setelah tambah kategori
            if (mode === "create") {
                setNamaKategori("")
            }
        } else {
            const err = await res.json()
            await alertError(err.error || ["Terjadi kesalahan"]);
        }
    }


    return (
        <>
            <form className="p-4 mb-20 space-y-4 bg-blue-900 shadow sm:p-6 rounded-xl" onSubmit={handleSubmit}>
                <h1>{title}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        value={namaKategori}
                        onChange={(e) => setNamaKategori(e.target.value)}
                        label="Nama Kategori Buku"
                        name="namaKategori"
                        id="namaKategori"
                        icon="fa fa-list"
                        placeholder="Masukkan Data Kategori Buku">
                    </FormField>
                </div>
                <Button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                    {mode === "edit" ? "Perbarui Data" : "Simpan Data"}
                </Button>
            </form>
        </>
    )

}