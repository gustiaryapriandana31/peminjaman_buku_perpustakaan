import FormField from "../molecules/FormField";
import FormFieldSelect from "../molecules/FormFieldSelect";

export default function BookModalBox() {

    return (
        <>
            <h1>TAMBAH DATA BUKU</h1>
            <div className="grid grid-cols-2 gap-4">
                <FormFieldSelect
                    label="Kategori Buku"
                    name="kategoriBuku"
                    id="kategoriBuku"
                    icon="fa fa-list"
                    placeholder="Pilih Kategori Buku">
                </FormFieldSelect>
                <FormField
                    type="text"
                    label="Judul Buku"
                    name="judulBuku"
                    id="judulBuku"
                    icon="fa fa-book"
                    placeholder="Masukkan Judul Buku">
                </FormField>
                <FormField
                    type="text"
                    label="Nama Penulis"
                    name="penulis"
                    id="penulis"
                    icon="fa fa-user"
                    placeholder="Masukkan Nama Penulis">
                </FormField>
                <FormField
                    type="text"
                    label="Penerbit"
                    name="penerbit"
                    id="penerbit"
                    icon="fa fa-building"
                    placeholder="Masukkan Penerbit">
                </FormField>
                <FormField
                    type="date"
                    label="Tanggal Terbit"
                    name="tanggalTerbit"
                    id="tanggalTerbit"
                    icon="fa fa-calendar"
                    placeholder="Masukkan Tanggal Terbit">
                </FormField>
                <FormField
                    type="text"
                    label="Jumlah Halaman"
                    name="jumlahHalaman"
                    id="jumlahHalaman"
                    icon="fa fa-file"
                    placeholder="Masukkan Jumlah Halaman">
                </FormField>
                <FormField
                    type="text"
                    label="No ISBN"
                    name="noisbn"
                    id="noisbn"
                    icon="fa fa-barcode"
                    placeholder="Masukkan No ISBN">
                </FormField>
                <FormField
                    type="number"
                    label="Stok Buku"
                    name="stokBuku"
                    id="stokBuku"
                    icon="fa fa-boxes-stacked"
                    placeholder="Masukkan Stok Buku">
                </FormField>
            </div>
        </>
    )

}