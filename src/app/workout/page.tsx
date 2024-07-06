import WorkoutList from '@/components/workout/workout-list';

export default async function Workout() {

  return (
    <main>
      <header className='mb-16'>
       <h1 className='text-2xl font-bold'>My <span className='text-red'>Workout</span></h1>
       <h2 className='text-slate-500'>Today is (<span className='text-red-500'>chest and triceps</span>).</h2>
      </header>
      <WorkoutList exercises={null}/>
    </main>
  )
}