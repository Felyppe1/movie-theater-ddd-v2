/*
  Warnings:

  - You are about to drop the column `chairs` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "chairs";

-- CreateTable
CREATE TABLE "Chair" (
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "room_number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,
    "chair_type_id" INTEGER NOT NULL,

    CONSTRAINT "Chair_pkey" PRIMARY KEY ("row","column","room_number","movie_theater_id")
);

-- AddForeignKey
ALTER TABLE "Chair" ADD CONSTRAINT "Chair_room_number_movie_theater_id_fkey" FOREIGN KEY ("room_number", "movie_theater_id") REFERENCES "Room"("number", "movie_theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chair" ADD CONSTRAINT "Chair_chair_type_id_fkey" FOREIGN KEY ("chair_type_id") REFERENCES "ChairType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
