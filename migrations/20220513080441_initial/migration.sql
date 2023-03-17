-- CreateEnum
CREATE TYPE "Role" AS ENUM ('resident', 'moderator', 'administrator');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role",
    "firstname" VARCHAR(64) NOT NULL,
    "lastname" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "login" VARCHAR(64) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255),
    "tokenVersion" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
