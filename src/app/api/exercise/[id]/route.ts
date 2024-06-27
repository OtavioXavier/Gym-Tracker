import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

import { schema } from "@/lib/schema";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // { name, description, thumbUrl, planId, muscle }
    const id = params.id;

    if(!id) {
      return Response.json({ status: 401, message: "This exercise does not exist" });
    }

    const data = schema.parse(await req.json());

    if(!data) {
      return Response.json({ status: 401, message: "Missing fields" });
    }

    const { userId } = auth();

    if (!userId) {
      return Response.json({ status: 401, message: "Unauthorized" });
    }

    const exercise = await prismadb.exercise.update({
      where: {id},
      data:{...data},
    });

    return Response.json({ status: 201, data: exercise });
  } catch (error: any) {
    console.error("Error at /api/exercise POST", error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
