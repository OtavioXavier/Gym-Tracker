'use client';

import { Muscles } from '@prisma/client';
import Image from 'next/image';
import { Move, Hourglass } from 'lucide-react';
import StopWatch from './stopwatch';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface CardProps {
  id: string
  name: string
  thumbUrl: string
  muscle: Muscles
  weight: number[]
  repetitions: number[]
  restTime: number[]
  trainDay: number[]
};

export default function WorkoutCard({
  id,
  name,
  thumbUrl,
  muscle,
  weight,
  repetitions,
  restTime,
  trainDay,
}: CardProps) {
  const [seconds, setSeconds] = useState<number>(0)
  const [isPlay, setIsPlay] = useState<boolean>(false)

  return (
    <>
      <Card className='w-96'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
            <div className='h-9 w-9 max-h-9 mb-2 relative'>
              <Image
                src={thumbUrl}
                className='rounded-lg'
                layout='fill'
                objectFit='cover'
                alt={name}
              />
            </div>
            <CardTitle>{name}</CardTitle>
            </div>
            <Move color='#ED5564'/>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <Hourglass color='#ED5564'/>
            <StopWatch />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
