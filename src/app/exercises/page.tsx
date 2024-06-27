import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllExercises } from "../../../actions/get-all-exercises";
import { auth } from "@clerk/nextjs/server";
import ExerciseList from "@/components/exercise/exercises-list";

export default async function ExercisesPage() {
  const { userId } = auth();

  if (!userId) return <h1>Not authenticated...</h1>;

  const exercises = (await getAllExercises()) || null;

  return (
    <main>
      <ExerciseList exercises={exercises} />
      <Button variant={"secondary"}>
        <Link href="/exercises/new-exercise">Add an Exercise</Link>
      </Button>
    </main>
  );
}
