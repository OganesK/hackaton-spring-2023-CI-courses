-- CreateEnum
CREATE TYPE "sectionTypes" AS ENUM ('text', 'image', 'video', 'link');

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "articleID" INTEGER NOT NULL,
    "type" "sectionTypes" NOT NULL,
    "text" TEXT,
    "mediaID" INTEGER,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "sectionID" INTEGER NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "url" VARCHAR(512) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionAtributes" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "fontFamily" TEXT,
    "fontSize" TEXT,
    "fontColor" TEXT,
    "fontWeight" TEXT,

    CONSTRAINT "SectionAtributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_postID_key" ON "Article"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Link_sectionID_key" ON "Link"("sectionID");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_articleID_fkey" FOREIGN KEY ("articleID") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionAtributes" ADD CONSTRAINT "SectionAtributes_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
