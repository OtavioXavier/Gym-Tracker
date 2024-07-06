import prismadb from "@/lib/prismadb";

export const getExerciseById = async (exerciseId: string) => {
  try {
    const exercise = await prismadb.exercise.findUnique({
      where: {id: exerciseId}
    });
    if (!exercise) return null;
    return exercise;
  } catch (error: any) {
    throw new Error(error);
  }
};
