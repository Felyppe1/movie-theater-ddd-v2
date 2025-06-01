/*
  Warnings:

  - Made the column `messaging_type` on table `outbox` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "outbox" ALTER COLUMN "messaging_type" SET NOT NULL;
