/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl]` on the table `UrlEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortUrlKey]` on the table `UrlEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UrlEntry_originalUrl_key` ON `UrlEntry`(`originalUrl`);

-- CreateIndex
CREATE UNIQUE INDEX `UrlEntry_shortUrlKey_key` ON `UrlEntry`(`shortUrlKey`);
