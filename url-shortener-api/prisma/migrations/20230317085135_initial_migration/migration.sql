/*
  Warnings:

  - You are about to drop the column `shorUrl` on the `UrlEntry` table. All the data in the column will be lost.
  - Added the required column `shortUrl` to the `UrlEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UrlEntry` DROP COLUMN `shorUrl`,
    ADD COLUMN `shortUrl` VARCHAR(191) NOT NULL;
