/*
  Warnings:

  - Made the column `user_key` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currency` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `user_key` VARCHAR(255) NOT NULL,
    MODIFY `currency` INTEGER NOT NULL DEFAULT 0,
    MODIFY `level` INTEGER NOT NULL DEFAULT 1;
