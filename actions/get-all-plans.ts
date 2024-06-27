import prismadb from "@/lib/prismadb";

export const getAllPlans = async () => {
  try {
    const plans = await prismadb.workoutPlan.findMany();
    if (!plans) return null;
    return plans;
  } catch (error: any) {
    throw new Error(error);
  }
};
