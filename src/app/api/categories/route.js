// app/api/categories/route.js
import prisma from "@/lib/prisma";

// GET /api/books
export async function GET() {
    const categories = await prisma.kategoriBuku.findMany({ orderBy: { createdAt: "desc" }});
    return new Response(JSON.stringify(categories), { status: 200 });
}

// POST /api/books
export async function POST(req) {
    const body = await req.json();
    const newCategory = await prisma.kategoriBuku.create({
        data: {
            namaKategori: body.namaKategori,
        },
    });
    return new Response(JSON.stringify(newCategory), { status: 201 });
}
