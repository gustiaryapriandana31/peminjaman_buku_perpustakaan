import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert/sweetAlert";

export default function CategoryModalBox({onAddCategory}) {
    const [namaKategori, setNamaKategori] = useState("");

    const createCategory = async (namaKategori) => {
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ namaKategori })
            });
            const data = await res.json();
            setNamaKategori("");
            return {res, data};
        } catch(e) {
            console.error("Failed to fetch categories", e);   
            return { res: { status: 500 }, data: { errors: ["Terjadi kesalahan"] } };
        } 
    };
    
    async function handleSubmit(e) {
        e.preventDefault();

        const {res, data} = await createCategory(namaKategori);
        // const responseBody = await response.json(); 
        if(res.status === 201) {
            await alertSuccess("Kategori Berhasil Ditambahkan");
            if (onAddCategory) onAddCategory(data);
        } else {
            await alertError(data.errors || ["Terjadi kesalahan"]);
        }
    }


    return (
        <>
            <form className="p-4 mb-20 space-y-4 bg-blue-900 shadow sm:p-6 rounded-xl" onSubmit={handleSubmit}>
                <h1>Tambah Data Kategori Buku</h1>
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
                <Button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">Simpan Data</Button>
            </form>
        </>
    )

}