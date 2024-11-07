/*
  Warnings:

  - You are about to drop the `AiModelList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AiModelList";

-- CreateTable
CREATE TABLE "aiModelList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "aiModelName" TEXT NOT NULL,
    "defaultPrompt" TEXT,
    "isFeatured" BOOLEAN NOT NULL,
    "userImageUpload" BOOLEAN NOT NULL,
    "style" BOOLEAN NOT NULL,
    "avater" BOOLEAN NOT NULL,
    "icon" TEXT,
    "banner" TEXT,

    CONSTRAINT "aiModelList_pkey" PRIMARY KEY ("id")
);
