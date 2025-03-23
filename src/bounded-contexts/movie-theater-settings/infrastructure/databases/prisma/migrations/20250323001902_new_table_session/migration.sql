-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "is_subtitled" BOOLEAN NOT NULL,
    "movie_id" TEXT NOT NULL,
    "technology_id" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_chair" (
    "session_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,

    CONSTRAINT "session_chair_pkey" PRIMARY KEY ("session_id","room_id","row","column")
);
