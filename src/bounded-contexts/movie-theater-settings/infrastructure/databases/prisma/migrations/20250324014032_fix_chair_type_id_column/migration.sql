/*
  Warnings:

  - The primary key for the `movie_theater_chair_type` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "movie_theater_chair_type" DROP CONSTRAINT "movie_theater_chair_type_pkey",
ALTER COLUMN "chair_type_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "movie_theater_chair_type_pkey" PRIMARY KEY ("chair_type_id", "movie_theater_id");
