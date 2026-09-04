import { animeModel } from "../models/Anime";
import { characterModel } from "../models/Character";
import { CharacterCreationResponse, CreateCharacterPayload, GetCharactersParams } from "../types/character.types";
import ImageStorageService from "@/services/image-storage.service"
import path from "path"

const assetsDir = path.resolve(process.cwd(), process.env.FRONTEND_ASSETS_PATH!);
const uploadDir =  path.resolve(process.cwd(), assetsDir, "images", "cards");
class CharacterService {
    async createCharacter(payload: CreateCharacterPayload): Promise<CharacterCreationResponse> {
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
    }

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
}

export default new CharacterService();