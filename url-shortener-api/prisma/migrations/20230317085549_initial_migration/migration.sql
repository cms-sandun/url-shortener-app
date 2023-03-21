/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `UrlEntry` table. All the data in the column will be lost.
  - Added the required column `shortUrlKey` to the `UrlEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UrlEntry` DROP COLUMN `shortUrl`,
    ADD COLUMN `shortUrlKey` VARCHAR(191) NOT NULL;
