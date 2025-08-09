/*
  Warnings:

  - The primary key for the `federated_credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `federated_credentials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ownerId` on the `files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `parentId` on the `files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."files" DROP CONSTRAINT "files_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."files" DROP CONSTRAINT "files_parentId_fkey";

-- AlterTable
ALTER TABLE "public"."federated_credentials" DROP CONSTRAINT "federated_credentials_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "federated_credentials_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."files" DROP CONSTRAINT "files_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" UUID NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" UUID NOT NULL,
ADD CONSTRAINT "files_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
