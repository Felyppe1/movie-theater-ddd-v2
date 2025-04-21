/*
  Warnings:

  - You are about to drop the `Outbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Outbox";

-- CreateTable
CREATE TABLE "outbox" (
    "id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "occurred_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_on" TIMESTAMP(3),

    CONSTRAINT "outbox_pkey" PRIMARY KEY ("id")
);
