"use client";

import ExerciseCard from "@/components/exercise/exercise-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Exercise } from "@prisma/client";

interface ExerciseListProps {
  exercises: Exercise[] | null;
}

export default function WorkoutList({ exercises }: ExerciseListProps) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-8">Exercises Sequence</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-screen-md mx-8 md:mx-10"
      >
        <CarouselContent className="ml-2">
          {exercises && exercises.length > 0 ? (
            exercises.map((exercise) => {
              return (
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
              );
            })
          ) : (
            <p className="text-slate-500 text-sm">
              There are not exercises for today =(
            </p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
