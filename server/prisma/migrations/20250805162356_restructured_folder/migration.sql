/*
  Warnings:

  - You are about to drop the `folders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."folders" DROP CONSTRAINT "folders_parentId_fkey";

-- DropTable
DROP TABLE "public"."folders";

-- CreateTable
CREATE TABLE "public"."file" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."file" ADD CONSTRAINT "file_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."file" ADD CONSTRAINT "file_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
