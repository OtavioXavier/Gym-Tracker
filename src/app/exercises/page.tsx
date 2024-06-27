import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllExercises } from "../../../actions/get-all-exercises";
import ExerciseCard from "@/components/exercise/exercise-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { auth } from "@clerk/nextjs/server";

export default async function ExercisesPage() {
  const { userId } = auth();

  if (!userId) return <h1>Not authenticated...</h1>;

  const exercises = await getAllExercises();
  return (
    <main>
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-8">Exercises List</h3>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-screen-md mx-8 md:mx-10"
        >
          <CarouselContent className="-ml-1">
            {exercises && exercises.length > 0 ? (
              exercises.map((exercise) => (
                <CarouselItem
                  key={exercise.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/3 transition-all mx-1"
                >
                  <ExerciseCard
                    name={exercise.name}
                    description={exercise.description}
                    muscle={exercise.muscle}
                    id={exercise.id}
                    imageUrl={exercise.thumbUrl}
                  />
                </CarouselItem>
              ))
            ) : (
              <p className="text-slate-500 text-sm">
                There are not exercises on registers =(
              </p>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <Button variant={"secondary"}>
        <Link href="/exercises/new-exercise">Add an Exercise</Link>
      </Button>
    </main>
  );
}
