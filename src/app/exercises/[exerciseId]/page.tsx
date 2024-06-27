import { getExerciseById } from "../../../../actions/get-exercise-by-id";
import AddExerciseForm from "@/components/exercise/add-exercise-form";

interface ExercisePageProps {
  params: {
    exerciseId: string;
  };
}

export default async function ExercisesPage({ params }: ExercisePageProps) {
  const exercise = await getExerciseById(params.exerciseId);


  return (
    <main>
      <AddExerciseForm exercise={exercise || null} />
    </main>
  );
}