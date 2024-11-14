/*
  Warnings:

  - You are about to drop the `aiModelList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "aiModelList";

-- CreateTable
CREATE TABLE "UserImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "cratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);
