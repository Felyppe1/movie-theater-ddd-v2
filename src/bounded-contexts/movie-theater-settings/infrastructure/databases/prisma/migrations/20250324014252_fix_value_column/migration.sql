/*
  Warnings:

  - Made the column `value` on table `movie_theater_chair_type` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "movie_theater_chair_type" ALTER COLUMN "value" SET NOT NULL;
