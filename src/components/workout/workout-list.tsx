import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WorkoutCard from "./workout-card";
import { Exercise } from '@prisma/client';

interface ExerciseListProps {
  exercises: Exercise[];
}

export default function WorkoutList({ exercises }: ExerciseListProps) {
  const today = new Date().getDay();


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
          {(exercises && exercises.length > 0) ? (
            exercises.map((exercise) => {
              const {trainDay, id, name, muscle, thumbUrl, weight, repetitions, restTime } = exercise;
              if (trainDay && trainDay.includes(today)) {
                return (
                  <CarouselItem
                    key={id}
                    className="pl-1 md:basis-1/2 lg:basis-1/3 transition-all mx-1"
                  >
                    <WorkoutCard
                      name={name}
                      muscle={muscle}
                      id={id}
                      thumbUrl={thumbUrl}
                      weight={weight}
                      repetitions={repetitions}
                      restTime={restTime}
                      trainDay={trainDay}
                    />

                  </CarouselItem>
                );
              }
              return "Item";
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
