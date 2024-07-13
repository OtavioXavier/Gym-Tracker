import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { schema } from "@/lib/schema";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const id = params.id;

    if (!id) {
      return new Response(JSON.stringify({ message: "This exercise does not exist" }), { status: 404 });
    }

    const data = schema.parse(await req.json());

    if (!data) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    const exercise = await prismadb.exercise.update({
      where: { id },
      data,
    });

    return new Response(JSON.stringify({ data: exercise }), { status: 200 });
  } catch (error: any) {
    console.error("Error at /api/exercise/:id PUT", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}