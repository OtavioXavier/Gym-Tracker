/*
  Warnings:

  - The `trainDay` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "trainDay",
ADD COLUMN     "trainDay" INTEGER[];

-- DropEnum
DROP TYPE "WeekDays";
