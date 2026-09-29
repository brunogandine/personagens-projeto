/*
  Warnings:

  - You are about to alter the column `expires_at` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `user_sessions` MODIFY `expires_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `activated_at` DATETIME NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `CharacterNames` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `character_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
