// app/api/categories/[id]/route.js
import prisma from "@/lib/prisma";

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
        return new Response(JSON.stringify({ error: "Gagal menghapus data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }   
}

