/*
  Warnings:

  - You are about to drop the `folder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `root` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."folder" DROP CONSTRAINT "folder_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."folder" DROP CONSTRAINT "folder_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."root" DROP CONSTRAINT "root_userId_fkey";

-- DropTable
DROP TABLE "public"."folder";

-- DropTable
DROP TABLE "public"."root";

-- CreateTable
CREATE TABLE "public"."folders" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
