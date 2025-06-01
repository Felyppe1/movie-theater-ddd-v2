/*
  Warnings:

  - Added the required column `messaging_type` to the `outbox` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MESSAGING_TYPE" AS ENUM ('PubSub', 'CloudTasks');

-- AlterTable
ALTER TABLE "outbox" ADD COLUMN     "messaging_type" "MESSAGING_TYPE";

-- UpdateColumn
UPDATE "outbox" SET messaging_type = 'PubSub' WHERE messaging_type IS NULL;