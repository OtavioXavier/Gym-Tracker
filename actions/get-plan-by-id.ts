import prismadb from "@/lib/prismadb";

export const getPlanById = async (planId: string) => {
  try {
    const plan = await prismadb.workoutPlan.findUnique({
      where: {
        id: planId,
      },
      include: {
        sheet: true,
        logs: true,
        users: true,
      },
    });
    if (!plan) return null;
    return plan;
  } catch (error: any) {
    throw new Error(error);
  }
};
