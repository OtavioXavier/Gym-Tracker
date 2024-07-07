-- AlterTable
ALTER TABLE "workout_plan" ADD COLUMN     "trainDay" "Muscles"[];

-- AddForeignKey
ALTER TABLE "ExerciseHistory" ADD CONSTRAINT "ExerciseHistory_planId_fkey" FOREIGN KEY ("planId") REFERENCES "workout_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
