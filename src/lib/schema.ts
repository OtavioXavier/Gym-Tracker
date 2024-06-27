import * as z from "zod";
export const MuscleEnum = z.enum([
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

export const schema = z.object({
  name: z.string().min(3, {
    message: "Your exercise needs a name with min 3 caracteres",
  }),
  description: z.string().min(1, {
    message: "Your exercise needs a description",
  }),
  thumbUrl: z.string().min(1, {
    message: "Your exercise needs a image",
  }),
  planId: z.string().min(1, {
    message: "Your exercise needs a plan",
  }),
  muscle: MuscleEnum,
});