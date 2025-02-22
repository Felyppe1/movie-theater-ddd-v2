/*
  Warnings:

  - You are about to drop the `Chair` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chairs` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chair" DROP CONSTRAINT "Chair_room_number_movie_theater_id_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "chairs" JSONB NOT NULL;

-- DropTable
DROP TABLE "Chair";
