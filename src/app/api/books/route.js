// app/api/books/route.js
import prisma from "@/lib/prisma";

// GET /api/books
export async function GET() {
    const books = await prisma.buku.findMany({ orderBy: { createdAt: "desc" }});
    return new Response(JSON.stringify(books), { status: 200 });
}

// POST /api/books
export async function POST(req) {
    const body = await req.json();
    const newBook = await prisma.book.create({
        data: {
            judulBuku: body.judulBuku,
            penulis: body.penulis,
            penerbit: body.penerbit,
            tanggalTerbit: body.tanggalTerbit ? new Date(body.tanggalTerbit) : new Date(),
            jumlahHalaman: body.jumlahHalaman,
            noisbn: body.noisbn,
            stokBuku: body.stokBuku
        },
    });
    return new Response(JSON.stringify(newBook), { status: 201 });
}
