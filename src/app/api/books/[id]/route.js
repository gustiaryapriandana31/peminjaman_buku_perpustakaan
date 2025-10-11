// app/api/books/[id]/route.js
import prisma from "@/lib/prisma";

// GET (DETAIL) /api/books/[id]/route.js
export async function GET(req, {params}) {
    try {
        const {id} = params

        const bookDetail = await prisma.buku.findFirst({
            where: {id: parseInt(id)},
            include: {
                kategoriBuku: true
            }
        });

        if (!bookDetail) {
            return new Response(JSON.stringify({ error: "Buku yang dicari tidak ditemukan" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(bookDetail), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Gagal mendapatkan data buku" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// UPDATE /api/books/[id]/route.js
export async function PUT(req, {params}) {
    try {
        const {id} = params
        const body = await req.json();

        const {
            judulBuku,
            penulis,
            penerbit,
            tanggalTerbit,
            jumlahHalaman,
            noisbn,
            stokBuku,
            idKategori,
        } = body;

        const updatedBook = await prisma.buku.update({
            where: {id: parseInt(id)},
            data: {
                judulBuku,
                penulis,
                penerbit,
                tanggalTerbit: tanggalTerbit ? new Date(tanggalTerbit) : new Date(),
                jumlahHalaman : parseInt(jumlahHalaman),
                noisbn,
                stokBuku: parseInt(stokBuku),
                kategoriBuku: { connect: { id: parseInt(idKategori) } }
            },
            include: {
                kategoriBuku:true
            }
        });
        return new Response(JSON.stringify(updatedBook), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Gagal memperbarui data buku" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// DELETE /api/books/[id]/route.js
export async function DELETE(req, {params}) {
    const {id} = params;

    try {
        await prisma.buku.delete({
            where: { id: parseInt(id) },
        });

        return new Response(JSON.stringify({ message: "Data Buku berhasil dihapus" }), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Gagal menghapus data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }   
}

