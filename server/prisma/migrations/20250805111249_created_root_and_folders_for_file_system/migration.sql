-- CreateTable
CREATE TABLE "public"."root" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "root_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."folder" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "parentId" INTEGER NOT NULL,
    "rootId" INTEGER,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "root_userId_key" ON "public"."root"("userId");

-- AddForeignKey
ALTER TABLE "public"."root" ADD CONSTRAINT "root_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."folder" ADD CONSTRAINT "folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."folder" ADD CONSTRAINT "folder_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."root"("id") ON DELETE SET NULL ON UPDATE CASCADE;
