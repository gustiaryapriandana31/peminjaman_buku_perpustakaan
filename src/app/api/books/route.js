// app/api/books/route.js
import prisma from "@/lib/prisma";

// GET /api/books
export async function GET() {
    try {
        const books = await prisma.buku.findMany({ 
            orderBy: { createdAt: "desc" }
        });

        return new Response(JSON.stringify(books), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Gagal mengambil data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// POST /api/books
export async function POST(req) {
    try {
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
        const newBook = await prisma.buku.create({
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
        return new Response(JSON.stringify(newBook), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch(error) {
        console.error("Gagal menambahkan data buku:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Gagal menambahkan data buku" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
