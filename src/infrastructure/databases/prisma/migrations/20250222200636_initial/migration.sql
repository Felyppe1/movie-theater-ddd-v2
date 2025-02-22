-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('HORROR', 'COMEDY', 'ACTION');

-- CreateEnum
CREATE TYPE "CLASSIFICATION" AS ENUM ('FREE', '12');

-- CreateTable
CREATE TABLE "Chair" (
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "room_number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,
    "chair_type_id" INTEGER NOT NULL,

    CONSTRAINT "Chair_pkey" PRIMARY KEY ("row","column","room_number","movie_theater_id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentageIncrease" DOUBLE PRECISION,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,
    "row_length" INTEGER NOT NULL,
    "column_length" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("number","movie_theater_id")
);

-- CreateTable
CREATE TABLE "RoomTechnology" (
    "technology_id" TEXT NOT NULL,
    "room_number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,

    CONSTRAINT "RoomTechnology_pkey" PRIMARY KEY ("technology_id","room_number","movie_theater_id")
);

-- CreateTable
CREATE TABLE "MovieTheater" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "zipCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "MovieTheater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChairType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChairType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTheaterChairType" (
    "chair_type_id" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION,

    CONSTRAINT "MovieTheaterChairType_pkey" PRIMARY KEY ("chair_type_id","movie_theater_id")
);

-- CreateTable
CREATE TABLE "Movie" (
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

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
