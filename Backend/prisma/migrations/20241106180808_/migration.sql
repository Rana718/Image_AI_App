-- CreateTable
CREATE TABLE "UserList" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "UserList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiModelList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "aiModelName" TEXT NOT NULL,
    "defaultPrompt" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "userImageUpload" BOOLEAN NOT NULL,
    "style" BOOLEAN NOT NULL,
    "avater" BOOLEAN NOT NULL,
    "icon" TEXT,
    "banner" TEXT,

    CONSTRAINT "AiModelList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserList_userEmail_key" ON "UserList"("userEmail");
