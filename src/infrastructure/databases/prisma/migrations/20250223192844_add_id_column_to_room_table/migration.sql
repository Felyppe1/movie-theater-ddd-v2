/*
  Warnings:

  - The primary key for the `Chair` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `movie_theater_id` on the `Chair` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `Chair` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RoomTechnology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `movie_theater_id` on the `RoomTechnology` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `RoomTechnology` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `Chair` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Room` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `room_id` to the `RoomTechnology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chair" DROP CONSTRAINT "Chair_pkey",
DROP COLUMN "movie_theater_id",
DROP COLUMN "room_number",
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD CONSTRAINT "Chair_pkey" PRIMARY KEY ("row", "column", "room_id");

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RoomTechnology" DROP CONSTRAINT "RoomTechnology_pkey",
DROP COLUMN "movie_theater_id",
DROP COLUMN "room_number",
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD CONSTRAINT "RoomTechnology_pkey" PRIMARY KEY ("technology_id", "room_id");
