'use client'
import WorkoutList from '@/components/workout/workout-list'
import { Exercise } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Workout() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get('/api/exercise')
      .then((response) => {
        setLoading(true)
        setExercises(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <header className='mb-16'>
        <h1 className='text-2xl font-bold'>
          My <span className='text-red'>Workout</span>
        </h1>
        <h2 className='text-slate-500'>
          Today is (<span className='text-red-500'>chest and triceps</span>).
        </h2>
      </header>
      {(exercises && exercises.length < 0) ? (
        <p>There are not exercises</p>
      ) : (
        <WorkoutList exercises={exercises} />
      )}
    </main>
  )
}
