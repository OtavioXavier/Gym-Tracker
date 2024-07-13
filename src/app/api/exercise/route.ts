import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

import { schema } from "@/lib/schema";

export async function POST(req: Request) {
  try {

    const data = schema.parse(await req.json());

    const { userId } = auth();

    if (!userId) {
      return Response.json({ status: 401, message: "Unauthorized" });
    }

    const exercise = await prismadb.exercise.create({
      data:{...data},
    });

    return Response.json({ status: 201, data: exercise });
  } catch (error: any) {
    console.error("Error at /api/exercise POST", error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json({ status: 401, message: "Unauthorized" });
    }

    const data = await prismadb.exercise.findMany();

    return Response.json({ data, status: 200, message: "Exercises fetched" });

  } catch (error: any) {
    console.error("Error at /api/exercise GET", error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
