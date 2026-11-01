/*
  Warnings:

  - You are about to drop the column `currency_lock` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `unlock_id` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `unlocked_on` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `was_default` on the `user_characters` table. All the data in the column will be lost.
  - You are about to alter the column `expires_at` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `user_characters` DROP FOREIGN KEY `user_characters_unlock_id_fkey`;

-- AlterTable
ALTER TABLE `characters` DROP COLUMN `currency_lock`;

-- AlterTable
ALTER TABLE `user_characters` DROP COLUMN `unlock_id`,
    DROP COLUMN `unlocked_on`,
    DROP COLUMN `was_default`;

-- AlterTable
ALTER TABLE `user_sessions` MODIFY `expires_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `activated_at` DATETIME NULL,
    MODIFY `created_at` DATETIME NOT NULL;
