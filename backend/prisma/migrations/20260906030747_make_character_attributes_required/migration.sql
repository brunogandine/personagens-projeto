/*
  Warnings:

  - You are about to alter the column `expires_at` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `attr_hp` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attr_atk` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attr_def` on table `characters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `characters` ADD COLUMN `anime_active` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `attr_hp` INTEGER NOT NULL DEFAULT 0,
    MODIFY `attr_atk` INTEGER NOT NULL DEFAULT 0,
    MODIFY `attr_def` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user_sessions` MODIFY `expires_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `activated_at` DATETIME NULL,
    MODIFY `created_at` DATETIME NOT NULL;
