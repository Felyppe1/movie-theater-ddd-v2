/*
  Warnings:

  - Added the required column `percentageIncrease` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "percentageIncrease" DOUBLE PRECISION NOT NULL;
