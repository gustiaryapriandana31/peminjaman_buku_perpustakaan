// app/api/categories/route.js
import prisma from "@/lib/prisma";

// GET /api/categories
export async function GET() {
    try {
        const categories = await prisma.kategoriBuku.findMany({
        orderBy: { createdAt: "desc" },
        });
        return new Response(JSON.stringify(categories), {
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

// POST /api/categories
export async function POST(req) {
    const body = await req.json();
    const newCategory = await prisma.kategoriBuku.create({
        data: {
            namaKategori: body.namaKategori,
        },
    });
    return new Response(JSON.stringify(newCategory), { status: 201 });
}
