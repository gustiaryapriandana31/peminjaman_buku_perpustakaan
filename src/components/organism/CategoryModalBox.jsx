import FormField from "../molecules/FormField";

export default function BookModalBox() {

    return (
        <>
            <h1>TAMBAH DATA KATEGORI</h1>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    label="Nama Kategori Buku"
                    name="namaKategori"
                    id="namaKategori"
                    icon="fa fa-list"
                    placeholder="Masukkan Data Kategori Buku">
                </FormField>
            </div>
        </>
    )

}