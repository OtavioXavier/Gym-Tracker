import prismadb from "@/lib/prismadb";

export const getAllExercises = async () => {
  try {
    const exercises = await prismadb.exercise.findMany();
    if (!exercises) return null;
    return exercises;
  } catch (error: any) {
    throw new Error(error);
  }
};
