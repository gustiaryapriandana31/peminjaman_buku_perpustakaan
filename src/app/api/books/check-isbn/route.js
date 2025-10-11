import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const noisbn = searchParams.get("noisbn");

        if (!noisbn) {
        return new Response(JSON.stringify({ error: "ISBN wajib diisi" }), {
            status: 400,
        });
        }

        const existing = await prisma.buku.findUnique({
        where: { noisbn },
        });

        return new Response(
        JSON.stringify({ exists: !!existing }),
        { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error checking ISBN:", error);
        return new Response(JSON.stringify({ error: "Gagal memeriksa ISBN" }), {
        status: 500,
        });
    }
}
