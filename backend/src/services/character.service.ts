import { characterModel } from "../models/Character";

class CharacterService {
    async getCharactersCount() {
        return characterModel.getCount();
    }
}

export default new CharacterService();