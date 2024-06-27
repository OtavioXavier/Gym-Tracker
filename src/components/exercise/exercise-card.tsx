import Image from "next/image";
import SupinoThumb from "../../../public/supino.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ExerciseCardProps {
  name: string;
  imageUrl?: string;
  description: string;
  muscle: string;
  id: string;
}

export default function ExerciseCard({
  name,
  imageUrl,
  description,
  muscle,
  id,
}: ExerciseCardProps) {
  return (
    <Link href={`exercises/${id}`}>
      <Card className='md:max-h-96 w-64 min-h-96'>
        <CardHeader>
          <CardTitle className="line-clamp-3 uppercase">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[150px] max-h-36 mb-2 relative'>
          <Image src={imageUrl || SupinoThumb} objectFit={'cover'} layout='fill' alt={name} />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <CardDescription className='line-clamp-3 min-h-20 max-h-20 mb-2'>{description}</CardDescription>
          <span className="text-red-500 font-semibold">{muscle}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
