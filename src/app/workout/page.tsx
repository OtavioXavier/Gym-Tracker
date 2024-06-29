import WorkoutList from '@/components/workout/workout-list';
import { getPlanById } from '../../../actions/get-plan-by-id';

export default async function Workout() {
  const date = new Date().getDay();
  const plan = await getPlanById('awefa124i2b34eb23');
  return (
    <main>
      <h1>Workout</h1>
      <h2>{plan?.name}</h2>
      {/* Lista de exercícios  */}
      <WorkoutList />
      {/* A lista de exercícios deve aparecer de acordo com o dia da semana */}
      {/* Onde seg: Peito e ombro, ter: Costas e braços, qua: pernas e abdomen, quinta: core e cardio*/}
    </main>
  )
}