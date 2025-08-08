/*
  Warnings:

  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."file" DROP CONSTRAINT "file_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."file" DROP CONSTRAINT "file_parentId_fkey";

-- DropTable
DROP TABLE "public"."file";

-- CreateTable
CREATE TABLE "public"."files" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
