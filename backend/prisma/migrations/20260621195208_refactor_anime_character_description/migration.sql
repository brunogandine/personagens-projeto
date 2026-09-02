/*
  Warnings:

  - You are about to alter the column `expires_at` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `anime_descriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_descriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Made the column `currency_lock` on table `characters` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `anime_descriptions` DROP FOREIGN KEY `anime_descriptions_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `character_descriptions` DROP FOREIGN KEY `character_descriptions_character_id_fkey`;

-- AlterTable
ALTER TABLE `animes` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `characters` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ALTER COLUMN `anime_id` DROP DEFAULT,
    MODIFY `currency_lock` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user_sessions` MODIFY `expires_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `activated_at` DATETIME NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- DropTable
DROP TABLE `anime_descriptions`;

-- DropTable
DROP TABLE `character_descriptions`;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
