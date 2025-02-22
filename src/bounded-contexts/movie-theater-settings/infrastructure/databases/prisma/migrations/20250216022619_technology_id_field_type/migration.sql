/*
  Warnings:

  - The primary key for the `RoomTechnology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_MovieToTechnology` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "RoomTechnology" DROP CONSTRAINT "RoomTechnology_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToTechnology" DROP CONSTRAINT "_MovieToTechnology_B_fkey";

-- AlterTable
ALTER TABLE "RoomTechnology" DROP CONSTRAINT "RoomTechnology_pkey",
ALTER COLUMN "technology_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RoomTechnology_pkey" PRIMARY KEY ("technology_id", "room_number", "movie_theater_id");

-- AlterTable
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Technology_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Technology_id_seq";

-- AlterTable
ALTER TABLE "_MovieToTechnology" DROP CONSTRAINT "_MovieToTechnology_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_MovieToTechnology_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "RoomTechnology" ADD CONSTRAINT "RoomTechnology_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToTechnology" ADD CONSTRAINT "_MovieToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
