import { userCharacterModel } from "../models/UserCharacter"

class ProfileService {
    async getProfileStats (userId: number) {
        const totalCharacters = await userCharacterModel.getCount(userId);

        return { totalCharacters };
    };
}

export default new ProfileService();