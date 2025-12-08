/*
  Warnings:

  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `user_power` ENUM('Regular', 'Moderator', 'Admin') NOT NULL DEFAULT 'Regular',
    MODIFY `activated_at` DATETIME NULL,
    MODIFY `created_at` DATETIME NOT NULL;
