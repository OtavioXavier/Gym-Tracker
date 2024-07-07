/*
  Warnings:

  - The `trainDay` column on the `workout_plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "workout_plan" DROP COLUMN "trainDay",
ADD COLUMN     "trainDay" "WeekDays"[];
