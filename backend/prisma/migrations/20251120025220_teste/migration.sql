-- CreateTable
CREATE TABLE `characters` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `currency_lock` INTEGER NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `attr_hp` INTEGER NULL DEFAULT 0,
    `attr_atk` INTEGER NULL DEFAULT 0,
    `attr_def` INTEGER NULL DEFAULT 0,

    INDEX `idx_anime`(`anime_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_descriptions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `character_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` TEXT NULL,

    INDEX `idx_character_id`(`character_id`),
    INDEX `idx_character_name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_unlocks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `unlock_type` ENUM('Character', 'Equipment', 'Skill', 'Story') NOT NULL,
    `unlock_key` VARCHAR(255) NULL,
    `unlock_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_unlocks_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `user_key` VARCHAR(255) NULL,
    `activation_key` VARCHAR(255) NULL,
    `reset_password_key` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `currency` INTEGER NULL DEFAULT 0,
    `level` INTEGER NULL DEFAULT 1,

    INDEX `email`(`email`),
    INDEX `idx_activation`(`activation_key`),
    INDEX `idx_key`(`user_key`),
    INDEX `idx_username`(`username`),
    INDEX `reset_password_key`(`reset_password_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character_descriptions` ADD CONSTRAINT `character_descriptions_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_unlocks` ADD CONSTRAINT `user_unlocks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
