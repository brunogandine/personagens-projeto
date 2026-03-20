export type ProfileStats = {
    totalCharacters: number;
    mostPlayedCharacter: {
        character_id: number;
        name: string;
    }
    // pvpBattles: number;
    // npcBattles: number;
    // completedStories: number;
};

export type RecentAvatar = {
    fileName: string,
    avatarPath: string,
    updatedAt: string
};