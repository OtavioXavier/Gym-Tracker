/*
  Warnings:

  - You are about to drop the `log_exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log_set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_set` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `muscle` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumb_url` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Muscles" AS ENUM ('CHEST', 'BACK', 'QUADRICEPS', 'HAMSTRING', 'SHOULDERS', 'ARMS', 'CORE', 'CARDIO');

-- DropForeignKey
ALTER TABLE "log_exercise" DROP CONSTRAINT "log_exercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "log_exercise" DROP CONSTRAINT "log_exercise_logId_fkey";

-- DropForeignKey
ALTER TABLE "log_set" DROP CONSTRAINT "log_set_logExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "log_set" DROP CONSTRAINT "log_set_logId_fkey";

-- DropForeignKey
ALTER TABLE "log_set" DROP CONSTRAINT "log_set_setId_fkey";

-- DropForeignKey
ALTER TABLE "workout_log" DROP CONSTRAINT "workout_log_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "workout_log" DROP CONSTRAINT "workout_log_planId_fkey";

-- DropForeignKey
ALTER TABLE "workout_set" DROP CONSTRAINT "workout_set_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "muscle" "Muscles" NOT NULL,
ADD COLUMN     "repetitions" INTEGER[],
ADD COLUMN     "restTime" INTEGER[],
ADD COLUMN     "thumb_url" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "log_exercise";

-- DropTable
DROP TABLE "log_set";

-- DropTable
DROP TABLE "workout_log";

-- DropTable
DROP TABLE "workout_set";

-- DropEnum
DROP TYPE "Dificult";

-- CreateTable
CREATE TABLE "ExerciseHistory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "muscle" "Muscles" NOT NULL,
    "planId" TEXT NOT NULL,
    "weight" INTEGER[],
    "repetitions" INTEGER[],
    "restTime" INTEGER[],
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseHistory_pkey" PRIMARY KEY ("id")
);
