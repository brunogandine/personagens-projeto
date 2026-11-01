/*
  Warnings:

  - You are about to alter the column `expires_at` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `user_characters` ADD COLUMN `draws_npc` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `draws_pvp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `for_atk` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `for_def` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `for_hp` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `loses_npc` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `loses_pvp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `wins_npc` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `wins_pvp` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user_sessions` MODIFY `expires_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `activated_at` DATETIME NULL,
    MODIFY `created_at` DATETIME NOT NULL;
