// app/api/categories/[id]/route.js
import prisma from "@/lib/prisma";

// GET (DETAIL) /api/categories/[id]/route.js
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const category = await prisma.kategoriBuku.findUnique({
            where: { id: parseInt(id) },
        });

        if (!category) {
            return new Response(JSON.stringify({ error: "Kategori tidak ditemukan" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(category), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("GET kategori error:", error);
        return new Response(JSON.stringify({ error: "Gagal mengambil data kategori" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// UPDATE /api/categories/[id]/route.js
export async function PUT(req, {params}) {
    try {
        const {id} = params
        const {namaKategori} = await req.json();

        if (!namaKategori || namaKategori.trim() === "") {
            return new Response(JSON.stringify({ error: "Nama kategori wajib diisi." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const updatedCategory = await prisma.kategoriBuku.update({
            where: {id: parseInt(id)},
            data: {
                namaKategori,
            },
        });
        return new Response(JSON.stringify(updatedCategory), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Gagal memperbarui data kategori" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// DELETE /api/categories/[id]/route.js
export async function DELETE(req, {params}) {
    const {id} = params;

    try {
        await prisma.kategoriBuku.delete({
            where: { id: parseInt(id) },
        });

        return new Response(JSON.stringify({ message: "Kategori berhasil dihapus" }), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Gagal mengsddfwqdddhapus data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }   
}

