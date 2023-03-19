-- CreateEnum
CREATE TYPE "mediaType" AS ENUM ('image', 'video');

-- CreateEnum
CREATE TYPE "sectionTypes" AS ENUM ('text', 'image', 'video', 'audio', 'doc', 'pdf');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('administrator', 'user', 'creator');

-- CreateEnum
CREATE TYPE "courseTypeEnum" AS ENUM ('softwareSolution', 'hardwareAndSoftwareComplex', 'initiativeOfTheRegion', 'technology', 'service', 'notDefined', 'hardwareSolution');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" VARCHAR(512),
    "shortDescription" VARCHAR(512),
    "email" VARCHAR(512) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'administrator',
    "login" VARCHAR(512) NOT NULL,
    "password" VARCHAR(512) NOT NULL,
    "firstname" VARCHAR(512) NOT NULL,
    "lastname" VARCHAR(512) NOT NULL,
    "bio" TEXT,
    "avatarId" INTEGER DEFAULT 1,
    "tokenVersion" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(512) NOT NULL,
    "posterId" INTEGER,
    "shortDescription" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "courseType" "courseTypeEnum",

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPass" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TestPass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "rightAnswer" TEXT NOT NULL,
    "answers" TEXT[],
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "testId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(512) NOT NULL,
    "posterId" INTEGER DEFAULT 1,
    "articleBody" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postID" INTEGER,
    "cfId" INTEGER,
    "courseId" INTEGER,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "articleID" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "type" "sectionTypes" NOT NULL,
    "text" TEXT,
    "mediaID" INTEGER,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "posterId" INTEGER DEFAULT 1,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "organizer" VARCHAR(512) NOT NULL,
    "theme" VARCHAR(512) NOT NULL,
    "address" VARCHAR(512) NOT NULL,
    "format" VARCHAR(512),
    "userId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredForEvent" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "surname" VARCHAR(512) NOT NULL,
    "email" VARCHAR(512) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "RegisteredForEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'Stream',
    "streamKey" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(512) NOT NULL,
    "type" "mediaType" NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "courseMediaId" INTEGER,
    "postMediaId" INTEGER,
    "courseDescriptionId" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformConfig" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalcourseCount" INTEGER NOT NULL,
    "totalCompanyCount" INTEGER NOT NULL,
    "totalBudgetInvestment" INTEGER NOT NULL,
    "totalExtraBudgetInvestment" INTEGER NOT NULL,
    "platformTagline" TEXT NOT NULL,
    "platformTitle" TEXT NOT NULL,
    "platformDescription" TEXT NOT NULL,
    "platformShortDescription" TEXT NOT NULL,

    CONSTRAINT "PlatformConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagerGroup" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(512) NOT NULL,
    "type" TEXT NOT NULL,
    "avatarId" INTEGER,
    "inviteURL" VARCHAR(512),

    CONSTRAINT "MessagerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "streamId" INTEGER NOT NULL,

    CONSTRAINT "StreamMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_admin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MessagerGroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToPlatformConfig" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToPlatformConfig" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Article_postID_key" ON "Article"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Article_cfId_key" ON "Article"("cfId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_courseId_key" ON "Article"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_streamKey_key" ON "Stream"("streamKey");

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MessagerGroup_inviteURL_key" ON "MessagerGroup"("inviteURL");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MessagerGroupToUser_AB_unique" ON "_MessagerGroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MessagerGroupToUser_B_index" ON "_MessagerGroupToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToPlatformConfig_AB_unique" ON "_CourseToPlatformConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToPlatformConfig_B_index" ON "_CourseToPlatformConfig"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToPlatformConfig_AB_unique" ON "_EventToPlatformConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToPlatformConfig_B_index" ON "_EventToPlatformConfig"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPass" ADD CONSTRAINT "TestPass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPass" ADD CONSTRAINT "TestPass_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_articleID_fkey" FOREIGN KEY ("articleID") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredForEvent" ADD CONSTRAINT "RegisteredForEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_courseMediaId_fkey" FOREIGN KEY ("courseMediaId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postMediaId_fkey" FOREIGN KEY ("postMediaId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_courseDescriptionId_fkey" FOREIGN KEY ("courseDescriptionId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MessagerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagerGroup" ADD CONSTRAINT "MessagerGroup_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamMessage" ADD CONSTRAINT "StreamMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD FOREIGN KEY ("A") REFERENCES "MessagerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessagerGroupToUser" ADD FOREIGN KEY ("A") REFERENCES "MessagerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessagerGroupToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToPlatformConfig" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToPlatformConfig" ADD FOREIGN KEY ("B") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPlatformConfig" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPlatformConfig" ADD FOREIGN KEY ("B") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
