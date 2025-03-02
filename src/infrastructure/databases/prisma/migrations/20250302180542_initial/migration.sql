-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('HORROR', 'COMEDY', 'ACTION');

-- CreateEnum
CREATE TYPE "CLASSIFICATION" AS ENUM ('FREE', '12');

-- CreateTable
CREATE TABLE "chair" (
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "room_id" TEXT NOT NULL,
    "chair_type_id" TEXT NOT NULL,

    CONSTRAINT "chair_pkey" PRIMARY KEY ("row","column","room_id")
);

-- CreateTable
CREATE TABLE "technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentageIncrease" DOUBLE PRECISION,

    CONSTRAINT "technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,
    "row_length" INTEGER NOT NULL,
    "column_length" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_technology" (
    "technology_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "room_technology_pkey" PRIMARY KEY ("technology_id","room_id")
);

-- CreateTable
CREATE TABLE "movie_theater" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "zipCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "movie_theater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chair_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "chair_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_theater_chair_type" (
    "chair_type_id" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION,

    CONSTRAINT "movie_theater_chair_type_pkey" PRIMARY KEY ("chair_type_id","movie_theater_id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "poster" TEXT NOT NULL,
    "gender" "GENDER"[],
    "classification" "CLASSIFICATION"[],
    "subtitled" BOOLEAN NOT NULL,
    "initial_date" TIMESTAMP(3) NOT NULL,
    "final_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);
