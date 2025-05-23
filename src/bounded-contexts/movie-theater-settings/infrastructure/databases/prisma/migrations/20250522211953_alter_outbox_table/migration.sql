/*
  Warnings:

  - You are about to drop the column `occurred_on` on the `outbox` table. All the data in the column will be lost.
  - You are about to drop the column `processed_on` on the `outbox` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "outbox" DROP COLUMN "occurred_on",
DROP COLUMN "processed_on",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updated_at" TIMESTAMP(3);
