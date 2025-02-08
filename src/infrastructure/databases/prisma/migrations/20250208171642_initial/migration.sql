-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('HORROR', 'COMEDY', 'ACTION');

-- CreateEnum
CREATE TYPE "CLASSIFICATION" AS ENUM ('FREE', '12');

-- CreateTable
CREATE TABLE "Chair" (
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "room_number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,

    CONSTRAINT "Chair_pkey" PRIMARY KEY ("row","column","room_number","movie_theater_id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "number" INTEGER NOT NULL,
    "movie_theater_id" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("number","movie_theater_id")
);

-- CreateTable
CREATE TABLE "RoomTechnology" (
    "technology_id" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "_MovieToTechnology" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToTechnology_B_index" ON "_MovieToTechnology"("B");

-- AddForeignKey
ALTER TABLE "Chair" ADD CONSTRAINT "Chair_room_number_movie_theater_id_fkey" FOREIGN KEY ("room_number", "movie_theater_id") REFERENCES "Room"("number", "movie_theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTechnology" ADD CONSTRAINT "RoomTechnology_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTechnology" ADD CONSTRAINT "RoomTechnology_room_number_movie_theater_id_fkey" FOREIGN KEY ("room_number", "movie_theater_id") REFERENCES "Room"("number", "movie_theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTheaterChairType" ADD CONSTRAINT "MovieTheaterChairType_chair_type_id_fkey" FOREIGN KEY ("chair_type_id") REFERENCES "ChairType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTheaterChairType" ADD CONSTRAINT "MovieTheaterChairType_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToTechnology" ADD CONSTRAINT "_MovieToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToTechnology" ADD CONSTRAINT "_MovieToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
