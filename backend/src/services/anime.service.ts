import { animeModel } from "../models/Anime";
import { CreateAnimeData, GetAnimeParams } from "../types/anime.types";

class AnimeService {
    getAnimes = async ({
        page = 1,
        search = ""
    }: GetAnimeParams) => {
        const MAX_PAGES = 100;

        const safePages = page > 0
            ? Math.min(page, MAX_PAGES)
            : 1;

        const result = await animeModel.getAnimes({
            page: safePages,
            search
        })

        return result;
    }

    getCounts = async () => {
        const totalAnimes = await animeModel.getCount();

        return totalAnimes;
    }
}

export default new AnimeService();