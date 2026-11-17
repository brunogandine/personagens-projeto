/*
  Warnings:

  - You are about to alter the column `expires_at` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `activated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `created_at` to the `user_characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_characters` 
ADD COLUMN `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;