"use client";

import * as z from "zod";
import { Exercise, User, WorkoutPlan } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddPlansFormProps {
  plan: PlanWithExercises | null;
}

export type PlanWithExercises = WorkoutPlan & {
  sheet: Exercise[];
  users: User[];
};

const MuscleEnum = z.enum([
  "CHEST",
  "BACK",
  "QUADRICEPS",
  "HAMSTRING",
  "SHOULDERS",
  "ARMS",
  "CORE",
  "CARDIO",
]);
export type MuscleEnum = z.infer<typeof MuscleEnum>;

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Your plan needs a name with min 3 caracteres",
  }),
  exercises: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Your exercise needs a name",
      }),
      muscle: MuscleEnum,
    })
  ),
});

export default function AddPlanForm({ plan }: AddPlansFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "my new plan",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-lg font-semibold">
            {plan ? "Update your plan!" : "Describe your plan!"}
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="type the plan name..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is where your insert the plan name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
