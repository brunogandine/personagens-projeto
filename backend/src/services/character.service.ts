import ImageStorageService from "@/services/image-storage.service"
import path from "path"
import { animeModel } from "@/models/Anime";
import { characterModel } from "@/models/Character";
import { CreateCharacterResponse, CreateCharacterPayload, EditCharacterPayload, GetCharactersParams, EditCharacterResponse, DeleteCharacterPayload, RestoreCharacterPayload } from "@/types/character.types";

const assetsDir = path.resolve(process.cwd(), process.env.FRONTEND_ASSETS_PATH!);
const uploadDir =  path.resolve(process.cwd(), assetsDir, "images", "cards");
class CharacterService {
    async createCharacter(payload: CreateCharacterPayload): Promise<CreateCharacterResponse> {
        const errors = [];

        const anime = await animeModel.findById(payload.data.anime_id);

        if(!anime) {
            throw ({ type: "not_found", message:"Anime fornecido não existente." });
        };

        const character = await characterModel.create(payload.data);

        const characterDir = path.resolve(uploadDir, `${character.id}`);

        if(payload.artwork) {
            const artworkDir = path.resolve(characterDir, "artwork", `1`, `1.${payload.artwork.ext}`);

            const artworkSave = await ImageStorageService.save(payload.artwork.buffer, artworkDir);

            if(!artworkSave.ok) {
                errors.push({message: `${artworkSave.message} - Artwork`});
            };
        };

        if(payload.thumbnail) {
            const thumbnailDir = path.resolve(characterDir, "thumbnail", `1`, `1.${payload.thumbnail.ext}`);

            const thumbnailSave = await ImageStorageService.save(payload.thumbnail.buffer, thumbnailDir);

            if(!thumbnailSave.ok) {
                errors.push({message: `${thumbnailSave.message} - Thumbnail`});
            };
        };

        if(errors.length > 0) {
            errors.push({message: "O personagem foi criado com sucesso, mas ocorreram erros ao salvar uma ou mais imagens. Você pode tentar atualizar as imagens do personagem posteriormente."});
            throw { type: "storage", errors };
        };

        return { message: "Personagem criado com sucesso!" };
    };

    async updateCharacter(payload: EditCharacterPayload) {
        const errors = [];

        const existCharacter = await characterModel.findById(payload.id);

        if(!existCharacter) {
            throw ({type: "not_found", message: "Personagem não encontrado"});
        };

        const data = {
            anime_id: payload.data.anime_id,
            name: payload.data.name,
            description: payload.data.description,
            attr_hp: payload.data.attr_hp,
            attr_atk: payload.data.attr_atk,
            attr_def: payload.data.attr_def,
            currency_lock: payload.data.currency_lock,
            active: payload.data.active
        };

        await characterModel.update(payload.id, data);

        const characterDir = path.resolve(uploadDir, `${payload.id}`);

        if(payload.artwork) {
            const artworkDir = path.resolve(characterDir, "artwork", `1`, `1.${payload.artwork.ext}`);

            const artworkSave = await ImageStorageService.save(payload.artwork.buffer, artworkDir);

            if(!artworkSave.ok) {
                errors.push({message: `${artworkSave.message} - Artwork`});
            };
        } else if(payload.data.remove_artwork) {
            const artworkDir = path.resolve(characterDir, "artwork", `1`);

            const artworkDelete = await ImageStorageService.delete(path.resolve(artworkDir, `1.png`));

            if(!artworkDelete.ok) {
                errors.push({message: `${artworkDelete.message} - Artwork`});
            };
        };

        if(payload.thumbnail) {
            const thumbnailDir = path.resolve(characterDir, "thumbnail", `1`, `1.${payload.thumbnail.ext}`);

            const thumbnailSave = await ImageStorageService.save(payload.thumbnail.buffer, thumbnailDir);

            if(!thumbnailSave.ok) {
                errors.push({message: `${thumbnailSave.message} - Thumbnail`});
            };
        } else if(payload.data.remove_thumbnail) {
            const thumbnailDir = path.resolve(characterDir, "thumbnail", `1`);

            const thumbnailDelete = await ImageStorageService.delete(path.resolve(thumbnailDir, `1.png`));

            if(!thumbnailDelete.ok) {
                errors.push({message: `${thumbnailDelete.message} - Thumbnail`});
            };
        };

        if(errors.length > 0) {
            throw { type: "storage", errors };
        };

        return { message: "Personagem atualizado com sucesso!" };
    };

    async softDeleteCharacter({data}: DeleteCharacterPayload) {
        const existCharacters = await characterModel.findManyByIds(data.ids);

        if(existCharacters.length !== data.ids.length) {
            throw { type: "not_found", message: "Um ou mais personagens não foram encontrados."};
        };

        const alreadyDeleted = existCharacters.some(
            (c) => c.deleted_at !== null
        );

        if(alreadyDeleted) {
            throw { type: "conflict", message: "Um ou mais personagens já foram deletados." };
        };

        await characterModel.softDeleteCharacter(data.ids);

        return { message: "Exclusão efetuada com sucesso!" };
    };

    async restoreCharacter({data}: RestoreCharacterPayload) {
        const existCharacters = await characterModel.findManyByIds(data.ids);

        if(existCharacters.length !== data.ids.length) {
            throw { type: "not_found", message: "Um ou mais personagens não foram encontrados."};
        };

        const notDeleted = existCharacters.some(
            (c) => c.deleted_at === null
        );

        if(notDeleted) {
            throw { type: "conflict", message: "Um ou mais personagens não precisam ser restaurados."};
        };

        await characterModel.restoreCharacter(data.ids);

        return { message: "Personagens restaurados com sucesso."};
    };

    async getCharacters({
        page = 1,
        search = ""
    }: GetCharactersParams) {
        const MAX_PAGES = 1000;

        const safePage = page > 0 
            ? Math.min(page, MAX_PAGES)
            : 1;

        const result = await characterModel.getCharacters({
            page: safePage,
            search
        })

        return result;
    }

    async getCharactersCount() {
        return characterModel.getCount();
    }

    async getCharacterById(id: number): Promise<EditCharacterResponse> {
        const character = await characterModel.findById(id);

        if(!character)
            throw { type: "not_found", message: "Personagem não encontrado."};

        return {
            id: character.id,
            anime: character.anime,
            name: character.name,
            description: character.description ?? null,
            stats: {
                hp: character.attr_hp,
                atk: character.attr_atk,
                def: character.attr_def
            },
            active: character.active,
            lock: character.currency_lock
        };
    };
}

export default new CharacterService();