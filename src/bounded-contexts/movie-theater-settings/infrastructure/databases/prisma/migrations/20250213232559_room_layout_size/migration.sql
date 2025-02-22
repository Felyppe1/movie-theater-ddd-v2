/*
  Warnings:

  - Added the required column `column_length` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row_length` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "column_length" INTEGER NOT NULL,
ADD COLUMN     "row_length" INTEGER NOT NULL;
