"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Exercise, Set } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { UploadButton } from "./../uploadthig";
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Pencil,
  PencilLine,
  XCircle,
} from "lucide-react";
import clsx from "clsx";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { MuscleEnum, schema } from "../../lib/schema";
import { z } from 'zod';


const muscles = [
  { value: MuscleEnum.Enum.BACK, label: "Back" },
  { value: MuscleEnum.Enum.CHEST, label: "Chest" },
  { value: MuscleEnum.Enum.QUADRICEPS, label: "Quadriceps" },
  { value: MuscleEnum.Enum.HAMSTRING, label: "Hamstring" },
  { value: MuscleEnum.Enum.SHOULDERS, label: "Shoulders" },
  { value: MuscleEnum.Enum.ARMS, label: "Arms" },
  { value: MuscleEnum.Enum.CORE, label: "Core" },
  { value: MuscleEnum.Enum.CARDIO, label: "Cardio" },
] as const;

interface AddExerciseFormProps {
  exercise: ExerciseWithSets | null;
}

export type ExerciseWithSets = Exercise & {
  sets: Set[] | null;
};

export default function AddExerciseForm({ exercise }: AddExerciseFormProps) {
  const [image, setImage] = useState<string | undefined>(exercise?.thumbUrl);
  const [muscleSelected, setMuscleSelected] = useState<MuscleEnum | undefined>(MuscleEnum.Enum.CHEST);
  const [imageIsDeleting, setImageIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("thumbUrl", image, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [image]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: exercise || {
      name: "Exercise Name",
      description: "Exercise Description",
      thumbUrl: "",
      planId: "awefa124i2b34eb23",
      muscle: MuscleEnum.Enum.CHEST,
    },
  });

  async function handleExercise(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      thumbUrl: image,
      planId: "awefa124i2b34eb23",
      muscle: muscleSelected,
    };
    try {
      if (exercise) {
        axios.put(`/api/exercise/${exercise.id}`, data).then((res) => {
          toast({
            variant: "success",
            description: "🎉 Exercise updated",
          });
          router.push('/exercises');
        })
      } else {
        axios.post('/api/exercise', data).then((res) => {
          toast({
            variant: "success",
            description: "🎉 Exercise created",
          });
          router.push('/exercises');
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageDelete(image: string) {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "success",
            description: "Image removed",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleExercise} className="space-y-6">
          <header className="text-lg font-semibold">
            {exercise ? "Update your exercise!" : "Describe your exercise!"}
          </header>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="type the exercise name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is where your insert the exercise name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type the exercise description..."
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is where your insert the exercise description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="muscle"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Muscle *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={clsx(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? muscles.find(
                                (muscle) => muscle.value === field.value
                              )?.label
                            : "Select muscle"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search muscle..." />
                        <CommandEmpty>No muscle found.</CommandEmpty>
                        <CommandGroup>
                          {muscles.map((muscle) => (
                            <CommandItem
                              value={muscle.label}
                              key={muscle.value}
                              onSelect={() => {
                                form.setValue("muscle", muscle.value);
                                setMuscleSelected(muscle.value)
                              }}
                            >
                              <Check
                                className={clsx(
                                  "mr-2 h-4 w-4",
                                  muscle.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {muscle.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the muscle that will be worked in the exercise.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="thumbUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel>Upload the Thumb *</FormLabel>
                  <FormDescription>
                    Choose an image that will show-case your exercise
                  </FormDescription>
                  <FormControl>
                    {image ? (
                      <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                        <div className="p-4 border-2 border-dashed border-slate-500">
                          <Image
                            src={image}
                            width={384}
                            height={300}
                            alt="Exercise thumb"
                            className="object-contain bg-cover"
                          />
                        </div>
                        <Button
                          onClick={() => handleImageDelete(image)}
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-[-12px] top-0"
                        >
                          {imageIsDeleting ? <Loader2 /> : <XCircle />}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center max-w-[400px] p-12 border-2 border-dashed border-slate-500 rounded mt-4">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: any) => {
                            console.log("Files: ", res);
                            setImage(res[0].url);
                            toast({
                              variant: "success",
                              description: "🎉 Upload Completed",
                            });
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                            toast({
                              variant: "destructive",
                              description: `ERROR! ${error.message}`,
                            });
                          }}
                        />
                      </div>
                    )}
                  </FormControl>
                </FormItem>
              )}
            /> 
          </div>
          <Button disabled={isLoading} className="max-w-[150px]" type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Please Wait</p>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
