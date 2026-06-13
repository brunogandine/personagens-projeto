import { animeModel } from "../models/Anime";
import { characterModel } from "../models/Character";
import { CreateCharacterData, GetCharactersParams } from "../types/character.types";

class CharacterService {
    async createCharacter(data: CreateCharacterData) {
        const anime = await animeModel.findById(data.anime_id);

        if(!anime) {
            throw new Error("Anime fornecido não existe.");
        };

        return characterModel.create(data);
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