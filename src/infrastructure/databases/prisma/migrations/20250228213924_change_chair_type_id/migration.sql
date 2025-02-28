/*
  Warnings:

  - The primary key for the `ChairType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ChairType" DROP CONSTRAINT "ChairType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChairType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChairType_id_seq";
