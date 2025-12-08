-- CreateTable
CREATE TABLE `animes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anime_descriptions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anime_descriptions` ADD CONSTRAINT `anime_descriptions_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
