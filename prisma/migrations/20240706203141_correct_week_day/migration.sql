/*
  Warnings:

  - You are about to drop the column `trainDay` on the `workout_plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "trainDay" "WeekDays"[];

-- AlterTable
ALTER TABLE "workout_plan" DROP COLUMN "trainDay";
