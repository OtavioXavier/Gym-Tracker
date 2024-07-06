/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscle` on the `ExerciseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ExerciseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExerciseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `workout_plan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `workout_plan` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `ExerciseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ExerciseHistory" DROP COLUMN "muscle",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exerciseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "workout_plan" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "ExerciseHistory" ADD CONSTRAINT "ExerciseHistory_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
