import AddPlanForm from "@/components/plan/add-plan-form";
import { getPlanById } from "./../../../../actions/get-plan-by-id";
import { auth } from "@clerk/nextjs/server";

interface PlanPageProps {
  params: {
    planId: string;
  };
}

export default async function PlanDetail({ params }: PlanPageProps) {
  const plan = await getPlanById(params.planId);
  const { userId } = auth();

  if (!userId) return <h1>Not authenticated...</h1>;

  if (
    plan &&
    plan.users.map((user) => {
      if (user.id === userId) {
        return true;
      }
    })
  )
    return <h1>Access Denied!</h1>;

  return (
    <main>
      <AddPlanForm plan={plan}/>
    </main>
  );
}
