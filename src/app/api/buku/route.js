// app/api/books/route.js
import prisma from "@/lib/prisma";

// GET /api/books
export async function GET() {
    const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" }});
    return new Response(JSON.stringify(books), { status: 200 });
}

// POST /api/books
export async function POST(req) {
    const body = await req.json();
    const newBook = await prisma.book.create({
        data: {
        title: body.title,
        author: body.author,
        publisher: body.publisher,
        year: body.year ? parseInt(body.year) : null,
        stock: body.stock ? parseInt(body.stock) : 0,
        },
    });
    return new Response(JSON.stringify(newBook), { status: 201 });
}
