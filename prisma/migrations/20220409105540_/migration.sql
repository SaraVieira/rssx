/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feedUrl]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `feedUrl` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "feedUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Website_feedUrl_key" ON "Website"("feedUrl");
