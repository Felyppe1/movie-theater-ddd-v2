-- CreateTable
CREATE TABLE "movie_technology" (
    "technology_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,

    CONSTRAINT "movie_technology_pkey" PRIMARY KEY ("technology_id","movie_id")
);
